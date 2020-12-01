import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import logoUVG from '../../assets/logo.png'
import {
  KeyboardAvoidingView,
  View,
  Text,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native'
import { Link } from 'react-router-native'
import { AntDesign } from '@expo/vector-icons'
import SuccessScreen from "../SuccessScreen";

import Button from '../Button'
import FormTextInput from '../FormTextInput'

// import styles from './styles'
import * as userActions from '../../actions/users'
import * as selectors from '../../reducers'
import { Platform } from 'react-native'

// funcion de onsubmit
// envia la informacion ingresada al API para crear un nuevo usuario
const onSubmit = (values, dispatch) => {
  dispatch(
      userActions.startAddingUser(
          values.name,
          values.lastname,
          values.email,
          values.password,
          values.username,
          values.age
      )
  )
}

// funcion de validacion
// realiza las validaciones necesarias para que la informacion que se envíe sea correcta
const validate = (values) => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Requerido'
  }

  if (!values.lastname) {
    errors.lastname = 'Requerido'
  }

  if (!values.username) {
    errors.username = 'Requerido'
  }

  if (!values.age) {
    errors.age = 'Requerida'
  } else if (values.age && !/^\d+$/.test(values.age)){
    errors.age = 'Solo se aceptan dígitos'
  }
  if (!values.email) {
    errors.email = 'Requerido'
  } else if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Correo Electrónico No Válido'
  }

  if (!values.password) {
    errors.password = 'Requerida'
  } else if (values.password.length < 8) {
    errors.password =
        'La contraseña debe de tener un largo mayor a 8 caractéres'
  }

  if (!values.confirmpassword) {
    errors.confirmpassword = 'Requerida'
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = 'Las contraseñas no coinciden'
  }

  return errors
}

const RegistryForm = (props) => {
  const {
    submitting,
    handleSubmit,
    isAdding,
    addingError,
    clearError,
    success,
  } = props

  if (success) {
    return SuccessScreen(
        'checkcircle',
        125,
        '#078B45',
        '¡Cuenta creada con éxito!',
        '/',
        'Haz click aquí para iniciar sesión.')
  }

  if (addingError !== null) {
    console.log('ADD ERROR:', addingError)
    clearError()
    Alert.alert('Signup Error', addingError, [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ])
  }

  return (
      <SafeAreaView style={styles.container}>
        {/* <View style={{ flex: 1 }}> */}
        <View style={styles.headers}>
          {/* <Image style={{ flex: 1, height: '100%' }} source={logoUVG} /> */}
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
                Registro
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.greenBar} />
        <View style={{ flex: 29 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.appPaddingCol} />
            <View style={styles.mainContainer}>
              <View style={styles.paddingSide} />
              <View style={styles.scrollViewStyles}>
                {/* <Text style={styles.header}>Ingrese sus Datos</Text> */}
                <Field
                    name={'name'}
                    component={FormTextInput}
                    placeholder={'Nombre(s)'}
                    returnKeyType="next"
                    autoCapitalize="words"
                />
                <Field
                    name={'lastname'}
                    component={FormTextInput}
                    placeholder={'Apellido(s)'}
                    returnKeyType="next"
                    autoCapitalize="words"
                />
                <Field
                    name={'email'}
                    component={FormTextInput}
                    keyboardType="email-address"
                    placeholder={'Correo'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    autoCompleteType="email"
                />
                <Field
                    name={'username'}
                    component={FormTextInput}
                    placeholder={'Nombre de Usuario'}
                    autoCapitalize="none"
                    returnKeyType="next"
                />
                <Field
                    name={'age'}
                    component={FormTextInput}
                    placeholder={'Edad'}
                    keyboardType="numeric"
                    maxLength={2}
                    returnKeyType="next"
                />
                <Field
                    name={'password'}
                    component={FormTextInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder={'Contraseña'}
                    returnKeyType="next"
                />
                <Field
                    name={'confirmpassword'}
                    component={FormTextInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder={'Confirmar contraseña'}
                    returnKeyType="done"
                />
                <Button
                    onPress={handleSubmit}
                    label={'Registrarse'}
                    color="#078b45"
                    disabled={submitting}
                />
                <View style={styles.bottomText}>
                  <Text style={styles.styledText}>¿Ya tienes una cuenta? </Text>
                  <Link to="/" underlayColor="#078b45" style={styles.navItem}>
                    <Text style={styles.linkText}>Inicia sesión</Text>
                  </Link>
                </View>
                {isAdding && (
                    <View style={styles.spinner}>
                      <ActivityIndicator size="large" color="#428AF8" />
                    </View>
                )}
              </View>
              <View style={styles.paddingSide} />
            </View>
            <View style={styles.appPaddingCol} />
          </ScrollView>
        </View>

        {/* </View> */}
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  scrollViewStyles: {
    flex: 10,
    paddingTop: '10%',
    justifyContent: 'space-evenly',
  },
  paddingSide: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  appPaddingCol: {
    flex: 1,
  },
  styledText: {
    textAlign: 'center',
    fontSize: 14,
  },
  linkText: {
    textAlign: 'center',
    color: '#078b45',
    textDecorationLine: 'underline',
    textDecorationColor: '#078b45',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headers: {
    flex: 3,
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
})

export default reduxForm({
  form: 'signUp',
  validate,
  onSubmit,
})(
    connect(
        (state) => ({
          isAdding: selectors.getIsAddingUser(state),
          addingError: selectors.getAddingErrorUser(state),
          success: selectors.isSuccessfulUser(state),
        }),
        (dispatch) => ({
          clearError() {
            dispatch(userActions.clearUserError())
          },
        })
    )(RegistryForm)
)
