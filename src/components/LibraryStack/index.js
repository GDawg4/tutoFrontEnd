import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Library from '../Library';
import ReadBook from '../ReadBook';

const Stack = createStackNavigator();

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