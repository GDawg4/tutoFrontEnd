import React, { Component } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

class FormTextInput extends Component {
  textInputRef = React.createRef();

  focus = () => {
    if(this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  }

  render(){
    const { error, ...allProps } = this.props;

    return(
      <View >
        <TextInput
            ref={this.textInputRef}
            selectionColor={'#428AF8'}
            style={[styles.textInput, error ? styles.textInputError : styles.textInputNoError]}
            placeholderTextColor={'#BEBEBE'}
            autoCapitalize={'none'}
            { ...allProps }
        /> 
        <Text style={styles.errorText}>{error ? 'Campo requerido' : ''}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  },
  textInputNoError: {
    borderBottomColor: '#BEBEBE',
  },
  textInputError: {
    borderBottomColor: '#F8262F',
  },
  container: {
    marginBottom: 10
  },
  errorText: {
    height: 30,
    color: '#F8262F',
  },
});

export default FormTextInput;