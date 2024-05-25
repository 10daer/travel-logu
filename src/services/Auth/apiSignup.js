import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { setCookie } from "../Cookie/setCookie";
import { auth, db } from "../firebase";

export default async function signup({ name, email, password }, dispatch) {
  dispatch({ type: "load" });

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, {
      displayName: name,
      photoURL: `https://i.pravatar.cc/100?u=${cred.user.uid}`,
    });
    const user = setCookie("UserSession", cred.user);
    await setDoc(doc(db, `Users/User${user.userID}`), user);
    dispatch({ type: "signup", payload: user });
  } catch (error) {
    dispatch({ type: "error", payload: error.message });
  }
}
