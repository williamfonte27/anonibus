import React, { useState, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import styles from './styles';

import firebase from '../config/firebase';
import api from '../services/axios';
import axios from 'axios';

export default function Chat() {
  console.disableYellowBox = true;

  const [user, setUser] = useState(null)
  const [mensagens, setMensagens] = useState([])
  const [caixaTexto, setCaixaTexto] = useState('')
  const [scrollview, setScrollview] = useState('')
  const [isEnabled, setIsEnabled] = useState(false);

  const db = firebase.firestore()

  const salvar = () => {
    api.post('/enviarMensagem', {
      mensagem: caixaTexto,
      usuario: user.name,
      avatar: user.picture,
    })
      .then(function () {
        setCaixaTexto('')
        scrollview.scrollToEnd({ animated: true })
      }).catch(function () {

      })
  }



  useEffect(() => {
    loadAnonMode()

    if (isEnabled == false) {
      carregaUsuarioAnonimo()
    } else {
      carregaUsuarioFirebase()
    }

    let mensagens_enviadas = []
    const unsubscribe = db.collection("chats")
      .doc("sala_01").collection('mensagens')
      .onSnapshot({ includeMetadataChanges: false }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            const { mensagem, usuario, avatar } = change.doc.data()
            const id = change.doc.id
            mensagens_enviadas.push({ mensagem, usuario, avatar, id })
          }
        })
        setMensagens([...mensagens_enviadas])
        scrollview ? scrollview.scrollToEnd({ animated: true }) : null;
      })
    return () => {
      unsubscribe()
    }
  }, [])

  const carregaUsuarioFirebase = () => {
    var user = firebase.auth().currentUser;
    var nameUser, photoUser;

    if (user != null) {
      photoUser = user.photoURL;
      nameUser = user.displayName;
    }

    setUser({
      name: nameUser,
      picture: photoUser
    })
  }

  const carregaUsuarioAnonimo = () => {
    axios.get('https://randomuser.me/api/')
      .then(function (response) {
        const user = response.data.results[0];
        // setDistance(response.data.distance)
        setUser({
          name: `${user.name.first} ${user.name.last}`,
          picture: user.picture.large
        })
        //console.log('user', user)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const loadAnonMode = async () => {
    try {
      const valueAS = await AsyncStorage.getItem('@ModoAnonimo');
      if (valueAS !== null) {
        setIsEnabled(valueAS == 'true' ? false : true)
      }
    } catch (error) {
      console.log('Erro ao buscar dado no AsyncStorage, eror: ' + error)
    }
  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        {user &&
          <>
            <TouchableOpacity onPress={carregaUsuarioAnonimo}>
              <Image
                style={styles.avatar}
                source={{ uri: user.picture }}
              />
            </TouchableOpacity>
            <Text style={styles.nome_usuario}>{user.name}</Text>
          </>
        }
      </View>

      <View style={styles.content}>
        <ScrollView style={styles.chat} ref={(view) => { setScrollview(view) }}>
          {
            mensagens.length > 0 && mensagens.map(item => (

              <View key={item.id} style={styles.linha_conversa}>
                <Image style={styles.avatar_conversa} source={{ uri: item.avatar }} />
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Text style={{ fontSize: 12, color: '#999' }}>{item.usuario}</Text>
                  {typeof (item.mensagem) == 'string' ?
                    <Text>{item.mensagem}</Text>
                    :
                    <Text>Erro na mensagem</Text>
                  }
                </View>

              </View>
            ))
          }
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TextInput
          style={styles.input_mensagem}
          onChangeText={text => setCaixaTexto(text)}
          value={caixaTexto} />

        <TouchableOpacity onPress={salvar}>
          <Ionicons style={{ margin: 3 }} name="md-send" size={32} color={'#999'} />
        </TouchableOpacity>
      </View>

    </View>
  )
}
