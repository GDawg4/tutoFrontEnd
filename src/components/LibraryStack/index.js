import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Library from '../Library';
import ReadBook from '../ReadBook';

// se crea el stack para la librería
const Stack = createStackNavigator();

// se indican los componentes que estarán en el stack
// el primer componente es el que se muestra por defecto al cargar el stack
const LibraryStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Library" 
            component={Library}
        />
        <Stack.Screen
            name="ReadBook"
            component={ReadBook}
            options={{
                headerTitle: false
            }}
        />
    </Stack.Navigator>
)

export default LibraryStack;