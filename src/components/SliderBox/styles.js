import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    slider:{
        width: '90%'
    },
    input: {
        flex: 1,
        height: 40,
        marginBottom: 16,
        paddingLeft: 0,
        paddingRight: 10,
        paddingTop: 16,
    },
    inputContainer: {
        width: '90%',
        height: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        paddingHorizontal: 10,
    },
    clearIcon: {
        paddingHorizontal: 10,
    },
});

export default styles;