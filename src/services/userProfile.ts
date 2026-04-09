import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { Profile, UserData, Visa, Record } from '../logic/types';
import { 
  updateEmail, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from 'firebase/auth';

const COLLECTION_NAME = 'users';

export const getProfile = async (uid: string): Promise<UserData | null> => {
  const docRef = doc(db, COLLECTION_NAME, uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as UserData;
  }
  return null;
};

export const createDefaultProfile = async (uid: string, email?: string): Promise<UserData> => {
  const now = new Date();
  const validFrom = now.toLocaleDateString('da-DK');
  const future = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());
  const validUntil = future.toLocaleDateString('da-DK');

  // Random date for initial record
  const randomDays = Math.floor(Math.random() * 30);
  const departureDate = new Date();
  departureDate.setDate(now.getDate() + randomDays);
  const departureDateStr = departureDate.toLocaleDateString('da-DK');

  const defaultVisa: Visa = {
    id: 'default-visa',
    country: 'Danmark',
    flag: '🇩🇰',
    startDate: validFrom,
    endDate: validUntil,
    status: 'ACTIVE',
    statusColor: 'green'
  };

  const defaultRecord: Record = {
    id: 'default-record',
    country: 'Danmark',
    flag: '🇩🇰',
    airport: 'Danske Lufthavne',
    date: departureDateStr,
    type: 'Departure',
    status: 'ACTIVE'
  };

  const defaultProfile: UserData = {
    firstName: '',
    surname: '',
    dateOfBirth: '',
    cprNumber: '',
    passportNumber: '',
    citizenship: 'Dansk',
    validFrom: validFrom,
    validUntil: validUntil,
    passportType: 'P',
    countryCode: 'DNK',
    passportStatus: 'ACTIVE',
    email: email,
    phoneNumber: '',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    visas: [defaultVisa],
    records: [defaultRecord]
  };
  
  await setDoc(doc(db, COLLECTION_NAME, uid), defaultProfile);
  return defaultProfile;
};

export const updateProfile = async (uid: string, data: Partial<UserData>) => {
  const docRef = doc(db, COLLECTION_NAME, uid);
  await updateDoc(docRef, data);
};

export const saveProfile = async (uid: string, data: UserData) => {
  const docRef = doc(db, COLLECTION_NAME, uid);
  await setDoc(docRef, data);
};

/**
 * Updates the user's email in both Firebase Auth and Firestore.
 * May require re-authentication.
 */
export const updateUserEmail = async (newEmail: string, passwordForReauth?: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Ingen bruger logget ind');

  const oldEmail = user.email;
  if (oldEmail === newEmail) return;

  try {
    // 1. Update Firebase Auth Email
    await updateEmail(user, newEmail);
    
    // 2. Update Firestore
    await updateProfile(user.uid, { email: newEmail });
  } catch (error: any) {
    // Handle re-authentication requirement
    if (error.code === 'auth/requires-recent-login' && passwordForReauth) {
      const credential = EmailAuthProvider.credential(oldEmail!, passwordForReauth);
      await reauthenticateWithCredential(user, credential);
      
      // Retry update after re-auth
      await updateEmail(user, newEmail);
      await updateProfile(user.uid, { email: newEmail });
    } else {
      throw error;
    }
  }
};
