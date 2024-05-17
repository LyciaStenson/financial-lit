'use client'
import { setCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import signIn from "@/src/FirebaseBridge/Auth/signIn";
import { getData } from "@/src/FirebaseBridge/firestore/getData";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

function Page(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(username, password);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    await getData("users/", result!.user.uid).then((value: { result: DocumentSnapshot<DocumentData, DocumentData> | null }) => {
      let data = value.result?.data();
      console.log(data);
      setCurrentUser(data?.UUID, data?.emailID, data?.dispalyName, data?.role);
      if (data?.role == "admin") {
        router.push("\admin");
      } else if (data?.role == "teacher") {
        console.log("Teacher");
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6 text-black">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={(e) => setUsername(e.target.value + "@moneyconfidence.co.uk")}
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
        </form>
      </div>
    </div>
  );
}

export default Page;