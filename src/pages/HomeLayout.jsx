import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
const HomeLayout = () => {
  /*
   * The homeLayout component is responsible for rendering the main content of the application.It includes a navigation bar at the top and an Outlet to render the child components.
   * based on the state we can decide whether to show the loading animation and when we finished we will render the child components in Outlet.
   */
  const { state } = useNavigation(); //This hook provides access to the current navigation state and methods. so we can know if we loading or in idle state.
  const isLoading = state === "loading"; // this will return true if we are loading and false otherwise
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
