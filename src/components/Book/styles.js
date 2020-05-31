import { StyleSheet } from "react-native";

const width = 100;

const styles = StyleSheet.create({
    bookContainer: {
        height: 300,
        width: 150,
        borderRadius: 16,
        flex: 1,
        marginRight: 16,
        maxWidth: 150,
    },
    cover: {
        width: '100%',
        height: '85%',
        borderRadius: 16,
        resizeMode: 'stretch'
    },
    bookInfo: {
        flex: 1,
        color: 'black',
        height: '100%',
        paddingLeft: 8,
        paddingTop: 4
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
    },
    author: {
        fontSize: 14,
        fontWeight: '400',
    },
    extra: {
        fontSize: 12,
        opacity: 0.8,
    },
    scrollView:{
        width:'100%',
    }
})

export default styles