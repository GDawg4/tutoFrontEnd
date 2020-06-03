import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import HomeStack from '../HomeStack';
import SearchStack from '../SearchStack';
import CartStack from "../CartStack";

const Tab = createBottomTabNavigator()

const BottomTabs = () => (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#428AF8',
                labelStyle: {
                    marginTop: -8,
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={SearchStack}
                options={{
                    tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartStack}
                options={{
                    tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={24} color={color} />
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
)

export default BottomTabs;