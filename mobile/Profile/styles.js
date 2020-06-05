import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#F5F5F5'
    },

    header: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        marginBottom: 10,
    },

    profile: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },

    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#d6d6d6',
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: "center",
        width: '100%',
        marginTop: 25,
        marginBottom: 10
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: "uppercase",
    },

    btnExit: {
        backgroundColor: '#ff5733',
        borderRadius: 40,
        height: 50,
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    btnText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },

    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#d6d6d6',
        marginBottom: 10
    },

    nameTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    }

});