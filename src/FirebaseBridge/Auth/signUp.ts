import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendSignInLinkToEmail, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth";
import { setUserDetails } from "@/src/FirebaseBridge/Auth/currentUser";
import setData from "@/src/FirebaseBridge/firestore/setData";
import { getCurrentAuth } from "../firebaseApp";
import { getData } from "../firestore/getData";


const auth = getAuth();

export default async function signUp(email: string, password: string, role: string): Promise<UserCredential | null> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (user) {
      if (role === 'teacher' || role === 'admin' || role == "none") {
        sendEmailVerification(user);
      }
      setUserDetails(user.uid, email, email.split('@')[0], role);
      await setData("users/", user.uid, { UUID: user.uid, email, displayName: email.split('@')[0], role });
    }
    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
}
