import { createContext, useReducer } from "react";
import { GlobalTypes } from "../../GlobalTypes";
import userReducer from "../reducers/userReducer";

UserAuthProvider.propTypes = GlobalTypes;

const UserAuthContext = createContext();
const initState = {
  user: null,
  userIsAuthentic: false,
  userMessage: "",
  userIsLoading: false,
};

function UserAuthProvider({ children }) {
  const [{ user, userIsAuthentic, userIsLoading, userMessage }, dispatchUser] =
    useReducer(userReducer, initState);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        userIsAuthentic,
        userIsLoading,
        userMessage,
        dispatchUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export { UserAuthContext, UserAuthProvider };
