/*
    The Main firebase create app function in here
    This will get called before any other firebase related functions
*/

import { initializeApp, getApps, FirebaseApp } from "firebase/app";

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

export function createFirebaseApp(){
}

export function getCurrentApp(){
    return currentApp;
}