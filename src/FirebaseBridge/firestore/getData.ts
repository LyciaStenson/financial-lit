import { getCurrentDatabase } from "../firebaseApp";
import { doc, getDoc, collection, getDocs, getDocsFromCache, getDocFromCache, DocumentReference, DocumentSnapshot, DocumentData, serverTimestamp, QuerySnapshot } from "firebase/firestore";
import { currentUser } from "../Auth/currentUser";
import { answer, quizData } from "@/src/Game/quiz/quizDataBase";

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

export async function getCollection(path: string): Promise<QuerySnapshot<DocumentData>> {
  const colRef = collection(db, path);
  const snapshot = await getDocs(colRef);
  return snapshot;
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
  try {
    //let querySnapshot = await getDocsFromCache(collection(db, path));
    let querySnapshot = await getDocs(collection(db, path));

    if (querySnapshot.empty) {
      console.log('Cache is empty, fetching from server.');
      querySnapshot = await getDocs(collection(db, path));
    }

    const users: currentUser[] = [];
    console.log('Collection Sizes:', querySnapshot.size);

    querySnapshot.forEach(doc => {
      const data = doc.data();
      console.log('Fetched data:', data);
      users.push({
        UUID: data.UUID,
        emailID: data.emailID,
        displayName: data.displayName,
        role: data.role,
        score: data.score,
        streak: data.streak,
        day:data.day,
      });
    });

    console.log('Users array:', users);

    return users;
  } catch (error) {
    console.error('Error fetching user collection:', error);
    // Optionally, handle error or return fallback data
    throw new Error('Failed to fetch user collection');
  }
}

// Assuming this function is already defined somewhere
async function getUserCollectionFromServer(path: string): Promise<currentUser[]> {
  const querySnapshot = await getDocs(collection(db, path));
  const users: currentUser[] = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      UUID: data.UUID,
      emailID: data.emailID,
      loginDate: serverTimestamp(),
      displayName: data.displayName,
      role: data.role,
      score: data.score,
      streak: data.streak,
      day:data.day,
    };
  });

  return users;
}

export async function getQuizCollection(path: string): Promise<quizData<answer>[]> {
  const querySnapshot = await getDocsFromCache(collection(db, path));

  if (querySnapshot.empty) return getQuizCollectionFromServer(path);

  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      question: data.question,
      type: data.type,
      answer: data.answer,
      word: data.word
    }
  });
}

export async function getQuizCollectionFromServer(path: string): Promise<quizData<answer>[]> {
  const querySnapshot = await getDocs(collection(db, path));

  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      question: data.question,
      type: data.type,
      answer: data.answer,
      word: data.word
    }
  });
}