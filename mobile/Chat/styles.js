import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',    
        paddingHorizontal: 10,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: '#F5F5F5',
    },
    
    header: {
        justifyContent: "center",
        alignContent: 'center',
        alignItems: "center",
        width: '100%',
        paddingBottom: 5,
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#333'
    },

    avatar_conversa: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 10
    },

    nome_usuario: {
        fontSize: 25,
        color: '#000'
    },

    footer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },

    input_mensagem: {
        flex: 1,
        borderColor: '#e6e6e6',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 50,
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 4,
    },

    chat: {
        backgroundColor: '#F5F5F5',
        width: '100%',
    },

    linha_conversa: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingTop: 10,
        marginRight: 60,
    }



});