import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#F5F5F5',
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },

  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#333',
    marginBottom: 10
  },

  UpImage: {
    width: 300,
    height: 300
  },

  btn: {
    backgroundColor: '#0093BA',
    borderRadius: 40,
    height: 50,
    marginBottom: 25,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center'
},

btnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold'
},

});

