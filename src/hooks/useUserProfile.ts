import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Profile, UserData } from '../logic/types';
import { createDefaultProfile } from '../services/userProfile';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        setProfile({ ...snapshot.data(), uid: snapshot.id } as UserData);
      } else {
        // Automatically create default profile if not found
        try {
          const defaultProfile = await createDefaultProfile(user.uid);
          setProfile(defaultProfile);
        } catch (err: any) {
          console.error("Error creating default profile in hook:", err);
          setError("Kunne ikke oprette profil.");
        }
      }
      setLoading(false);
    }, (err) => {
      console.error("Firestore real-time error:", err);
      setError("Kunne ikke hente profildata.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { profile, loading, error };
};
