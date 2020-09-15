import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
  StyleSheet,
} from 'react-native'
import { Link, Redirect } from 'react-router-native'

import Button from '../Button'
import FormTextInput from '../FormTextInput'

//import styles from './styles';
import * as authActions from '../../actions/auth'
import * as userActions from '../../actions/users'
import * as selectors from '../../reducers'

import logoUVG from '../../assets/logo.png'
import cafeteria from '../../assets/cafeteria.jpg'
const ALERT = {
  shown: false,
}

// Función onsubmit que se realiza cuando los datos ingresados fueron verificados
// comienza el login con los datos provistos por el usuario
const onSubmit = (values, dispatch) => {
  ALERT.shown = false
  dispatch(authActions.startLogin(values.email, values.password))
}

// validación que revisa que el campo no esté vacío
const required = (value) => (value !== undefined ? undefined : 'Required')

// login hecho con redux-form
const LoginForm = (props) => {
  const {
    submitting,
    handleSubmit,
    isAuthenticated,
    isAuthenticating,
    authenticationFailed,
    success,
    clearSuccess,
  } = props

  if (isAuthenticated) {
    return <Redirect to="/app" />
  }

  if (success) {
    clearSuccess()
  }

  if (authenticationFailed && !ALERT.shown) {
    ALERT.shown = true
    Alert.alert(
      'Login Error',
      'No se puede iniciar sesión con los datos ingresados.'
    )
  }

  return (
    <KeyboardAvoidingView
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#078b45',
      }}
    >
      {/* Headers */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '20%',
          width: '100%',
        }}
      >
        {/* Notification Space */}
        <View
          style={{
            width: '100%',
            height: '15%',
            position: 'relative',
            backgroundColor: '#FFF',
          }}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '75%',
            backgroundColor: '#3B3A3C',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: '100%',
              width: '30%',
              overflow: 'visible',
            }}
          >
            <Image
              style={{
                height: '100%',
                width: '100%',
              }}
              source={logoUVG}
            />
          </View>
        </View>
      </View>
      {/* Container of information */}
      <View
        style={{
          height: '80%',
          width: '100%',
          // backgroundColor: '#',
          opacity: 1,
        }}
      >
        <View style={styles.imageContainer}>
          <Image source={cafeteria} style={styles.image} />
        </View>
        <View
          style={
            isAuthenticating
              ? [styles.container, styles.authenticating]
              : styles.container
          }
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.textFieldArea}>
            <Field
              name={'email'}
              component={FormTextInput}
              keyboardType="email-address"
              placeholder={'Email'}
              autoCapitalize="none"
              returnKeyType="next"
              validate={required}
            />
            <Field
              name={'password'}
              component={FormTextInput}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder={'Password'}
              returnKeyType="done"
              validate={required}
            />
            <Button
              onPress={handleSubmit}
              style={styles.buttonRegister}
              label={'Log In'}
              disabled={submitting}
            />
            <View style={styles.bottomText}>
              <Text
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                }}
              >
                ¿No tienes una cuenta?{' '}
              </Text>
              <Link
                to="/registry"
                underlayColor="#f0f4f7"
                style={styles.navItem}
              >
                <Text
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                  }}
                >
                  Haz clic aquí
                </Text>
              </Link>
            </View>
            {isAuthenticating && (
              <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#428AF8" />
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
    position: 'relative',
    width: '80%',
    height: 'auto',
    flexDirection: 'column',
    alignSelf: 'center',
    borderColor: 'white',
    paddingTop: '10%',
    marginTop: '10%',
  },
  textFieldArea: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  bodyArea: {
    height: '81%',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    flex: 2,
    position: 'absolute',
  },
  global: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    position: 'relative',
  },
  buttonRegister: {
    width: '40%',
    height: '2%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    alignSelf: 'center',
    padding: 0,
  },

  bottomText: {
    backgroundColor: '#454545',
    color: '#FFF',
    width: '80%',
    alignSelf: 'center',
    height: 'auto',
    borderRadius: 5,
    padding: 10,
  },
})

export default reduxForm({
  form: 'logIn',
  onSubmit,
})(
  connect(
    (state) => ({
      isAuthenticated: selectors.isAuthenticated(state),
      isAuthenticating: selectors.getIsAuthenticating(state),
      authenticationFailed: selectors.getAuthenticatingError(state) !== null,
      success: selectors.isSuccessfulUser(state),
    }),
    (dispatch) => ({
      clearSuccess() {
        dispatch(userActions.clearUserAddedSuccess())
      },
    })
  )(LoginForm)
)
