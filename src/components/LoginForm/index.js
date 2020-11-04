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
  StatusBar,
  Platform,
  SafeAreaView,
  Dimensions,
  ImageBackground,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.mainProgram}>
        {/* Headers */}
        <View style={styles.headers}>
          <Image style={{ flex: 1, height: '100%' }} source={logoUVG} />
          <View
            style={{
              flex: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 35,
                  color: '#fff',
                }}
              >
                Tutorías UVG
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.greenBar} />
        <View style={styles.content}>
          <ImageBackground
            source={cafeteria}
            blurRadius={3}
            style={{ flex: 1, width: '100%', justifyContent: 'center' }}
          >
            <KeyboardAvoidingView
              style={(styles.contentContainer, { flexDirection: 'row' })}
            >
              <View style={{ flex: 1 }} />
              <View style={styles.centerBox}>
                <Field
                  name={'email'}
                  component={FormTextInput}
                  keyboardType="email-address"
                  placeholder={'Correo'}
                  autoCapitalize="none"
                  returnKeyType="next"
                  validate={required}
                />
                <Field
                  name={'password'}
                  component={FormTextInput}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  placeholder={'Contraseña'}
                  returnKeyType="done"
                  validate={required}
                />
                <Button
                  onPress={handleSubmit}
                  color="#078b45"
                  style={styles.buttonRegister}
                  label={'Iniciar Sesión'}
                  disabled={submitting}
                />
                <Text style={{ textAlign: 'center' }}>
                  ¿No tienes una cuenta?
                </Text>
                <Link to="/registry">
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#078b45',
                      textDecorationLine: 'underline',
                      textDecorationColor: '#078b45',
                    }}
                  >
                    Registrarse
                  </Text>
                </Link>
              </View>
              <View style={{ flex: 1 }} />
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
        <View style={styles.bottomBar}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  mainProgram: {
    flex: 1,
  },
  headers: {
    flex: 6,
    backgroundColor: '#3B3A3B',
    overflow: 'visible',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  greenBar: {
    flex: 1,
    backgroundColor: '#078B45',
  },
  content: {
    flex: 27,
    alignContent: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    flex: 2,
    backgroundColor: '#3B3A3B',
  },
  contentContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  centerBox: {
    flex: 5,
    backgroundColor: '#fff',
    padding: '5%',
    borderRadius: 10,
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
