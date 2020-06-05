import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  AsyncStorage
} from "react-native";

import styles from './styles';
import { AuthContext } from '../context';
import firebase from '../config/firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default Profile = () => {

  var user = firebase.auth().currentUser;
  var nameUser, emailUser, photoUser, uidUser, phoneUser;

  if (user != null) {
    photoUser = user.photoURL;
    emailUser = user.email;
    nameUser = user.displayName;
    uidUser = user.uid;
    phoneUser = user.phoneNumber;
  } else {
    emailUser = 'unknown'
    photoUser = './assets/anonymous.png';
  }

  const { signOut } = React.useContext(AuthContext);

  const [isEnabled, setIsEnabled] = useState(false);
  const [ModoAnonimo, setModoAnonimo] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(isEnabled => !isEnabled);
    console.log(isEnabled)
    saveAnonMode()
  }

  const saveAnonMode = async () => {
    try {
      await AsyncStorage.setItem('@ModoAnonimo', isEnabled.toString());
      console.log('Valor salvo no banco')
    } catch (error) {
      console.log('Erro ao salvar dado no AsyncStorage, eror: ' + error)
    }
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

  const handleLogout = () => {
    Alert.alert(
      "Já vai? Fica um pouco mais.",
      "Confirme abaixo",
      [
        {
          text: "Ficar Mais",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sair", onPress: () => handleSignOut() }
      ],
      { cancelable: false }
    );
  }

  const handleSignOut = () => {
    firebase.auth().signOut().then(function () {
      signOut();
    }).catch(function (error) {
      alert(error)
    });
  }

  useEffect(() => {
    loadAnonMode()
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.profile}>
        <Image source={{ uri: photoUser }} style={styles.avatar} />
        <Text style={styles.nameTitle}>{nameUser ? nameUser : 'Nome não preenchido'}</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.item, { borderTopWidth: 2, borderTopColor: '#d6d6d6' }]}>
          <Text>Chat em modo anônimo</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isEnabled ? "#32c700" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={styles.item}>
          <Text>Nome: {nameUser ? nameUser : 'Nome não preenchido'}</Text>
          {/* <Text>Chat Anomino: {isEnabled == true ? 'Verdadeiro' : 'Falso'}</Text> */}
        </View>

        <View style={styles.item}>
          <Text>Email: {emailUser ? emailUser : 'Email não preenchido'}</Text>
        </View>

        <View style={styles.item}>
          <Text>Telefone: {phoneUser ? phoneUser : 'Telefone não preenchido'}</Text>
        </View>

      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btnExit}
          onPress={() => handleLogout()}
        >
          <MaterialCommunityIcons name="logout" size={28} color="#FFFFFF" />
          <Text style={styles.btnText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
