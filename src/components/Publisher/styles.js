import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    publisherContainer: {
        height: 200,
        width: 150,
        flex: 1,
        marginRight: 16,
        maxWidth: 150,
        alignItems: 'center',
    },
    publisherPic: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
        borderRadius: 75,
    },
    publisherInfo: {
        color: 'black',
        height: '100%',
        marginTop: 16
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default styles;