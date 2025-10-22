import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eef2f3',
    },
    display: {
        fontSize: 40,
        backgroundColor: '#fff',
        padding: 15,
        width: '90%',
        textAlign: 'right',
        borderRadius: 10,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#ddd',
        padding: 20,
        margin: 5,
        borderRadius: 10,
        width: 70,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    clearBtn: {
        marginTop: 15,
        backgroundColor: '#f66',
        padding: 15,
        borderRadius: 10,
    },
    clearText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
});
