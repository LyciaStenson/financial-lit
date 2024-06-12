import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { setPersistence, browserSessionPersistence  } from "firebase/auth";
import { getData } from "../firestore/getData";
import { getCurrentAuth } from "../firebaseApp";
import setData from "../firestore/setData";

export interface currentUser {
    UUID?:string | null; //The firebase UID
    emailID?:string; //The id which is randomly generated to the email
    displayName?: string | null;
    role?: string;
    score?: number;
    streak?: number;
}

let user: currentUser;

export function getCurrentUser() :currentUser {
    return user;
}

export function setScore(user:currentUser, score:number){
    user.score! += score;
    setData("users/", user.UUID!, user);
}

export function setUserDetails(uid:string | null, id:string, name:string | null, r?:string) : currentUser {
    let newUser:currentUser = {
        UUID:uid,
        emailID:id,
        displayName:name,
        role:r,
        score:0,
        streak:0
    }

    return newUser;
}


export function setCurrentUser(uid:string | null, id:string, name:string | null, r?:string, score?:number, streak?:number) {

    let isnum = /^\d+$/.test(id); //Checks if the name contains number at index 0 of the part before the @ prefix of the email

    if (isnum) {
        user = {
            UUID:uid,
            emailID:id, //The id which is randomly generated to the email
            displayName: name,
            role: r,
            score: score,
            streak:streak
        }
    } else {
        user = {
            UUID:uid,
            emailID:id, //The id which is randomly generated to the email
            displayName: name,
            role: r,
            score: score,
            streak:streak
        }
    }
}