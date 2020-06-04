import { StyleSheet, Dimensions } from 'react-native';

// Estilos para el book cart
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        borderRadius: 8,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 8,
        flexDirection: 'row',
        marginVertical: 4
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: 100, 
        height: 150, 
        resizeMode: 'cover', 
        borderRadius: 8
    },
    bookInfo:{
        flex: 2
    },
    book:{
        fontSize: 18,
        fontWeight: '600'
    },
    author: {
        fontSize: 16,
        fontWeight: '500'
    }
});

export default styles;