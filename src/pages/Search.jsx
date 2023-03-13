import algoliasearch from "algoliasearch/lite";
import {
  Pagination,
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  SortBy,
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
    .replace(/[._~:\/?#[\]@!$+;=%]/g, "")
    .replace(/\s/gi, "_");

  return (
    <>
      <Link className="link search-card" to={`/recipes/${searchUrl}`}>
        <div className="category-image">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/joans-recipes.appspot.com/o/images%2Fanh-nguyen-kcA-c3f_3FE-unsplash_800x800.webp?alt=media&token=198179f2-7f57-41fb-8467-788ddcf73e74"
            className="category-image"
          />
        </div>
        <div className="search-card-title-container">
          <h2>{hit.title}</h2>
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
          <InstantSearch searchClient={searchClient} indexName="Recipes">
            <header className="search-container">
              <SearchBox placeholder="Search by Title, Author or Notes content" />
            </header>
            <main className="search-main">
              <Sidebar />
              <Content />
            </main>
          </InstantSearch>
        </div>
      </div>
    </>
  );
}
export default Search;
