import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import CocktailList from "../components/CocktailList";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const searchReactQuery = (searchQuery) => {
  /*
   * This function returns a query object that can be used with the useQuery hook.
   */
  return {
    queryKey: ["search", searchQuery || "all"], // The key for this query, if the searchQuery is not provided, it defaults to "all".
    queryFn: async () => {
      const data = await axios.get(`${baseUrl}${searchQuery}`); // Fetch data from API based on user input.
      return data.data.drinks;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    /*
     * This function is called when the loader data is requested. It returns a promise that resolves to the search results.
     * We use the queryClient to get the current state of the query cache. and check if there's already a query for the given searchQuery.
     * If there is, we return it immediately. Otherwise, we create a new query using the searchReactQuery function.
     * All of it happened before the render.
     * We use loader like this because we want to use cachable data in our application and we don't want to make unnecessary API calls.
     */
    const url = new URL(request.url).searchParams.get("search"); // Get the search query from the get request URL of the submitted form.
    const searchQuery = url || "all"; // If no search query is provided, it defaults to "all".
    await queryClient.ensureQueryData(searchReactQuery(searchQuery)); // Ensure that the query data for the given searchQuery is cached.If not, it will be fetched from the API.This happens before the render.
    return { searchQuery };
  };
const Landing = () => {
  const { searchQuery } = useLoaderData();
  const { data: drinks } = useQuery(searchReactQuery(searchQuery));
  return (
    <section>
      <SearchForm searchQuery={searchQuery} />
      <CocktailList cocktails={drinks} />
    </section>
  );
};
export default Landing;
