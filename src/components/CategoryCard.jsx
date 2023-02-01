import { Link, useParams } from "react-router-dom";

function CategoryCard({ name }) {
  if (!name) {
    return;
  }

  return (
    <div>
      <Link to={`/categories/${name.replace(/\s/gi, "_")}`}>
        <div className="category-container">
          <h1>{name}</h1>
        </div>
      </Link>
    </div>
  );
}
export default CategoryCard;
