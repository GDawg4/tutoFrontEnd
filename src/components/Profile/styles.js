import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: "center",
		justifyContent: "space-between"
	},

    logOffButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: "center",
        justifyContent: "space-between"
    },

	logo: {
		flex: 1,
		width: "100%",
		resizeMode: "contain",
		alignSelf: "center"
	},
	form: {
		flex: 1,
		justifyContent: "center",
		width: "80%"
	},
	navItem: {
		marginBottom: 72,
	},
	linkText: {
		color: '#428AF8',
	},
	styledText: {
		color: '#BEBEBE',
	},
	bottomText: {
		flexDirection: 'row',
		alignSelf: 'center'
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
	}
});

export default styles;
