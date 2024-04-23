// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, addDoc, getDoc, getDocs, setDoc, collection, doc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import { generateRandomName, getRandomInt } from "@/src/utils"

let hasUserBeemCreated = false;

let currentUser = {
    id: 0,
    code: "12345678",
    firstName: "",
    lastName: "",
    school: "",
    year: "",
    scoreAmount: 0
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA56SfIyzjF_IpdEwULJe_ljsNMiYbF2F4",    
    authDomain: "rt-financial-lit.firebaseapp.com",
    projectId: "rt-financial-lit",
    storageBucket: "rt-financial-lit.appspot.com",
    messagingSenderId: "118520334145",
    appId: "1:118520334145:web:625dc06131a5a0edc3c3c0",
    measurementId: "G-WGB10PRJHY"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

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

onAuthStateChanged(auth, function (user) {
    if (user) {
        console.log("User found!");
        currentUser = user;
        let nameWithDash = user.email.split("@");
        let name = nameWithDash[0].split("-");

        let first = name[0];
        let last = name[1];

        currentUser.firstName = first;
        currentUser.lastName = last;
        currentUser.scoreAmount = 0;
        hasUserLoggedIn = true;
        //createAccount();
    } else {
        console.log("No User!");
        hasUserLoggedIn = false;
    }
});

export function getHasUserLoggedIn(){
    return hasUserLoggedIn;
}

export async function logOut(){
    try{
        await signOut(auth);
        console.log("Singed Out");
    }catch(error){
        console.log("Error singing out: ", error);
    }
}

export async function logInWithEmail(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in successfully!');
        hasUserLoggedIn = true;
    } catch (error) {
        console.error('Error logging in:', error);
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

        currentUser.id = docRef.id;
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
        currentUser.school = schoolName; //Note (Sam): We get this for the leaberboards. I think? But might remove if not.
        currentUser.year = yearGroup;
        currentUser.score = scoreAmount;

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

    const collectionRef = collection(database, "questions", "Click True", "Question 01");
    const querySnapshot = await getDocs(collectionRef);
    const dataArray = [];

    querySnapshot.forEach((doc) => {
        dataArray.push({
            question: doc.data().question,
            choices: doc.data().choices,
        });
    });

    return dataArray;

    /*const dataRef = doc(database, "questions", "Click True", "Question 01", "G00Vomw4oHmi15imdZSl");
    return getDoc(dataRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const dataArray = [];
                snapshot.((childSnapshot) => {
                    const userData = childSnapshot.val();
                    dataArray.push({
                       userData
                    });   
                });

                dataArray.sort((a, b) => b.score - a.score); // Sort in descending order

                return dataArray;
            } else {
                console.log("No question data available");
                return [];
            }
        })
        .catch((error) => {
            console.error("Error getting leaderboard data:", error);
            throw error; // Propagate the error further
        });*/
}

export async function setQuestionData(question, choices) {
    try {
        const collectionRef = collection(database, "questions", "Click True", "Question 01");
        const docRef = await addDoc(collectionRef, {
            question,
            choices
        });

        console.log("Document written with ID: ", docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}