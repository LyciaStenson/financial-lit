/*
    The Main firebase create app function in here
    This will get called before any other firebase related functions
*/

import { initializeApp, getApps, FirebaseApp } from "firebase/app";

const firebaseConfig = {
    /*Populate this with variables from the env file*/
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,    
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let currentApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export function createFirebaseApp(){
}

export function getCurrentApp(){
    return currentApp;
}