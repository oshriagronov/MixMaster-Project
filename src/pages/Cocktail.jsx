import { useLoaderData, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const cocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const data = await axios.get(`${singleCocktailUrl}${id}`);
      return data.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(cocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(cocktailQuery(id));
  if (!data?.drinks) return <Navigate to="/" />;
  const {
    strDrink: name,
    strDrinkThumb: image,
    strGlass: glass,
    strAlcoholic: info,
    strCategory: category,
    strInstructions: instruction,
  } = data.drinks[0];
  const ingredients = Object.keys(data.drinks[0])
    .filter(
      (key) => key.startsWith("strIngredient") && data.drinks[0][key] !== null
    )
    .map((key) => data.drinks[0][key]);

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
