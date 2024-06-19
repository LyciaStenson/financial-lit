import { DocumentData, DocumentSnapshot, serverTimestamp } from "firebase/firestore";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { getData } from "../firestore/getData";
import { getCurrentAuth } from "../firebaseApp";
import setData from "../firestore/setData";


export interface dayComplete{
    day:string;
    completed:boolean;
}

export interface currentUser {
    UUID?:string | null; //The firebase UID
    emailID?:string; //The id which is randomly generated to the email
    createdDate?:string;
    displayName?: string | null;
    role?: string;
    score?: number;
    streak?: number;
    day:dayComplete[] | null;
}

let user: currentUser;

export function getCurrentUser() :currentUser {
    return user;
}

export function setDayCompleted(user:currentUser, day:number){
    user.day![day].completed = true;
    setData("users/", user.UUID!, user);
}

export function isDayCompleted(user:currentUser, day:number){
    return user.day![day].completed;
}

export function setScore(user:currentUser, score:number){
    user.score! += score;
    setData("users/", user.UUID!, user);
}

export function setStreak(user:currentUser, streak:number){
    user.streak! += streak;
    setData("users/", user.UUID!, user);
}

export function setUserDetails(uid:string | null, id:string, name:string | null, r?:string) : currentUser {
    let newUser:currentUser = {
        UUID:uid,
        emailID:id,
        createdDate:"",
        displayName:name,
        role:r,
        score:0,
        streak:0,
        day:null,
    }

    return newUser;
}


export function setCurrentUser(uid:string | null, id:string, name:string | null, r?:string, score?:number, streak?:number) {

    let isnum = /^\d+$/.test(id); //Checks if the name contains number at index 0 of the part before the @ prefix of the email

    if (isnum) {
        user = {
            UUID:uid,
            emailID:id, //The id which is randomly generated to the email
            createdDate:"",
            displayName: name,
            role: r,
            score: score,
            streak:streak,
            day:null,
        }
    } else {
        user = {
            UUID:uid,
            emailID:id, //The id which is randomly generated to the email
            createdDate:"",
            displayName: name,
            role: r,
            score: score,
            streak:streak,
            day:null,
        }
    }
}