import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, CreditCard, FileText, Settings } from 'lucide-react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './src/firebaseConfig';

// Import Screens
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { PassportScreen } from './src/screens/PassportScreen';
import { VisaScreen } from './src/screens/VisaScreen';
import { RecordsScreen } from './src/screens/RecordsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { ContactInfoScreen } from './src/screens/ContactInfoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0047AB',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <Home color={color} size={size} />;
          if (route.name === 'Passport') return <CreditCard color={color} size={size} />;
          if (route.name === 'Visas') return <FileText color={color} size={size} />;
          if (route.name === 'Settings') return <Settings color={color} size={size} />;
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Passport" component={PassportScreen} />
      <Tab.Screen name="Visas" component={VisaScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="ContactInfo" component={ContactInfoScreen} />
            <Stack.Screen name="Records" component={RecordsScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

