import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { ActivityIndicator, Image, KeyboardAvoidingView, View, Text, Alert } from 'react-native';
import { Link, Redirect } from 'react-router-native';

import Button from '../Button';
import FormTextInput from '../FormTextInput';

import styles from './styles';
import * as authActions from '../../actions/auth';
import * as userActions from '../../actions/users';
import * as selectors from '../../reducers';

import imageLogo from '../../assets/logo3.png';

const ALERT = {
	shown: false
}

// Función onsubmit que se realiza cuando los datos ingresados fueron verificados
// comienza el login con los datos provistos por el usuario
const onSubmit = (values, dispatch) => {
	ALERT.shown = false
	dispatch(authActions.startLogin(values.email, values.password))
}

// validación que revisa que el campo no esté vacío
const required = value => value !== undefined ? undefined : 'Required';

// login hecho con redux-form
const LoginForm = props => {
	
	const { submitting, handleSubmit, isAuthenticated, isAuthenticating, authenticationFailed, success, clearSuccess } = props;
	
	if (isAuthenticated) {
		return(
			<Redirect to="/app"/>
		)
	}

	if(success) { 
		clearSuccess()
	}
		
	if (authenticationFailed && !ALERT.shown) {
		ALERT.shown = true
		Alert.alert('Login Error', 'No se puede iniciar sesión con los datos ingresados.')
	}
		
	return (
		<KeyboardAvoidingView style={isAuthenticating ? [styles.container, styles.authenticating] : styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
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
					<Button onPress={handleSubmit} label={'Log In'} disabled={submitting} />
					<View style={styles.bottomText}>
						<Text style={styles.styledText}>¿No tienes una cuenta? </Text>
						<Link to="/registry" underlayColor="#f0f4f7" style={styles.navItem}><Text style={styles.linkText}>Haz clic aquí</Text></Link>
					</View>
					{
						isAuthenticating && (
							<View style={styles.spinner}>
								<ActivityIndicator size="large" color="#428AF8" />
							</View>
						)
					}
			</View>
		</KeyboardAvoidingView>
	);
}
			
			
export default reduxForm({
	form: 'logIn',
	onSubmit,
})(connect(
	state => ({
		isAuthenticated: selectors.isAuthenticated(state),
		isAuthenticating: selectors.getIsAuthenticating(state),
		authenticationFailed: selectors.getAuthenticatingError(state) !== null,
		success: selectors.isSuccessfulUser(state),
	}),
	dispatch => ({
		clearSuccess(){
            dispatch(userActions.clearUserAddedSuccess())
        },
	}),
)(LoginForm));