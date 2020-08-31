import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 8,
        marginLeft: 16,
        fontWeight: '700',
        width: '100%'
    },
});

export default styles;