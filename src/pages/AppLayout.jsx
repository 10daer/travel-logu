import Map from "../features/Map/Map";
import SideBar from "../components/SideBar";
import User from "../features/User/User";
import styles from "./AppLayout.module.css";
import ProtectedRoutes from "./ProtectedRoutes";

function AppLayout() {
  return (
    <ProtectedRoutes>
      <div className={styles.app}>
        <SideBar />
        <User />
        <Map />
      </div>
    </ProtectedRoutes>
  );
}

export default AppLayout;
