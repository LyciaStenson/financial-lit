import { uuidv4 } from "@firebase/util";
import { getCurrentDatabase } from "../firebaseApp";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Get the Firestore instance
const db = getCurrentDatabase();

// Function to add data to a Firestore collection
export default async function setData(
  collection: string,
  id: string | null,
  data: any
) {
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Set the document with the provided data in the specified collection and ID
    result = await setDoc(doc(db, collection, id!), data, {
      merge: true, // Merge the new data with existing document data
    });

  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
    console.log(error);
  }

  // Return the result and error as an object
  return { result, error };
}