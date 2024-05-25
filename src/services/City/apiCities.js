import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export async function createCity(user, data, dispatch) {
  try {
    const data = await addDoc(`Users/User${user.userID}/Adventures`, {
      ...data,
      date: serverTimestamp(),
    });
    const newData = { ...data, id: data.id };
    dispatch({ type: "city/created", payload: newData });
    setMessage((prevMessage) => ({
      ...prevMessage,
      content: "Travel experience recorded! ✈️🌍",
      status: true,
    }));
  } catch (error) {
    setMessage((prevMessage) => ({
      ...prevMessage,
      content: "There was an error creating a city😞 ",
      status: true,
    }));
  }
}

export async function fetchCity(user, dispatch, id) {
  dispatch({ type: "load" });

  try {
    const docRef = doc(db, `Users/User${user.userID}/Adventures/${id}`);
    const result = await getDoc(docRef);
    const data = { ...result.data(), id: result.id };
    dispatch({ type: "city/ready", payload: data });
  } catch (error) {
    dispatch({
      type: "error",
      payload: "There was an error loading the data",
    });
  }
}

export async function fetchCities(user, dispatch) {
  dispatch({ type: "load" });

  try {
    const userDoc = doc(db, "Users", `User${user.userID}`);
    const Adventures = collection(userDoc, "Adventures");
    const AdventuresQuery = query(Adventures, orderBy("date"));
    const snapshot = await getDocs(AdventuresQuery);
    const cities = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    dispatch({ type: "cities/ready", payload: cities });
  } catch (error) {
    dispatch({
      type: "error",
      payload: "There was an error loading the data",
    });
  }
}

export async function deleteCity(arg, dispatch, user) {
  try {
    await deleteDoc(doc(db, `Users/User${user.userID}/Adventures/${arg}`));
    dispatch({ type: "city/deleted", payload: arg });
    setMessage((prevMessage) => ({
      ...prevMessage,
      content: "Travel record deleted successfully! 🗑️",
      status: false,
    }));
  } catch (error) {
    dispatch({
      type: "message",
      payload: "There was an error deleting the city😞",
    });
  }
}
