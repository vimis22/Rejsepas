import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './component/LoginScreen';
import TermsScreen from './component/TermsScreen';
import ProfileScreen from "./component/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="TermsScreen" component={TermsScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

