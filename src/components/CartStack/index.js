import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cart from "../Cart";
import Checkout from "../Checkout";

// Se crea el stack navigator
const Stack = createStackNavigator();

// Se agregan las pantallas que estarán dentro del stack
// El primer componente de arriba a abajo es el componente por defecto
const CartStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Cart"
            component={Cart}
        />
        <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
            }}
        />
    </Stack.Navigator>
)

export default CartStack;