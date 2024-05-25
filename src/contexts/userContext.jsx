import { useContext } from "react";
import { UserAuthContext } from "../Provider/userProvider";

export default function useUser() {
  const context = useContext(UserAuthContext);
  if (context === undefined)
    throw new Error("User context was used outside the Provider");
  return context;
}
