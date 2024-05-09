'use client'
import { setCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import signIn from "@/src/FirebaseBridge/Auth/signIn";
import getData from "@/src/FirebaseBridge/firestore/getData";
import { useRouter } from 'next/navigation';
import { stringify } from "querystring";
import { useEffect, useState } from "react";

const _state = history.state;

function Page(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (_state) {
      signInWhenEnteredCode();
    }
  }, [username, password]); // Include 'router' in the dependency array to resolve eslint warning

  async function signInWhenEnteredCode() {
    setUsername(_state.email);
    setPassword("23@f1-*1HA%^3(DA)");

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(username, password);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    let data = (await getData("users/", result!.user.uid)).result?.data();
    setCurrentUser(data?.UUID, data?.emailID, data?.dispalyName, data?.role);

    // Sign in successful
    router.push("/home");
  }

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

    // Sign in successful
    console.log(result);

    // Redirect to the admin page
    // Typically you would want to redirect them to a protected page an add a check to see if they are admin or 
    // create a new page for admin

    router.push("/gamescreen");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6 text-black">Sign In</h1>
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