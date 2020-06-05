import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#F5F5F5'
    },

    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },

    aside: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },

    img: {
        width: 200,
        height: 200,
        marginBottom: 30
    },

    btn: {
        backgroundColor: '#0093BA',
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

    btnFace: {
        backgroundColor: '#3B5998',
        borderRadius: 8,
        height: 50,
        marginBottom: 10,
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    input: {
        width: '85%',
        height: 50,
        borderRadius: 40,
        backgroundColor: '#FFF',
        color: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,        
        marginBottom: 15,
        marginHorizontal: 20,        
        fontSize: 16
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25
    },

    btnFooterText: {
        color: '#0093ba',
        fontSize: 15,
        fontWeight: 'bold'
    },
    
    error: {
        color: '#ff6961',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5
    },

});