import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import styles from './styles';
import team from '../assets/team.png';

export default Home = ({ navigation }) => {

  return (
    <View style={styles.container}>

      <Image source={team}  style={styles.img}/>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.push('HomeDetails')}
      >
        <Text style={styles.btnText}>Detalhes Sem Parametro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.push('HomeDetails', { name: 'Isso é um teste' })}
      >
        <Text style={styles.btnText}>Detalhes Com Parametro</Text>
      </TouchableOpacity>

    </View>
  )
}
