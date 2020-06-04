import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 20
	},
	inputContainer: {
		borderColor: 'rgba(0, 0, 0, 0.4)',
		marginBottom: 10
	},
	valid: {
		borderColor: '#53E69D'
	},
	invalid: {
		borderColor: '#F55E64'
	},
	errorText: {
		height: 28,
		color: '#F8262F',
	},
});

export default styles;