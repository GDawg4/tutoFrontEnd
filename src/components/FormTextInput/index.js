import React, { useRef } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

import styles from './styles';

// componente de input custom para el login y registro
const FormTextInput = props => {
	const { input, meta, ...inputProps } = props;
	
	const textInputRef = useRef();
	
	const focus = () => {
		if(this.textInputRef.current) {
			this.textInputRef.current.focus();
		}
	}
	
	// desplegar error unicamente si el campo ya fue tocado y no esta activo
	const validationStyles = meta.touched && !meta.active ? meta.valid ? styles.valid : styles.invalid : null;
	
	return (
		<View style={styles.inputContainer}>
			<TextInput
				{...inputProps}
				ref={textInputRef}
				selectionColor={'#428AF8'}
				placeholderTextColor={'#BEBEBE'}
				autoCapitalize={'none'}
				onChangeText={input.onChange}
				onBlur={input.onBlur}
				onFocus={input.onFocus}
				value={input.value}
				style={[styles.input, validationStyles]}
			/>
			{meta.touched && !meta.active ? meta.valid ? <View /> : <Text style={styles.errorText}>{meta.error}</Text> : <View />}
		</View>
	);
}
	
export default FormTextInput;