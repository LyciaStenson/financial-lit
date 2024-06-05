import { useRouter } from "next/navigation";
import { getCurrentAuth } from "../firebaseApp";
import { signInWithEmailAndPassword, getAuth, sendEmailVerification, multiFactor, PhoneAuthProvider, RecaptchaVerifier, ApplicationVerifier, PhoneMultiFactorGenerator, UserCredential } from "firebase/auth";
import { setCurrentUser } from "./currentUser";
import { getData } from "../firestore/getData";

// Get the authentication instance using the Firebase app
const auth = getAuth();

let user:UserCredential;
let vertID:string;

export async function signInWhenEnteredCode(id: string | null) {
  const username = id + "@moneyconfidence.co.uk";
  const password = "23@f1-*1HA%^3(DA)";

  // Attempt to sign in with provided email and password
  const { result, error } = await signIn(username, password, undefined);

  if (error) {
    // Display and log any sign-in errors
    console.log(error);
    return;
  }

  let data = (await getData("users/", result!.user.uid)).result?.data();
  setCurrentUser(data?.UUID, data?.emailID, data?.dispalyName, data?.role, data?.score, data?.streak);
}

// Function to sign in with email and password
export default async function signIn(email: string, password: string, recaptchaVerifier:ApplicationVerifier | undefined) {
  let result = null; // Variable to store the sign-in result
  let error = null; // Variable to store any error that occurs

  try {
    //console.log(email);
    result = await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
    let data = (await getData("users/", result!.user.uid)).result?.data();
    if (data?.role == "admin") {
      multiFactor(result.user).getSession().then(function (multiFactorSession) {
        const phoneInfoOptions = {
          phoneNumber: "+4407496767274", //https://smstome.com/united-kingdom/phone/447488855044/sms/5544
          session: multiFactorSession
        };

        const phoneAuthProvider = new PhoneAuthProvider(auth);
        return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier!);
      });
    }
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
    console.log(error);
  }

  return { result, error }; // Return the sign-in result and error (if any)
}

export async function enterCode(code:string){
        // Ask user for the verification code. Then:
        const cred = PhoneAuthProvider.credential(vertID, code!);
        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

        // Complete enrollment.
        let data = (await getData("users/", user!.user.uid)).result?.data();
        return multiFactor(user!.user).enroll(multiFactorAssertion, data?.displayName);
}