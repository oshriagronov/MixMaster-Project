import axios from "axios";
import { Form, useNavigation } from "react-router-dom";

const SearchForm = ({ searchQuery }) => {
  const { state } = useNavigation();

  const isSearching = state === "submitting";
  return (
    <Form className="form search-form">
      <input
        className="form-input"
        type="search"
        name="search"
        defaultValue={searchQuery}
      />
      <button className="btn" type="submit" disabled={isSearching}>
        {isSearching ? "Searching" : "Search"}
      </button>
    </Form>
  );
};

export default SearchForm;
