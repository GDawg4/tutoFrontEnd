import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, KeyboardAvoidingView, View, Text, Alert } from 'react-native';
import { Link } from 'react-router-native';

import Button from '../Button';
import FormTextInput from '../FormTextInput';

const onSubmit = values => Alert.alert('Submitted!', JSON.stringify(values));

const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.lastname) {
        errors.lastname = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if(values.password.length < 8){
        errors.password = 'Password must be 8 characters long'
    }

    if (!values.confirmpassword ) {
      errors.confirmpassword = 'Required';
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = 'Password mismatched' ;
    }
  
    return errors;
  
  
};

const RegistryForm = props => {

    const { submitting, handleSubmit } = props;

    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.form}>
            <Text style={styles.header}>Enter your data</Text>
            <Field
                name={'name'}
                component={FormTextInput}
                placeholder={'Name'}
                returnKeyType='next'
                autoCapitalize='words'
            />
            <Field
                name={'lastname'}
                component={FormTextInput}
                placeholder={'Last name'}
                returnKeyType='next'
                autoCapitalize='words'
            />
            <Field
                name={'email'}
                component={FormTextInput}
                keyboardType='email-address'
                placeholder={'Email'}
                autoCapitalize='none'
                returnKeyType='next'
                autoCompleteType='email'
            />
            <Field
                name={'password'}
                component={FormTextInput}
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder={'Password'}
                returnKeyType='next'
            />
            <Field
                name={'confirmpassword'}
                component={FormTextInput}
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder={'Confirm Password'}
                returnKeyType='done'
            />
            <Button onPress={handleSubmit} label={'Sign Up'} disabled={submitting} />
            <View style={styles.bottomText}>
                <Text style={styles.styledText}>¿Ya tienes una cuenta? </Text>
                <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}><Text style={styles.linkText}>Inicia sesión</Text></Link>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}

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
        marginBottom: '30%',
        textAlign: 'center',
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%",
    },
    navItem: {
        marginBottom: 0,
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
    }
});


export default reduxForm({
    form: 'signUp',
    validate,
    onSubmit,
})(RegistryForm);
