import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image
} from "react-native";

import { AuthContext } from '../context';
import * as Facebook from 'expo-facebook';


import styles from './styles';
import logoImg from '../assets/anonymous.png';

import firebase from '../config/firebase';

export default SignIn = ({ navigation }) => {

  const [textEmail, setTextEmail] = React.useState('')
  const [textPassword, setTextPassword] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [errorPassword, setErrorPassword] = React.useState('')
  const [errorEmail, setErrorEmail] = React.useState('')

  const { signIn } = React.useContext(AuthContext)

  const handleSignIn = () => {
    setErrorPassword('')
    setErrorEmail('')
    setErrorMsg('')

    if (textEmail == "" || textEmail == null) {
      setErrorEmail('Preencha o Campo E-mail')
    } if (textPassword == '' || textPassword == null) {
      setErrorPassword('Preencha o Campo Senha')
    } else {

      firebase
        .auth()
        .signInWithEmailAndPassword(textEmail, textPassword)
        .then(() => signIn())
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/wrong-password') {
            setErrorMsg('E-mail ou Senha incorreto')
          } if (errorCode == 'auth/invalid-email') {
            setErrorEmail('Endereço de email inválido')
          } if (errorCode == 'auth/user-not-found') {
            setErrorEmail('Não há um usuário cadastrado com esse e-mail')
          } else {
            errorCode == 'auth/invalid-email' ? null : setErrorMsg(errorMessage);
          }
        })

    }
  }


  const handleSignInFacebook = async () => {
    await Facebook.initializeAsync('555857385126757');
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    })

    if (type == 'success') {
      const cred = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(cred)
      .then(() => signIn())
      .catch((error) => {
        console.log(error)
      })
    }
  }

  return (

    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.header}>
        <Image source={logoImg} style={styles.img} />
      </View>

      <View style={styles.content}>
        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        {errorEmail ? <Text style={styles.error}>{errorEmail}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          onChangeText={text => setTextEmail(text)}
          value={textEmail}
        />

        {errorPassword ? <Text style={styles.error}>{errorPassword}</Text> : null}
        <TextInput style={styles.input}
          placeholder='Password'
          returnKeyType='go'
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setTextPassword(text)}
          value={textPassword}
        />

        <TouchableOpacity style={styles.btn} onPress={() => handleSignIn()} >
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.aside}>
        <Text>Acesse usando o</Text>

        <TouchableOpacity style={styles.btnFace} onPress={() => handleSignInFacebook()} >
          <FontAwesome5 name="facebook-f" size={28} color="#FFFFFF" />
          <Text style={styles.btnText}>Facebook</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.push("ForgetPassword")} >
            <Text style={styles.btnFooterText}>Esqueceu sua Senha? </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.push("CreateAccount")} >
            <Text style={styles.btnFooterText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}