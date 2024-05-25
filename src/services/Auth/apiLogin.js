import {
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setCookie } from "../Cookie/setCookie";
import { auth, provider } from "../firebase";

export default function login({ email, password }, dispatch) {
  dispatch({ type: "load" });

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      const user = setCookie("UserSession", cred.user);
      dispatch({ type: "signin", payload: user });
    })
    .catch((error) => {
      dispatch({ type: "error", payload: error.message });
    });
}

export async function googleSignin(dispatch) {
  dispatch({ type: "load" });

  try {
    const credential = await signInWithPopup(auth, provider);
    await updateProfile(credential.user, {
      photoURL: `https://i.pravatar.cc/100?u=${credential.user.uid}`,
    });
    const user = setUser(credential.user);
    dispatch({ type: "signin", payload: user });
  } catch (error) {
    const errorEmail = error.customData.email;
    dispatch({ type: "error", payload: error.message });
  }
}
