import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import styles from "./Layout.module.css";

export const Layout = () => {
  const isLoading = useSelector(getLoading);
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{<Outlet />}</main>

      <Footer />
      {isLoading && <Loader />}
    </div>
  );
};
