'use client'
import { setCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import signIn, { enterCode } from "@/src/FirebaseBridge/Auth/signIn";
import { getData, getDataAsync } from "@/src/FirebaseBridge/firestore/getData";
import { UserCredential } from "firebase/auth";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { MultiFactorResolver } from "firebase/auth";
import { useRecaptcha } from "@/components/recaptcha";

function Page(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sentCode, setSentCode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);

  const [user, setUser] = useState<UserCredential | null>(null);

  const recaptcha = useRecaptcha('sign-up');

  const router = useRouter();
  const [resolver, setResolver] = useState<MultiFactorResolver>();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(username, password, recaptcha!);

    if (error) {
      if (error == 'auth/multi-factor-auth-required') {
        
      }
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    if (result) {
      setUser(result);
      setSentCode(true);
    }
  }

  const enterCodeForm  = () => {
    getDataAsync("users/", user!.user.uid).then((value: { result: DocumentSnapshot<DocumentData, DocumentData> | null }) => {
      let data = value.result?.data();
      console.log(data);
      setCurrentUser(data?.UUID, data?.emailID, data?.displayName, data?.role, data?.score, data?.streak);
      console.log("Not Admin");

      if (data?.role == "admin") {
        console.log("Admin");
        if (!user?.user.emailVerified) {
          alert("Admin user has not verified the email");
          return;
        }

        enterCode(verificationCode).then(() => {
          router.push("/admin");
        }).catch((e) =>{
          console.log(e);
        });

      } else if (data?.role == "teacher") {
        console.log("Teacher");
      }

      console.log("Nothing");
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        {!sentCode && (
          <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6 text-black">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="12345678"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
            >
              Sign In
            </button>
          </div>
          <div id='sign-in'></div>
        </form>
        )}
        {sentCode && (
          <form onSubmit={enterCodeForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6 text-black">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Code
            </label>
            <input
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              placeholder="12345678"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
            >
              Verify
            </button>
          </div>
        </form>
        )}
      </div>
      <div id='sign-up'></div>
    </div>
  );
}

export default Page;
