/*
    The Main firebase create app function in here
    This will get called before any other firebase related functions
*/

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVKpBIpYpehl0RoE7vAZRxGL-U1rHOt9A",
    authDomain: "space-man-game.firebaseapp.com",
    projectId: "space-man-game",
    storageBucket: "space-man-game.appspot.com",
    messagingSenderId: "533835724521",
    appId: "1:533835724521:web:67832422129ffba216a278",
    measurementId: "G-JKWF4J8YBT"
  };

let currentApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

initializeFirestore(currentApp, {localCache: persistentLocalCache()});

let db = getFirestore();

export function getCurrentApp(){
    return currentApp;
}

export function getFirestoreDatabase(){
    return db;
}



// Enable offline persistence