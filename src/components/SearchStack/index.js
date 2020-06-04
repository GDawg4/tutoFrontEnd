import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../Search';
import TagPage from '../TagPage';
import HomeDetails from '../HomeDetails';
import AuthorDetails from '../AuthorDetails';
import PublisherDetails from '../PublisherDetails';
import NewReview from "../NewReview";
import NewAnalysis from "../NewAnalysis";

// se crea el stack de navegacion para la busqueda
const Stack = createStackNavigator();

// se indican los componentes incluidos en el stack
// el primero componente ingresado es el componente por defecto del stack
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
        <Stack.Screen 
            name="PublisherDetails" 
            component={PublisherDetails} 
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
            }}
        />
        <Stack.Screen
            name='WriteReview'
            component={NewReview}
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
            }}
        />
        <Stack.Screen
            name='WriteAnalysis'
            component={NewAnalysis}
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
            }}
        />
    </Stack.Navigator>
)

export default SearchStack;