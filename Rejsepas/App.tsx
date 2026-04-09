import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './component/LoginScreen';
import TermsScreen from './component/TermsScreen';
import ProfileScreen from "./component/ProfileScreen";
import StampScreen from "./component/StampScreen";
import SettingsScreen from "./component/SettingsScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="TermsScreen" component={TermsScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
                <Stack.Screen name="StampScreen" component={StampScreen}/>
                <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

