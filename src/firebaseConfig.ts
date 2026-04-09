import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const app = initializeApp(firebaseConfig);

// Initialize Firebase services with React Native persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
