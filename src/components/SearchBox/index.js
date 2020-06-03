import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchBox = props => {
	const { input, meta, handlePress, ...inputProps } = props;
	
	return (
		<View style={styles.inputContainer}>
			<AntDesign style={styles.searchIcon} name="search1" size={20} color={'#BEBEBE'}/>
			<TextInput
				{...inputProps}
				selectionColor={'#428AF8'}
				placeholderTextColor={'#BEBEBE'}
				autoCapitalize={'none'}
				autoCorrect={false}
				onChangeText={input.onChange}
				onBlur={input.onBlur}
				onFocus={input.onFocus}
				value={input.value}
				style={styles.input}
			/>
			{
				meta.dirty
				? 
					<AntDesign style={styles.clearIcon} name="closecircleo" size={20} color={'#F55E64'} onPress={() => handlePress()}/>
				:
					null
			}
		</View>
	);
}
	
const styles = StyleSheet.create({
	input: {
		flex: 1,
		height: 40,
		marginBottom: 16,
		paddingLeft: 0,
    	paddingRight: 10,
    	paddingTop: 16,
	},
	inputContainer: {
		width: '90%',
		borderRadius: 8,
		borderWidth: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#BEBEBE',
		marginBottom: 10
	},
	searchIcon: {
		paddingHorizontal: 10,
	},
	clearIcon: {
		paddingHorizontal: 10,
	},
});
	
export default SearchBox;