import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

import styles from './styles';
import firebase from '../config/firebase';

import forget from '../assets/forget.png';

export default ForgetPassword = ({ navigation }) => {

  const [textEmail, setTextEmail] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [errorEmail, setErrorEmail] = React.useState('')


  const handleForgetPassword = () => {

    var auth = firebase.auth();
    var emailAddress = textEmail;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
      alert('Email enviado com Sucesso')
      navigation.push("SignIn")
    }).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        setErrorEmail('Endereço de email inválido');
      } if (errorCode == 'auth/user-not-found') {
        setErrorEmail('Não há usuário com esse email');
      } else {
        errorCode == 'auth/invalid-email' ? null : setErrorMsg(errorMessage);
      }
    });
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={forget} style={styles.forgetImage} />
        <Text style={styles.headerTitle}>Lembrar Senha</Text>
      </View>

      <View style={styles.content}>
        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        {errorEmail ? <Text style={styles.error}>{errorEmail}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setTextEmail(text)}
          value={textEmail}
        />

        <TouchableOpacity style={styles.btn} onPress={() => handleForgetPassword()} >
          <Text style={styles.btnText}>Recuperar Senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text>Lembrou sua senha? </Text>
        <TouchableOpacity onPress={() => navigation.push("SignIn")} >
          <Text style={styles.btnFooterText}>Faça Login</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

