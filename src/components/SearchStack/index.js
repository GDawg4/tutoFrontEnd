import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../Search';
import TagPage from '../TagPage';

const Stack = createStackNavigator();

const SearchStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Search" 
            component={Search}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="TagPage"
            component={TagPage}
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
            }}
        />
    </Stack.Navigator>
)

export default SearchStack;