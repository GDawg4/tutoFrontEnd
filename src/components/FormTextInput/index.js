import React from "react";
import { StyleSheet, TextInput } from "react-native";

const FormTextInput = ({ type = 'text', value,  placeholder, onChangeText}) => (
    <TextInput
        selectionColor={'#428AF8'}
        style={styles.textInput}
        secureTextEntry={type === 'password'}
        placeholderTextColor={'#BEBEBE'}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
    />  
);

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#BEBEBE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  }
});

export default FormTextInput;