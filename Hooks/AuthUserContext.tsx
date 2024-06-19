import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { getCurrentAuth } from '@/src/FirebaseBridge/firebaseApp';
import { getData } from '@/src/FirebaseBridge/firestore/getData';
import { currentUser } from '@/src/FirebaseBridge/Auth/currentUser';
import { LoadingHook } from 'react-firebase-hooks/auth/dist/util';
import { serverTimestamp } from 'firebase/firestore';

export declare type MyAuthStateHook = LoadingHook<currentUser | null, Error>;

const auth = getCurrentAuth();


const useUser = (): MyAuthStateHook => {
  const [firebaseUser, loading, error] = useAuthState(auth);
  const [myUser, setMyUser] = useState<currentUser | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  useEffect(() => {
    if (firebaseUser) {
      setDataLoading(true);

      getData("users", firebaseUser.uid, (result, error) => {
        if (error) {
          console.error("Error fetching user data:", error);
          setDataLoading(false);
          return;
        }

        const data = result?.data();
        if (data) {
          const newUser: currentUser = {
            UUID: data.UUID,
            displayName: data.displayName,
            emailID: data.emailID,
            createdDate:data.createdDate,
            role: data.role,
            score: data.score,
            streak: data.streak,
            day:data.day,
          };

          console.log("User Score: ", newUser.score);

          setMyUser(newUser);
        }
        setDataLoading(false);
      });
    }
  }, [firebaseUser]);

  return [myUser, loading || dataLoading, error];
};

export default useUser;
