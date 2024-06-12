import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { getCurrentAuth } from '@/src/FirebaseBridge/firebaseApp';
import { getData } from '@/src/FirebaseBridge/firestore/getData';
import { currentUser } from '@/src/FirebaseBridge/Auth/currentUser';
import { LoadingHook } from 'react-firebase-hooks/auth/dist/util';

export declare type MyAuthStateHook = LoadingHook<currentUser | null, Error>;

const auth = getCurrentAuth();

const useUser = (): MyAuthStateHook => {
  const [firebaseUser, loading, error] = useAuthState(auth);
  const [myUser, setMyUser] = useState<currentUser | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  useEffect(() => {
    if (firebaseUser) {
      setDataLoading(true);
      console.log("Hello User", firebaseUser.email);

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
            role: data.role,
            score: data.score,
            streak: data.streak,
          };

          console.log("Get User: ", newUser);
          setMyUser(newUser);
        }
        setDataLoading(false);
      });
    }
  }, [firebaseUser]);

  return [myUser, loading || dataLoading, error];
};

export default useUser;
