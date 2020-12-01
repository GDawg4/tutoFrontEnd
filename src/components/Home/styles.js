import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    homeContainer: {
        width: '100%'
    },
    horizontalScroll: {
        paddingLeft: 16,
        flex: 1,
        flexWrap: 'wrap'
    },
    header: {
        padding: 10,
        backgroundColor: "#3a3b3a",
        paddingLeft: 0,
        alignSelf: 'flex-start',
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 8,
        width: '100%',
        // backgroundColor: '#454545',
        left: '0%'
    },
});

export default styles;