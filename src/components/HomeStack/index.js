import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Home';
import HomeDetails from '../HomeDetails';
import TagPage from '../TagPage';
import NewReview from "../NewReview";
import NewAnalysis from "../NewAnalysis";
import NotePage from "../NotePage";
import NewNote from "../NewNote";
import NoteDetails from "../NoteDetails";

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
        <Stack.Screen
            name='Notes'
            component={NotePage}
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
            }}
        />
        <Stack.Screen
            name='NewNote'
            component={NewNote}
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
            }}
        />
        <Stack.Screen
            name='NoteDetails'
            component={NoteDetails}
            options={{
                headerBackTitle: 'Back',
                headerTitle: null
            }}
        />
    </Stack.Navigator>
)

export default HomeStack;