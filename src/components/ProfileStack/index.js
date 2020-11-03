import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from "../Profile";

// Se crea el stack navigator
const Stack = createStackNavigator();

// Se agregan las pantallas que estarán dentro del stack
// El primer componente de arriba a abajo es el componente por defecto
const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Perfil"
            component={Profile}
        />

    </Stack.Navigator>
)

export default ProfileStack;