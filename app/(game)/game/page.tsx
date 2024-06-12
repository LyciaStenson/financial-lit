'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"

import { useState } from "react"
import signIn from "@/src/FirebaseBridge/Auth/signIn"
import { setCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser"
import { getDataAsync } from "@/src/FirebaseBridge/firestore/getData"
import { SignInSuspenseWrapper } from "@/app/(game)/game/SignInSuspenseWrapper"
import { DocumentData, DocumentSnapshot } from "firebase/firestore"

export default function Home() {
	const router = useRouter();
	const [value, setValue] = useState("");

	async function signInWhenEnteredCode(id: string) {
		const username = id + "@moneyconfidence.co.uk";
		const password = "23@f1-*1HA%^3(DA)";

		// Attempt to sign in with provided email and password
		const { result, error } = await signIn(username, password, undefined);

		if (error) {
			// Display and log any sign-in errors
			console.log(`login failed ${error}`);
			return;
		}

		await getDataAsync("users/", result!.user.uid).then((value: { result: DocumentSnapshot<DocumentData, DocumentData> | null }) => {
			let data = value.result?.data();
			setCurrentUser(data?.UUID, data?.emailID, data?.displayName, data?.role, data?.score, data?.streak);
		});

		// Sign in successful
		router.push("/home");
	}

	function handleClick(value: string) {
		signInWhenEnteredCode(value);
	}

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

			<div className="w-full flex justify-center">
				{value.length >= 8 ? (
					<Button variant="primary" size="wide" onClick={() => handleClick(value)}>Sign In!</Button>
				) : (<></>)}
			</div>
		</div >
	)
}
