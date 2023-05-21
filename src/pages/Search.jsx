import algoliasearch from "algoliasearch/lite";
import {
  Pagination,
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
} from "react-instantsearch-hooks-web";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// Algolia credentials
const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPID,
  process.env.REACT_APP_ALGOLIA_APIKEY
);

// Convert title to URL format and display each hit
const Hit = ({ hit }) => {
  const searchUrl = hit.title
    .toLowerCase()
    .replace(/[._~:/?#[\]@!$+;=%]/g, "")
    .replace(/\s/gi, "_");

  return (
    <>
      <Link className="link search-card" to={`/recipes/${searchUrl}`}>
        <div className="category-image">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/joans-recipes.appspot.com/o/images%2F96BI44rNPkZcSOZ3wCl4B197Xwr1-anh-nguyen-kcA-c3f_3FE-unsplash.jpg-e7d7932a-f73b-4d6c-8500-e733e7503520_800x800?alt=media&token=95d80d74-2134-42ee-b5ba-5f04df160312"
            className="category-image"
            alt="delicious food"
          />
        </div>
        <div className="search-card-title-container">
          <h4>{hit.title}</h4>
          <p>Created by: {hit.createdBy}</p>
        </div>
      </Link>
    </>
  );
};

function Content() {
  return (
    <div className="search-content">
      <Stats />
      <Hits hitComponent={Hit} />
      <Pagination />
    </div>
  );
}

function Search() {
  return (
    <>
      <div className="background"></div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="container">
        <div className="page-container">
          <h1 className="page-title">Search</h1>
          <InstantSearch
            searchClient={searchClient}
            indexName="Recipes"
            routing={true}
          >
            <header className="search-container">
              <SearchBox placeholder="Search by Title, Author or Notes content" />
            </header>
            <main className="search-main">
              <Content />
            </main>
          </InstantSearch>
        </div>
      </div>
    </>
  );
}
export default Search;
