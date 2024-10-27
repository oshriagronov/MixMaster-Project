import { Link, useRouteError } from "react-router-dom";
import img from "../assets/not-found.svg"; // Import the not found image

const Error = () => {
  const error = useRouteError(); // Get the route error object, so we can get the status and know to display error page.
  if (error.status === 404) {
    return (
      <div className="error-page">
        <img src={img} alt="not found" />
        <h3>Ohh! </h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>{" "}
        {/* Redirect back to home, we use Link components instead of button because we want to route to different page using react router */}
      </div>
    );
  }
  return (
    <div className="error-page">
      <h3>something went wrong</h3>
    </div>
  );
};

export default Error;
