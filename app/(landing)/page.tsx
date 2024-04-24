'use client'

import { /*useSearchParams,*/ useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { useState } from "react"

export default function Home() {
  const router = useRouter()
  const [value, setValue] = useState("")

  //const searchParams = useSearchParams();
  //const id = searchParams.get('id');

  //console.log("id > ", id);

  return (
    <div className="p-4 space-y-4 flex flex-col">
      <Button variant="primary" shape="default" onClick={() => router.push('/home')}>
        Get Started
      </Button>
      <Button variant="default" shape="default" onClick={() => router.push('/game-firebase')}>
        Get Started (Firebase)
      </Button>

      <InputOTP maxLength={8} onChange={(value) => setValue(value)}>
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
          <Button variant={"primary"}>Sign In!</Button>
        </>
      )}
    </div>
  )
}
