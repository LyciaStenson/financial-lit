'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import { useState } from "react"
import signIn, { signInWhenEnteredCode } from "@/src/FirebaseBridge/Auth/signIn"
import { currentUser } from "@/src/FirebaseBridge/Auth/currentUser"
import { getDataAsync } from "@/src/FirebaseBridge/firestore/getData"
import { SignInSuspenseWrapper } from "@/app/(game)/game/SignInSuspenseWrapper"
import { DocumentData, DocumentSnapshot } from "firebase/firestore"
import setData from "@/src/FirebaseBridge/firestore/setData"

export default function Home() {
	const router = useRouter();
	const [value, setValue] = useState("");

	function handleClick(value: string) {
		signInWhenEnteredCode(value).then((value) => {
            router.push("/home");
        });	}

	return (
		<div className="p-4 space-y-4 flex flex-col">
			<SignInSuspenseWrapper />

			<div className="flex flex-col items-center text-lg text-moneyconf-purple font-bold bg-moneyconf-gold border-2 border-b-4 border-moneyconf-purple rounded-xl p-2">
				<h1>
					If you can&#x2019;t scan your QR code,
				</h1>
				<h1>
					enter your code below!
				</h1>
			</div>

			<InputOTP maxLength={400} onChange={(value) => setValue(value)} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
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

			<div className="w-full flex justify-center">
				{value.length >= 8 ? (
					<Button variant="primary" size="wide" onClick={() => handleClick(value)}>Sign In!</Button>
				) : (<></>)}
			</div>
		</div >
	)
}
