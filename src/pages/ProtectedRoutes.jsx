import Cookies from "js-cookie";
import { useUser } from "../contexts/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../services/Auth/apiVerify";

function ProtectedRoutes({ children }) {
  const { userIsAuthentic } = useUser();
  const navigate = useNavigate();
  const userId = Cookies.get("userSession");
  const user = verifyUser(userId);

  useEffect(() => {
    if (!user || !userIsAuthentic) navigate("/login");
  }, [user, userIsAuthentic, navigate]);

  if (userIsAuthentic) return children;
}

export default ProtectedRoutes;
