import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import {
  KeyboardAvoidingView,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { Link } from 'react-router-native'
import { AntDesign } from '@expo/vector-icons'

import Button from '../Button'
import FormTextInput from '../FormTextInput'

import styles from './styles'
import * as userActions from '../../actions/users'
import * as selectors from '../../reducers'

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
    errors.name = 'Required'
  }

  if (!values.lastname) {
    errors.lastname = 'Required'
  }

  if (!values.username) {
    errors.username = 'Required'
  }

  if (!values.age) {
    errors.age = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 characters long'
  }

  if (!values.confirmpassword) {
    errors.confirmpassword = 'Required'
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = 'Password mismatched'
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
    return (
      <View style={styles.successMessage}>
        <AntDesign
          name="checkcircle"
          size={64}
          color={'#428AF8'}
          style={{ marginBottom: 64 }}
        />
        <Text>Cuenta creada con exito</Text>
        <Link to="/">
          <Text style={{ color: '#428AF8' }}>
            Haz clic aquí para iniciar sesión
          </Text>
        </Link>
      </View>
    )
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
    <KeyboardAvoidingView
      style={
        isAdding ? [styles.container, styles.authenticating] : styles.container
      }
      behavior="padding"
    >
      <View style={styles.form}>
        <Text style={styles.header}>Enter your data</Text>
        <Field
          name={'name'}
          component={FormTextInput}
          placeholder={'Name'}
          returnKeyType="next"
          autoCapitalize="words"
        />
        <Field
          name={'lastname'}
          component={FormTextInput}
          placeholder={'Last name'}
          returnKeyType="next"
          autoCapitalize="words"
        />
        <Field
          name={'email'}
          component={FormTextInput}
          keyboardType="email-address"
          placeholder={'Email'}
          autoCapitalize="none"
          returnKeyType="next"
          autoCompleteType="email"
        />
        <Field
          name={'username'}
          component={FormTextInput}
          placeholder={'Username'}
          autoCapitalize="none"
          returnKeyType="next"
        />
        <Field
          name={'age'}
          component={FormTextInput}
          placeholder={'Age'}
          keyboardType="numeric"
          maxLength={2}
          returnKeyType="next"
        />
        <Field
          name={'password'}
          component={FormTextInput}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder={'Password'}
          returnKeyType="next"
        />
        <Field
          name={'confirmpassword'}
          component={FormTextInput}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder={'Confirm Password'}
          returnKeyType="done"
        />
        <Button
          onPress={handleSubmit}
          label={'Sign Up'}
          disabled={submitting}
        />
        <View style={styles.bottomText}>
          <Text style={styles.styledText}>¿Ya tienes una cuenta? </Text>
          <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text style={styles.linkText}>Inicia sesión</Text>
          </Link>
        </View>
        {isAdding && (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#428AF8" />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

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
