'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { useState, useEffect, Suspense } from "react"
import signIn from "@/src/FirebaseBridge/Auth/signIn"
import { setCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser"
import getData from "@/src/FirebaseBridge/firestore/getData"
import { SignInSuspenseWrapper  } from "@/app/(landing)/SignInSuspenseWrapper"
import { DocumentData, DocumentSnapshot } from "firebase/firestore"

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");

  async function signInWhenEnteredCode(id:string) {
    const username = id + "@moneyconfidence.co.uk";
    const password = "23@f1-*1HA%^3(DA)";

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(username, password);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    await getData("users/", result!.user.uid).then((value:{result:DocumentSnapshot<DocumentData, DocumentData> | null}) => {
      let data = value.result?.data();
      console.log(data);
      setCurrentUser(data?.UUID, data?.emailID, data?.dispalyName, data?.role);
    });

    // Sign in successful
    router.push("/home");
  }

  function handleClick(value:string) {
    signInWhenEnteredCode(value);
  }

  return (
    <div className="p-4 space-y-4 flex flex-col">
      <SignInSuspenseWrapper/>
      <Button variant="primary" shape="default" onClick={() => router.push('/home')}>
        Get Started
      </Button>
      <Button variant="default" shape="default" onClick={() => router.push('/game-firebase')}>
        Get Started (Firebase)
      </Button>

      <InputOTP maxLength={400} onChange={(value) => setValue(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
      </InputOTP>
      {value.length != 8 ? (
        <>Enter your code.</>
      ) : (
        <>
          You entered: {value}
          <Button variant={"primary"} onClick={() => handleClick(value)}>Sign In!</Button>
        </>
      )
      }
    </div >
  )
}
