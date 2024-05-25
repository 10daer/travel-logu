import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { db } from "../firebase";

export function setCookie(name, value) {
  Cookies.set(name, value, {
    domain: window.location.hostname,
    secure: true,
    path: "/",
    sameSite: "strict",
  });
  return defineUser(user);
}

export const readCookie = async function (value) {
  try {
    const docRef = doc(db, `Users/User${id}`);
    const result = await getDoc(docRef);
    const sessionUser = defineUser(result.data());
    dispatch({ type: "signin", payload: sessionUser });
  } catch (error) {
    dispatch({ type: "error", payload: error.message });
  }
};
