import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../Home'
import HomeDetails from '../HomeDetails'
import CourseDetails from '../CourseDetails'
import TagPage from '../TagPage'
import NewReview from '../NewReview'
import NewAnalysis from '../NewAnalysis'
import NotePage from '../NotePage'
import NewNote from '../NewNote'
import NoteDetails from '../NoteDetails'

// creamos el stack navigator
const Stack = createStackNavigator()

// agregamos las pantallas que estarán en el stack
// el primer componente agregado será el componente por defecto al cargar el stack
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="CourseDetails"
      component={CourseDetails}
      options={{
        headerBackTitle: 'Back',
        headerTitle: null,
      }}
    />
    {/*<Stack.Screen
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
                headerTitle: 'Notes'
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
        />*/}
  </Stack.Navigator>
)

export default HomeStack
