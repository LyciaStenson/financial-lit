import {useEffect, useState} from "react";
import {ApplicationVerifier, RecaptchaVerifier, getAuth} from "firebase/auth";

export function useRecaptcha(componentId: string) {
    const auth = getAuth();
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