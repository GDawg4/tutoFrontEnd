import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        width: 250,
        borderRadius: 8,
        marginRight: 16,
        maxWidth: 250,
        paddingBottom: 16,
        backgroundColor: 'lightgrey'
    },
    rating: {
        paddingTop: 8,
        paddingHorizontal: 8,
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        paddingLeft: 8,
        paddingTop: 8,
        fontWeight: '600',
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 16,
        paddingLeft: 8,
        paddingTop: 8,
        fontWeight: '400'
    },
});

export default styles;