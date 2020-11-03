import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'

import HomeStack from '../HomeStack'
import SearchStack from '../SearchStack'
import LibraryStack from '../LibraryStack'
import CartStack from '../CartStack'
import ProfileStack from '../ProfileStack'

// Se crea el componente de navegación
const Tab = createBottomTabNavigator()

// Se indican las pantallas que se van a llamar en cada sección de la barra
const BottomTabs = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#078b45',
        labelStyle: {
          marginTop: -8,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Búsqueda"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />    
    </Tab.Navigator>
  </NavigationContainer>
)

export default BottomTabs
