import React, { useState } from 'react';
import { Image, StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native';

import Button from '../Button';
import FormTextInput from '../FormTextInput';

import imageLogo from '../../assets/logo3.png';


const LoginScreen = () => {
    const [email, changeEmail] = useState('')
    const [password, changePassword] = useState('')

    const handleEmailChange = textEntered => {
        changeEmail(textEntered)
    }

    const handlePasswordChange = textEntered => {
        changePassword(textEntered)
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Image source={imageLogo} style={styles.logo} />
            <View style={styles.form}>
                <FormTextInput
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder={'Email'}
                    
                />
                <FormTextInput
                    value={password}
                    onChangeText={handlePasswordChange}
                    placeholder={'Password'}
                    type={'password'}
                />
                <Button label={'INICIAR SESIÓN'} onPress={() => console.log(email, password)} />
            </View>
        </KeyboardAvoidingView>
    )
};



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
    textInput: {
        height: 40,
        borderColor: '#BEBEBE',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 40
    }
});
  
export default LoginScreen;