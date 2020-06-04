import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: "space-between",
      },
    header: {
        alignSelf: 'center',
        color: '#428AF8',
        fontSize: 24,
        marginBottom: '10%',
        textAlign: 'center',
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%",
    },
    linkText: {
        color: '#428AF8',
    },
    styledText: {
        color: '#BEBEBE',
    },
    bottomText: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    spinner: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	authenticating: {
		opacity: 0.5,
    },
    successMessage: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    logo: {
		flex: 1,
		width: "100%",
		resizeMode: "contain",
		alignSelf: "center"
	},
});

export default styles;