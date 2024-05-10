import { useRouter } from "next/navigation";
import { getCurrentApp } from "../firebaseApp";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { setCurrentUser } from "./currentUser";
import getData from "../firestore/getData";

// Get the authentication instance using the Firebase app
const auth = getAuth(getCurrentApp());

export async function signInWhenEnteredCode(id: string | null) {
  const username = id + "@moneyconfidence.co.uk";
  const password = "23@f1-*1HA%^3(DA)";

  // Attempt to sign in with provided email and password
  const { result, error } = await signIn(username, password);

  if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
  }

  let data = (await getData("users/", result!.user.uid)).result?.data();
  setCurrentUser(data?.UUID, data?.emailID, data?.dispalyName, data?.role);
}

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