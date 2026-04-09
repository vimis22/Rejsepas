import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  initializeAuth, 
  getReactNativePersistence, 
  getAuth, 
  browserLocalPersistence, 
  setPersistence 
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Platform } from "react-native";

// Firebase configuration from google-services.json
// Note: For Expo, these are typically provided via environment variables in production,
// but for this configuration task, we'll use the values provided in the project.
const firebaseConfig = {
  apiKey: "AIzaSyDQw5forxHCTnf-ZpY3yB0797YgV4F1mm0",
  authDomain: "rejsepas.firebaseapp.com",
  projectId: "rejsepas",
  storageBucket: "rejsepas.firebasestorage.app",
  messagingSenderId: "569377069277",
  appId: "1:569377069277:web:520b5f4b99744b7643a334"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services with platform-specific persistence
let auth;

if (Platform.OS === 'web') {
  auth = getAuth(app);
  // Web uses browserLocalPersistence by default, but we can be explicit if needed
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
