import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    topContainer: {
        width: '90%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 32
    },
    header: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 8,
        marginLeft: 16,
        fontWeight: '700'
    },
    middleContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignContent: 'center',
        width: '90%'
    },
    text: {
        fontSize: 20,
        fontWeight: '500'
    },
    buttonContainer: {
        width: '90%',
    }
});

export default styles;