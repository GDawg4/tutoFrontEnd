import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        width: '90%'
    },
    header: {
        alignSelf: 'center',
        color: '#428AF8',
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 8
    },
    infoMessage: {
        alignSelf: 'center',
        justifyContent: 'center',
        color: 'grey',
        fontSize: 24,
        marginBottom: 32,
        marginTop: 64,
        textAlign: 'center',
    }
});

export default styles;