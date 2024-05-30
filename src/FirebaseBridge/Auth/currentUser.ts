import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { getData } from "../firestore/getData";

export interface currentUser {
    UUID:string | null; //The firebase UID
    emailID?:string; //The id which is randomly generated to the email
    dispalyName: string | null;
    role?: string;
    score?: number;
    streak?: number;
}

let user: currentUser;

export function getCurrentUser() :currentUser {
    getData("users/", user?.UUID!).then((value:{result:DocumentSnapshot<DocumentData, DocumentData> | null}) =>{
        const result = value.result?.data();
        user = setUserDetails(result?.UUID, result?.id, result?.name, result?.role);
        return user;
    });

    return user;
}

export function setUserDetails(uid:string | null, id:string, name:string | null, r?:string) : currentUser {
    let newUser:currentUser = {
        UUID:uid,
        emailID:id,
        dispalyName:name,
        role:r,
        score:0,
        streak:0
    }

    return newUser;
}


export function setCurrentUser(uid:string | null, id:string, name:string | null, r?:string) {

    let isnum = /^\d+$/.test(id); //Checks if the name contains number at index 0 of the part before the @ prefix of the email

    if (isnum) {
        user = {
            UUID:uid,
            emailID:id, //The id which is randomly generated to the email
            dispalyName: name,
            role: r,
            score: 0,
            streak:0
        }
    } else {
        user = {
            UUID:uid,
            emailID:id, //The id which is randomly generated to the email
            dispalyName: name,
            role: r,
            score: 0,
            streak:0
        }
    }
}