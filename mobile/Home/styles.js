import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#F5F5F5'
    },

    btn: {
        backgroundColor: '#0093ba',
        borderRadius: 40,
        height: 50,
        marginBottom: 25,
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },

    img: {
        width: 350,
        height: 350
    }

});