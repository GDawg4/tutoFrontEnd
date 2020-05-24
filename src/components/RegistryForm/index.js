import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, KeyboardAvoidingView, View, Text, ActivityIndicator, Alert, Image } from 'react-native';
import { Link } from 'react-router-native';
import { AntDesign } from '@expo/vector-icons';

import Button from '../Button';
import FormTextInput from '../FormTextInput';

import * as userActions from '../../actions/users';
import * as selectors from '../../reducers';

const onSubmit = (values, dispatch) => {
	dispatch(userActions.startAddingUser(values.name, values.lastname, values.email, values.password, values.username, values.age))
}

const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.lastname) {
        errors.lastname = 'Required';
    }

    if (!values.username) {
        errors.username = 'Required';
    }

    if (!values.age) {
        errors.age = 'Required';
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

    const { submitting, handleSubmit, isAdding, addingError, clearError, success } = props;

    if(success){
        return(
            <View style={styles.successMessage}>
                <AntDesign name="checkcircle" size={64} color={'#428AF8'} style={{marginBottom: 64}}/>
                <Text>Cuenta creada con exito</Text>
                <Link to="/"><Text style={{color: '#428AF8'}}>Haz clic aquí para iniciar sesión</Text></Link>
            </View>
        )
    }
    
    if(addingError !== null) {
        clearError()
        Alert.alert(
            'Signup Error', 
            addingError, 
            [
                {
                    text: 'Ok',
                    style: 'cancel'
                }                
            ]
        )
    }
    

    return(
        <KeyboardAvoidingView style={isAdding ? [styles.container, styles.authenticating] : styles.container} behavior="padding">
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
                    name={'username'}
                    component={FormTextInput}
                    placeholder={'Username'}
                    autoCapitalize='none'
                    returnKeyType='next'
                />
                <Field
                    name={'age'}
                    component={FormTextInput}
                    placeholder={'Age'}
                    keyboardType='numeric'
                    maxLength={2}
                    returnKeyType='next'
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
                {
                    isAdding && (
                        <View style={styles.spinner}>
                            <ActivityIndicator size="large" color="#428AF8" />
                        </View>
                    )
                }
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
        marginBottom: '20%',
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


export default reduxForm({
    form: 'signUp',
    validate,
    onSubmit,
})
(connect(
    state => ({
        isAdding: selectors.getIsAdding(state),
        addingError: selectors.getAddingError(state),
        success: selectors.isSuccessful(state),
    }),
    dispatch => ({
        clearError(){
            dispatch(userActions.clearUserError())
        },
    })
)(RegistryForm));
