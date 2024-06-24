/*
    The Main firebase create app function in here
    This will get called before any other firebase related functions
*/

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/*
const firebaseConfig = {
    apiKey: "AIzaSyCVKpBIpYpehl0RoE7vAZRxGL-U1rHOt9A",
    authDomain: "space-man-game.firebaseapp.com",
    projectId: "space-man-game",
    storageBucket: "space-man-game.appspot.com",
    messagingSenderId: "533835724521",
    appId: "1:533835724521:web:67832422129ffba216a278",
};
*/

let currentApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

initializeFirestore(currentApp, {localCache: persistentLocalCache()});

let db = getFirestore(currentApp);
let auth = getAuth(currentApp);

export function getCurrentApp(){
    return currentApp;
}

export function getCurrentAuth(){
    return auth;
}

export function getCurrentDatabase(){
    return db;
}
