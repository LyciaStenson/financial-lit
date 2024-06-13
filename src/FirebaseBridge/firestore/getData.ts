import { getCurrentDatabase } from "../firebaseApp";
import { doc, getDoc, collection, getDocs, getDocsFromCache, getDocFromCache, DocumentReference, DocumentSnapshot, DocumentData } from "firebase/firestore";
import { currentUser } from "../Auth/currentUser";
import { quizData } from "@/src/Game/quiz/quizData";

// Get the Firestore instance
const db = getCurrentDatabase();

// Function to retrieve a document from a Firestore collection
export async function getDataAsync(collection: string, id: string) {
  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id);
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Retrieve the document using the document reference
    result = await getDataFromServer(docRef);

    if (!result) { result = await getDataFromServer(docRef); }

  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
    console.log(e);
  }

  // Return the result and error as an object
  return { result };
}

export function getData(collection: string, id: string, callback: (result: DocumentSnapshot<DocumentData> | null, error: Error | null) => void) {
  const docRef = doc(db, collection, id);

  getDoc(docRef)
    .then(result => {
      callback(result, null);
    })
    .catch(error => {
      console.log(error);
      callback(null, error);
    });
}

export async function getDataFromServer(doc: DocumentReference) {
  return await getDoc(doc);
}

export async function getUserCollection(path: string): Promise<currentUser[]> {
  const querySnapshot = await getDocsFromCache(collection(db, path));

  if (querySnapshot.empty) return getUserCollectionFromServer(path);

  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      UUID: data.UUID,
      emailID: data.emailID,
      displayName: data.displayName,
      role: data.role,
      score: data.score,
      streak: data.streak,
    }
  });
}

async function getUserCollectionFromServer(path: string): Promise<currentUser[]> {
  const querySnapshot = await getDocs(collection(db, path));
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      UUID: data.UUID,
      emailID: data.emailID,
      displayName: data.displayName,
      role: data.role,
      score: data.score,
      streak: data.streak,
    }
  });
}

export async function getQuizCollection(path: string): Promise<quizData[]> {
  const querySnapshot = await getDocsFromCache(collection(db, path));

  if (querySnapshot.empty) return getQuizCollectionFromServer(path);

  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      question: data.question,
      type: data.type,
      answer: data.answer
    }
  });
}

export async function getQuizCollectionFromServer(path: string): Promise<quizData[]> {
  const querySnapshot = await getDocs(collection(db, path));

  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      question: data.question,
      type: data.type,
      answer: data.answer
    }
  });
}