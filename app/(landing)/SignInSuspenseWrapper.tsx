import { signInWhenEnteredCode } from "@/src/FirebaseBridge/Auth/signIn";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const { Suspense } = require("react")

const SignIn = (): JSX.Element => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    if(id){
        signInWhenEnteredCode(id).then((id) => {
            router.push("/home");
        });
    }
    return (
        <div />
    )
}

export const SignInSuspenseWrapper = () => {
    return (
        <Suspense>
            <SignIn />
        </Suspense>
    )
}

export default SignInSuspenseWrapper;
