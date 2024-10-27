import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import the QueryClient and QueryClientProvider for caching queries to save api calls
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import the createBrowserRouter and RouterProvider for routing in the application
import { loader as landingLoader } from "./pages/Landing"; // Import the loader function for the Landing page, so we can load it before rendering
import { loader as singleCocktailLoader } from "./pages/Cocktail"; //Import the loader function for the Single Cocktail page, so we can load it before rendering
import { action as NewsletterAction } from "./pages/Newsletter"; // Import the NewsletterAction action for handling newsletter subscription, because we use post method in the form
import {
  HomeLayout,
  About,
  Landing,
  Error,
  Newsletter,
  Cocktail,
  SinglePageError,
} from "./pages"; // Import all the pages and layout components

const queryClient = new QueryClient({
  /*
   * If you want to cache queries for a specific time, you can set the staleTime property, i set it to 5min until the cache deleted.
   */
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const router = createBrowserRouter([
  /*
  * The index route is always at the root of your application. so which you chose to set aas index when you go to "/" you will be redirected to this page.
  * loader function is used to fetch data before rendering the page, it's like fetching data from an API before rendering the page.
  * errorElement prop is used to render a custom error component if there is any error during the loading of the page, but you can set a different error element for different pages as example bellow we
  have 2 different error elements one is a general <Error/>, and another is a <SinglePageError/>.
  * element prop is used to render a custom component that will be rendered when going the specific route which is in the path property.
  */
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: landingLoader(queryClient),
        element: <Landing />,
        errorElement: <SinglePageError />,
      },
      {
        path: "cocktail/:id",
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
        errorElement: <SinglePageError />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        action: NewsletterAction,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
};
export default App;
