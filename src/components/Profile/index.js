import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import DaySchedule from '../DaySchedule'
import WeekScheduler from '../WeekScheduler';
import styles from './styles';
import Button from "../Button";
import {Link, Redirect} from "react-router-native";
import * as userActions from "../../actions/users";
// Componente de librería
// FlatList que renderiza los libros comprados por el usuario
const Profile = (props) => {
    const {
        changePassword,
        changing,
        logOff,
        handleSubmit,
        isAuthenticated,
        isAuthenticating,
        authenticationFailed,
        success,
        clearSuccess,
    } = props
    return (
        <View>
            <Button
                onPress={changePassword}
                color="#078b45"
                label={'Cambiar contraseña'}
                disabled={changing}
            />
            <Link to="/">
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#3b3b3b',
                        textDecorationLine: 'underline',
                        textDecorationColor: '#3b3b3b',
                    }}
                >
                    Cerrar sesión
                </Text>
            </Link>
        </View>
    )
};


export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(Profile);