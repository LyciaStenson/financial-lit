'use client'
import { setUserDetails } from "@/src/FirebaseBridge/Auth/currentUser";
import signUp from "@/src/FirebaseBridge/Auth/signUp";
import setData from "@/src/FirebaseBridge/firestore/setData";
import { UserCredential } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useState } from "react";

function Page(): JSX.Element {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const router = useRouter();

  // Handle form submission
  const handleForm = async ( event: { preventDefault: () => void } ) => {
    event.preventDefault();

    // Attempt to sign up with provided email and password
    const result = await signUp( email + "@moneyconfidence.co.uk", password ).then((result:UserCredential | null) => {
      let user = setUserDetails( result!.user.uid, email + "@moneyconfidence.co.uk", email, "admin");
      setData("users/", user.UUID!, user);
    });

    console.log(result);
    // Redirect to the admin page
    router.push( "/admin" );
  }

  return (
    <div className="flex justify-center items-center h-screen text-black">
      <div className="w-96 bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Create an Account</h1>
        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              onChange={( e ) => setEmail( e.target.value)}
              required
              placeholder="Enter the Users code here!"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              onChange={( e ) => setPassword( e.target.value )}
              required
              id="password"
              type="password"
              placeholder="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;