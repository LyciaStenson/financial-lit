import { useRouter } from "next/navigation";
import { getCurrentAuth } from "../firebaseApp";
import { signInWithEmailAndPassword, getAuth, multiFactor, PhoneAuthProvider, ApplicationVerifier, PhoneMultiFactorGenerator, UserCredential } from "firebase/auth";
import { currentUser, setCurrentUser } from "./currentUser";
import { getDataAsync } from "../firestore/getData";
import setData from "../firestore/setData";

// Get the authentication instance using the Firebase app
const auth = getAuth();

let user:UserCredential;
let vertID:string;

export async function getCurrentDay(user:currentUser){
  const createdDate = user.createdDate;

  if (createdDate) {
    const [prefDay, prefMonth, prefYear] = createdDate.split('/').map((part: string) => parseInt(part, 10));
    const prefixedDateObject = new Date(2000 + prefYear, prefMonth - 1, prefDay); // Adjust the year as needed
  
    const dateInterface: Date = new Date();
    const day = dateInterface.getDate().toString().padStart(2, '0');
    const month = (dateInterface.getMonth() + 1).toString().padStart(2, '0');
    const year = dateInterface.getFullYear();
    const currentDate = `${day}/${month}/${year}`;
  
    // Calculate the difference in time (milliseconds)
    const timeDifference = dateInterface.getTime() - prefixedDateObject.getTime();
  
    // Convert the time difference to days
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    console.log(`Current date: ${currentDate}`);
    console.log(`Difference in days: ${dayDifference}`);
    return dayDifference;
  } else {
    console.log('createdDate is undefined');
    return 0;
  }
}

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

  let data = (await getDataAsync("users/", result!.user.uid)).result?.data();

  data!.createdDate = "15/06/24";

  setData("users/", result!.user.uid, data);

  console.log("User: ", (await getDataAsync("users/", result!.user.uid)).result?.data());

  setCurrentUser(data?.UUID, data?.emailID, data?.displayName, data?.role, data?.score, data?.streak);
}

// Function to sign in with email and password
export default async function signIn(email: string, password: string, recaptchaVerifier:ApplicationVerifier | undefined) {
  let result = null; // Variable to store the sign-in result
  let error = null; // Variable to store any error that occurs

  try {
    //console.log(email);
    result = await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
    let data = (await getDataAsync("users/", result!.user.uid)).result?.data();
    if (data?.role == "admin") {
      multiFactor(result.user).getSession().then(function (multiFactorSession) {
        const phoneInfoOptions = {
          phoneNumber: "+4407496767274", //TODO: Need to change this phone number
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
        let data = (await getDataAsync("users/", user!.user.uid)).result?.data();
        return multiFactor(user!.user).enroll(multiFactorAssertion, data?.displayName);
}