import { Link } from "react-router-dom";
const CocktailCard = ({ id, name, image, glass, info }) => {
  return (
    <div className="drink">
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <div className="info">
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        <Link className="btn" to={`/cocktail/${id}`}>
          Detail
        </Link>
      </div>
    </div>
  );
};

export default CocktailCard;
