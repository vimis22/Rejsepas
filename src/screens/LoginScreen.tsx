import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { Button } from '../components/Button';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('MainTabs');
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'Failed to sign in. Please check your credentials.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      }
      Alert.alert('Login Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('MainTabs');
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'Failed to create account.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      }
      Alert.alert('Registration Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
             <Text style={styles.logoText}>RP</Text>
          </View>
          <Text style={styles.appName}>Rejsepas</Text>
          <Text style={styles.tagline}>Your Travel Companion</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <Button 
            title={isRegistering ? "Create Account" : "Login"} 
            onPress={isRegistering ? handleRegister : handleLogin} 
            style={styles.loginBtn}
            loading={loading}
          />
          
          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} disabled={loading}>
            <Text style={styles.toggleText}>
              {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>

          {!isRegistering && <Text style={styles.forgot}>Forgot Password?</Text>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0047AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0047AB',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  loginBtn: {
    marginTop: 16,
  },
  toggleText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 14,
  },
  forgot: {
    textAlign: 'center',
    marginTop: 16,
    color: '#0047AB',
    fontWeight: '500',
  },
});
