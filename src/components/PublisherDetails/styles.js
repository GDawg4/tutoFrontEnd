import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        paddingTop: 16,
        flexDirection: 'row',
    },
    middleContainer: {
        flex: 3,
        width: '90%',
        marginTop: 16
    },
    aboutContainer: {
        width: '90%',
        marginTop: 32,
    },
    publisherInfo: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    publisherPic: {
        height: 125,
        width: 125,
        borderRadius: 75,
        resizeMode: 'cover'
    },
    name: {
        fontSize: 18,
        fontWeight: '600'
    },
    contact: {
        marginTop: 8,
        textAlign: 'center',
        width: '90%'
    },
    text: {
        textAlign: 'justify',
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
        marginBottom: 8,
    },
});

export default styles;