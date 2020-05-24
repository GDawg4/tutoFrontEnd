import { StyleSheet } from "react-native";

const width = 40;

const styles = StyleSheet.create({
    bookContainer: {
        height: 200,
        width: `${width}%`,
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
    }
})

export default styles