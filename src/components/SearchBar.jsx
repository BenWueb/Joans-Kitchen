import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSistrix } from "react-icons/fa";

function SearchBar() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    navigate(`/search?Recipes[query]=${search}`);
  };
  return (
    <>
      <form className="search-bar-container" onSubmit={onSubmit}>
        <input
          type="text"
          value={search}
          name="search"
          onChange={onChange}
          placeholder="Search by Title, Author or Notes"
        />
        <button type="submit" className="">
          <FaSistrix
            style={{ height: "40px ", width: "40px", color: "white" }}
          />
        </button>
      </form>
    </>
  );
}
export default SearchBar;
