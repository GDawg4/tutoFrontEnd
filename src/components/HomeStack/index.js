import React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import Home from '../Home';
import HomeDetails from '../HomeDetails';

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Home" 
            component={Home}
        />
        <Stack.Screen 
            name="HomeDetails" 
            component={HomeDetails} 
            options={{
                headerBackTitle: 'Back',
                headerTitle: 'Book'
            }}
        />
    </Stack.Navigator>
)

export default HomeStack;