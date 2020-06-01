import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../Search';
import TagPage from '../TagPage';
import HomeDetails from '../HomeDetails';
import AuthorDetails from '../AuthorDetails';

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
            name="HomeDetails" 
            component={HomeDetails} 
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
            }}
        />
        <Stack.Screen 
            name="AuthorDetails" 
            component={AuthorDetails} 
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
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