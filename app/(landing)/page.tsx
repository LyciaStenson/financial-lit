'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { useState, useEffect } from "react"

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(()=>{
    if(id!){
      history.pushState({ email: id + "@moneyconfidence.co.uk" }, "", "/login");
    router.push("/login");
    }
  });

  function handleClick() {
    history.pushState({ email: value + "@moneyconfidence.co.uk" }, "", "/login");
    router.push("/login");
  }

  return (
    <div className="p-4 space-y-4 flex flex-col">
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
          <Button variant={"primary"} onClick={() => handleClick()}>Sign In!</Button>
    </>
  )
}
    </div >
  )
}
