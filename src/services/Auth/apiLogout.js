import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Cookies from "js-cookie";

export async function logout(dispatch) {
  dispatch({ type: "load" });

  try {
    await signOut(auth);
    Cookies.remove("userSession");
    dispatch({ type: "logout" });
  } catch (error) {
    dispatch({ type: "error", payload: error.message });
  }
}
