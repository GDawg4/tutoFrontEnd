import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { ActivityIndicator, Image, StyleSheet, KeyboardAvoidingView, View, Text, Alert } from 'react-native';
import { Link, Redirect } from 'react-router-native';

import Button from '../Button';
import FormTextInput from '../FormTextInput';

import * as authActions from '../../actions/auth';
import * as userActions from '../../actions/users';
import * as selectors from '../../reducers';

import imageLogo from '../../assets/logo3.png';

const ALERT = {
	shown: false
}

const onSubmit = (values, dispatch) => {
	ALERT.shown = false
	dispatch(authActions.startLogin(values.email, values.password))
}

const required = value => value !== undefined ? undefined : 'Required';

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
		marginBottom: 72,
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
	}
});
			
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