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
        alignSelf: 'flex-start',
        color: '#078b45',
        fontSize: 20,
        fontWeight: '600',
        // textAlign: 'center',
        marginVertical: 8,
        width: '100%',
        // backgroundColor: '#454545',
        left: '5%'
    },
});

export default styles;