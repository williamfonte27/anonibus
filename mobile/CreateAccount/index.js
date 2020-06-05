import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import styles from './styles';
import { AuthContext } from '../context';
import firebase from '../config/firebase';

export default CreateAccount = ({ navigation }) => {

  const [textName, setTextName] = React.useState('')
  const [textEmail, setTextEmail] = React.useState('')
  const [textPassword, setTextPassword] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [errorPassword, setErrorPassword] = React.useState('')
  const [errorEmail, setErrorEmail] = React.useState('')
  const [errorName, setErrorName] = React.useState('')


  const handleSignUp = () => {
    setErrorName('')
    setErrorEmail('')
    setErrorMsg('')

    if (textName == "" || textName == null) {
      setErrorName('Preencha o Campo Nome')
    } if (textEmail == "" || textEmail == null) {
      setErrorEmail('Preencha o Campo E-mail')
    } if (textPassword == '' || textPassword == null) {
      setErrorPassword('Preencha o Campo Senha')
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(textEmail, textPassword)
        .then(function (userRecord) {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            email: textEmail,
            emailVerified: false,
            password: textPassword,
            displayName: textName,
            disabled: false
          })
            .then(() => {
              console.log('Usuario Criado e Atualzado sem Erros');
              console.log(user)
              signUp()
            })
            .catch(function (error) {
              console.log('Error updating user:', error);
            });
        })
        // .catch(error => alert(error))
        .catch(function (error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/email-already-in-use') {
            setErrorEmail('Já existi uma conta com o endereço de e-mail fornecido.');
          } if (errorCode == 'auth/invalid-email') {
            setErrorEmail('Endereço de email inválido');
          } else {
            setErrorMsg(errorMessage);
          }
        })
    }
  }

  // const await handleSignUpFacebook = () => {
  //   async loginWithFacebook() {

  //     //ENTER YOUR APP ID 
  //     const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('<APP ID>', { permissions: ['public_profile'] })

  //     if (type == 'success') {

  //       const credential = firebase.auth.FacebookAuthProvider.credential(token)

  //       firebase.auth().signInWithCredential(credential).catch((error) => {
  //         console.log(error)
  //       })
  //     }
  //   }
  // }

  const { signUp } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crie sua Conta</Text>
        <Text>Preencha todos os campos abaixo</Text>
      </View>

      <View style={styles.content}>

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        {errorName ? <Text style={styles.error}>{errorName}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder='Nome'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setTextName(text)}
          value={textName}
        />

        {errorEmail ? <Text style={styles.error}>{errorEmail}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setTextEmail(text)}
          value={textEmail}
        />

        {errorPassword ? <Text style={styles.error}>{errorPassword}</Text> : null}
        <TextInput style={styles.input}
          placeholder='Senha'
          returnKeyType='go'
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setTextPassword(text)}
          value={textPassword}
        />

        <TouchableOpacity style={styles.btn} onPress={() => handleSignUp()} >
          <Text style={styles.btnText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text>Já possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.push("SignIn")} >
          <Text style={styles.btnFooterText}>Faça Login</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

