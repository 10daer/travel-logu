import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function verifyUser(id) {
  try {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const userIDs = querySnapshot.docs.map((doc) => doc.id);
    const user = userIDs.find((el) => el === id);

    return user;
  } catch (error) {
    throw new Error(`${error}:Something went wrong`);
  }
}
