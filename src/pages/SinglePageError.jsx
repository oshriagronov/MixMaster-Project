import { useRouteError } from "react-router-dom"; // using hook to get error msg from library of reactrouter-dom
const SinglePageError = () => {
  const error = useRouteError();
  return <h2>{error.message}</h2>;
};
export default SinglePageError;
