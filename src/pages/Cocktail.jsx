import { useLoaderData, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="; // API base url endpoint to fetch cocktail details by ID(need to add id)

const cocktailQuery = (id) => {
  /*
   * This function returns a query object that can be used with the useQuery hook from React Query.
   */
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const data = await axios.get(`${singleCocktailUrl}${id}`); // API call to fetch cocktail details by ID
      return data.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    /*
     * This function is called when the loader hook is used in a route.
     * it's get the queryClient from react-query and use the cocktailQuery function to fetch cocktail details by ID but this time we're using the queryClient.getQueryData method to cache the result of the API call.
     * if the data exists in the cache, it will be returned immediately without making a new API call. If not, it will make a new API call and store the result in the cache for future use.This is useful for fetching data that doesn't change frequently.
     */
    const { id } = params; // extract the ID from the route parameters
    await queryClient.ensureQueryData(cocktailQuery(id)); // Ensure the cocktail details are cached or fetched from the API before rendering.
    return { id }; // Return the ID of the cocktail to be used in the components Cocktail from the useLoaderData.
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(cocktailQuery(id));
  if (!data?.drinks) return <Navigate to="/" />; // if the cocktail details are not available/doesn't exist, redirect to home page.
  const {
    strDrink: name,
    strDrinkThumb: image,
    strGlass: glass,
    strAlcoholic: info,
    strCategory: category,
    strInstructions: instruction,
  } = data.drinks[0]; // destructure the cocktail details from the API response
  const ingredients = Object.keys(data.drinks[0])
    .filter(
      (key) => key.startsWith("strIngredient") && data.drinks[0][key] !== null
    )
    .map((key) => data.drinks[0][key]); // extract the ingredient names from the cocktail details and map them to an array

  return (
    <section className="single-drink-page">
      <header>
        <Link className="btn" to="/">
          Go back
        </Link>
        <h3 style={{ marginTop: "1rem" }}>{name}</h3>
      </header>
      <div className="single-drink-container">
        <img src={image} alt={name} className="img" />
        <div className="single-drink-info">
          <p>
            <span className="single-drink-data">Name:</span>
            {name}
          </p>
          <p>
            <span className="single-drink-data">Category:</span>
            {category}
          </p>
          <p>
            <span className="single-drink-data">Info:</span>
            {info}
          </p>
          <p>
            <span className="single-drink-data">Glass:</span>
            {glass}
          </p>
          <p>
            <span className="single-drink-data">Ingredients:</span>
            {ingredients.map((ing, index) => {
              return (
                <span key={ing} className="ing">
                  {ing}
                  {index !== ingredients.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="single-drink-data">instructions:</span>
            {instruction}
          </p>
        </div>
      </div>
    </section>
  );
};
export default Cocktail;
