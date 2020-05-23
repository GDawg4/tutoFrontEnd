import React, { useRef } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';


const FormTextInput = props => {
  const { input, meta, ...inputProps } = props;

  const textInputRef = useRef();

  const focus = () => {
    if(this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  }
  
  // desplegar error unicamente si el campo ya fue tocado y no esta activo
  const validationStyles = meta.touched && !meta.active
    ? meta.valid ? styles.valid : styles.invalid
    : null;

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
      height: 20,
      color: '#F8262F',
    },
});

export default FormTextInput;