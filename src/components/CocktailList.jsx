import CocktailCard from "./CocktailCard";
const CocktailList = ({ cocktails }) => {
  if (!cocktails) {
    return (
      <h4 style={{ textAlign: "center" }}>No matching cocktail found..</h4>
    );
  }
  return (
    <article className="drinks">
      {cocktails.map((cocktail) => {
        const { strDrink, strDrinkThumb, strGlass, strAlcoholic, idDrink } =
          cocktail;
        return (
          <CocktailCard
            key={idDrink}
            name={strDrink}
            id={idDrink}
            image={strDrinkThumb}
            glass={strGlass}
            info={strAlcoholic}
          />
        );
      })}
    </article>
  );
};
export default CocktailList;
