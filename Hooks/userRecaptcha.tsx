import { ApplicationVerifier, RecaptchaVerifier, getAuth } from "firebase/auth";
import {useEffect, useState} from "react";
import { getCurrentApp } from "@/src/FirebaseBridge/firebaseApp";

const auth = getAuth(getCurrentApp());

export function useRecaptcha(componentId: string) {
    const [recaptcha, setRecaptcha] = useState<ApplicationVerifier>();

    useEffect(() => {
        const recaptchaVerifier = new RecaptchaVerifier(auth, componentId, {
            "size": "invisible",
            "callback": () => {}
        });

        setRecaptcha(recaptchaVerifier);

        return () => {
            recaptchaVerifier.clear();
        }
    }, [componentId]);

    return recaptcha;
}