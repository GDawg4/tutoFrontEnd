import { StyleSheet } from "react-native";

const width = 100;

const styles = StyleSheet.create({
    bookContainer: {
        height: 200,
        width: '100%',
        borderRadius: 16,
    },
    cover: {
        width: '100%',
        height: '80%',
        borderRadius: 16,
    },
    bookInfo: {
        flex: 1,
        color: 'black',
        paddingLeft: 8,
        paddingTop: 4,
        backgroundColor: 'transparent',
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
        width:'100%'
    }
})

export default styles