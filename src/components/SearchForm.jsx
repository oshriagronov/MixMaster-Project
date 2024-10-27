import { Form, useNavigation } from "react-router-dom";

const SearchForm = ({ searchQuery }) => {
  const { state } = useNavigation(); // using the navigation hook to access the current state of the router, if submitted it will be true

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
        {isSearching ? "Searching" : "Search"}{" "}
        {/* if the form is being submitted, it will show "Searching" and disable the button, otherwise it will show "Search" */}
      </button>
    </Form>
  );
};

export default SearchForm;
