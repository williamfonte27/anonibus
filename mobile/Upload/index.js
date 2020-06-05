import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';

import styles from './styles';
import firebase from '../config/firebase';

export default function Upload() {
  
  var user = firebase.auth().currentUser;
  var nameUser, emailUser, photoUser, uidUser;

  if (user != null) {
    photoUser = user.photoURL;
    emailUser = user.email;
    uidUser = user.uid;
  } else {
    emailUser = 'unknown'
    photoUser = './assets/anonymous.png';
  }

  console.disableYellowBox = true;

  const [imagem, setImagem] = useState(null);

  uploadImagem = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = new Date().getTime();

    var ref = firebase.storage().ref().child('upload/' + filename);

    ref.put(blob).then(function (snapshot) {

      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        setImagem(downloadURL)
        updateImageUser(downloadURL).then(function () {
          console.log('Imagem Atualizado com Sucesso')
          console.log('Url Download Firebase Nova')
          console.log(downloadURL)

        }).catch(function (error) {
          console.log('Algo deu errado, tente novamente.')
          console.log(error)
        })
      })

    })

  }

  const updateImageUser = async (photo) => {
    await user.updateProfile({
      email: emailUser,
      photoURL: photo
    }).then(function() {
      alert('Atualizado com Sucesso')
      console.log('Usuario Atualizado')
      console.log(user)
      photoUser = user.photoURL
    }).catch(function (error) {
      alert(error)
    });
  }

  escolherImagem = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        uploadImagem(result.uri);
      }
    } catch (E) {
      console.log(E);
      alert('Erro ao carregar imagem, tente novamente.')
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrapper}>
        <View style={styles.content}>

          {imagem &&
            <Image source={{ uri: imagem }} style={styles.avatar} />
          }

          {!imagem && <Image source={{ uri: photoUser }} style={styles.avatar} />}

          <TouchableOpacity style={styles.btn} onPress={() => { escolherImagem() }} >
            <Text style={styles.btnText}>Escolher Imagem</Text>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  )

}
