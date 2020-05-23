import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Image, StyleSheet, KeyboardAvoidingView, View, Text } from 'react-native';
import { Link } from 'react-router-native';

import Button from '../Button';
import FormTextInput from '../FormTextInput';

import imageLogo from '../../assets/logo3.png';


const required = value => value !== undefined ? undefined : 'Required';

const LoginForm = props => {

  const { submitting } = props;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.form}>
        <Image source={imageLogo} style={styles.logo} />
        <Field
          name={'email'}
          component={FormTextInput}
          keyboardType='email-address'
          placeholder={'Email'}
          autoCapitalize='none'
          returnKeyType='next'
          validate={required}
        />
        <Field
          name={'password'}
          component={FormTextInput}
          autoCapitalize='none'
          secureTextEntry={true}
          placeholder={'Password'}
          returnKeyType='done'
          validate={required}
        />
        <Button onPress={props.handleSubmit} label={'Log In'} disabled={submitting} />
        <View style={styles.bottomText}>
          <Text style={styles.styledText}>¿No tienes una cuenta? </Text>
          <Link to="/registry" underlayColor="#f0f4f7" style={styles.navItem}><Text style={styles.linkText}>Haz clic aquí</Text></Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
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
      marginBottom: 16,
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
    }
});

export default reduxForm({
  form: 'logIn'
})(LoginForm);