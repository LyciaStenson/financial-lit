// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, addDoc, getDoc, getDocs, setDoc, collection, doc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import { generateRandomName, getRandomInt } from "@/src/utils"

let hasUserBeemCreated = false;

let currentUser = {
    id: 0,
    firstName: "",
    scoreAmount: 0
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "",    
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

export async function getServerSideProps(){
    firebaseConfig.apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY,    
    firebaseConfig.authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    firebaseConfig.projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    firebaseConfig.storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    firebaseConfig.messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
    firebaseConfig.appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
}

let app = undefined;
let database = undefined;
let auth = undefined;

export function createFirebase(){
    app = initializeApp(firebaseConfig);
    database = getFirestore(app);
    auth = getAuth(app);
}

let hasUserLoggedIn = false;

export function hasUserBeenCreated() {
    return hasUserBeemCreated;
}

export function returnAuth(){
    return auth;
}

export function getCurrentUser() {
    if (hasUserBeemCreated) {
        if (currentUser.id != null)
            return currentUser;
    }
}
if(auth != undefined){
    onAuthStateChanged(auth, function (user) {
        if (user) {
            console.log("User found!");
            currentUser = user;
            currentUser.id = user.uid;
            currentUser.firstName = "David";
            } else {
            console.log("No User!");
            hasUserLoggedIn = false;
        }
    });
}



export function getHasUserLoggedIn(){
    return hasUserLoggedIn;
}

export async function logOut(){
    try{
        await signOut(auth);
        console.log("Singed Out");
    }catch(error){
        console.log("Error signing out: ", error);
    }
}

export async function signInWithEmail(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
        hasUserLoggedIn = true;
    } catch (error) {
        console.error('Error signing in:', error);
    }
}

export async function createUserWithPassword(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

export function randomScore() {
    getCurrentUser().scoreAmount = getCurrentUser().scoreAmount * getRandomInt(2, 5);
    setScore(getCurrentUser().scoreAmount);
}

export async function createAccount(firstName, lastName, schoolName, yearGroup, scoreAmount) {
    hasUserBeemCreated = false;
    try {
        const collectionRef = collection(database, "users/", "school", schoolName + "/", "year", yearGroup + "/");
        const docRef = await addDoc(collectionRef, {
            firstName,
            lastName,
            scoreAmount
        });

        console.log("Document written with ID: ", currentUser);
        hasUserBeemCreated = true;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getAllUsers(user) {
    try {
        const docRef = doc(database, "users", "school", user.school + "/", "year", user.year + "/");
        const snapshot = await getDoc(docRef);

        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, firstName: doc.data().firstName, lastName: doc.data().lastName, score: doc.data().scoreAmount });
        });
        return users;
    } catch (e) {
        console.error("Error getting users: ", e);
    }
}

export async function setScore(scoreAmount) {
    if (currentUser.id != null) {
        try {
            const docRef = doc(database, "users", "school", currentUser.school + "/", "year", currentUser.year, currentUser.id, "/");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();

                userData.scoreAmount = scoreAmount;

                await setDoc(docRef, userData);
                currentUser.scoreAmount += scoreAmount;
                console.log(userData.scoreAmount);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error adding Score Value: ", error);
        }
    } else {
        console.error("Current User is null");
    }
}

export async function getQuestionData() {

    const collectionRef = collection(database, "questions", "QuestionType", "ClickTrue");
    const querySnapshot = await getDocs(collectionRef);
    const dataArray = [];

    querySnapshot.forEach((doc) => {
        dataArray.push({
            question: doc.data().question,
            choices: doc.data().choices,
        });
    });

    return dataArray;
}

export async function setQuestionData(question, choices) {
    try {
        const collectionRef = collection(database, "questions", "QuestionType", "ClickTrue");
        const docRef = await addDoc(collectionRef, {
            question,
            choices
        });

        console.log("Document written with ID: ", docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}