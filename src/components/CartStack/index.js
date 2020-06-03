import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from "../Cart";
import Checkout from "../Checkout";

const Stack = createStackNavigator();

const CartStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
                headerShown: false
            }}
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