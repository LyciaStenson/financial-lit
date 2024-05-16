import firebase from "firebase/compat/app";
import {getCurrentApp} from "../firebaseApp";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { currentUser } from "../Auth/currentUser";

// Get the Firestore instance
const db = getFirestore(getCurrentApp());

// Function to retrieve a document from a Firestore collection
export default async function getData(collection:string, id:string) {
  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id);
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Retrieve the document using the document reference
    result = await getDoc(docRef);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result };
}

export async function getUsersCollection(path: string): Promise<currentUser[]> {
  const querySnapshot = await getDocs(collection(db, path));
  return querySnapshot.docs.map(doc =>{
    const data = doc.data();
    return{
      UUID:data.UUID,
      emailID:data.emailID,
      dispalyName:data.dispalyName,
      role:data.role,
      score:data.score,
      streak:data.streak,
    }
  });
}

export async function getCollection(path: string)  {
  const querySnapshot = await getDocs(collection(db, "cities"));
  return querySnapshot;
}