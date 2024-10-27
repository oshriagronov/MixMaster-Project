import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import CocktailList from "../components/CocktailList";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const searchReactQuery = (searchQuery) => {
  return {
    queryKey: ["search", searchQuery || "all"],
    queryFn: async () => {
      const data = await axios.get(`${baseUrl}${searchQuery}`);
      return data.data.drinks;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url).searchParams.get("search");
    const searchQuery = url || "all";
    await queryClient.ensureQueryData(searchReactQuery(searchQuery));
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
