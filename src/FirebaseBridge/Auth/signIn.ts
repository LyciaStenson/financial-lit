import { getCurrentApp } from "../firebaseApp";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(getCurrentApp());

// Function to sign in with email and password
export default async function signIn(email: string, password: string) {
  let result = null; // Variable to store the sign-in result
  let error = null; // Variable to store any error that occurs

  try {
    //console.log(email);
    result = await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
  }

  return { result, error }; // Return the sign-in result and error (if any)
}