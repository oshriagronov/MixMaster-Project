import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <main>
      <Navbar />
      {isLoading ? (
        <section
          className="page"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="loading"></div>
        </section>
      ) : (
        <section className="page">
          <Outlet />
        </section>
      )}
    </main>
  );
};
export default HomeLayout;
