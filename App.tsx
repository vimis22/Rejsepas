import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreditCard, FileText, Settings, History } from 'lucide-react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './src/firebaseConfig';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Import Screens
import { LoginScreen } from './src/screens/LoginScreen';
import { PassportScreen } from './src/screens/PassportScreen';
import { VisaScreen } from './src/screens/VisaScreen';
import { RecordsScreen } from './src/screens/RecordsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { ContactInfoScreen } from './src/screens/ContactInfoScreen';
import { TermsScreen } from './src/screens/TermsScreen';
import { ReportStolenScreen } from './src/screens/ReportStolenScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { colors } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Pas') return <CreditCard color={color} size={size} />;
          if (route.name === 'Visa') return <FileText color={color} size={size} />;
          if (route.name === 'Historik') return <History color={color} size={size} />;
          if (route.name === 'Indstillinger') return <Settings color={color} size={size} />;
          return null;
        },
      })}
    >
      <Tab.Screen name="Pas" component={PassportScreen} />
      <Tab.Screen name="Visa" component={VisaScreen} />
      <Tab.Screen name="Historik" component={RecordsScreen} />
      <Tab.Screen name="Indstillinger" component={SettingsScreen} />
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
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="ContactInfo" component={ContactInfoScreen} />
              <Stack.Screen name="Terms" component={TermsScreen} />
              <Stack.Screen name="ReportStolen" component={ReportStolenScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

