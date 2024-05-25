import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import logout from "../../services/Auth/apiLogout";
import useUser from "../../contexts/userContext";

function User() {
  const navigate = useNavigate();
  const { dispatchUser } = useUser();

  function handleClick(e) {
    e.preventDefault();
    logout(dispatchUser);
    navigate("/");
  }

  return (
    <div className={styles.user} onClick={handleClick}>
      <img src="" alt="logout-icon" />
      <button>Logout</button>
    </div>
  );
}

export default User;
