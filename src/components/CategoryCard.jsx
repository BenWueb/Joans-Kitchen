import { Link } from "react-router-dom";

function CategoryCard({ name, imgUrl }) {
  if (!name) {
    return;
  }

  return (
    <div>
      <Link
        className="link category-link"
        to={`/categories/${name.replace(/\s/gi, "_")}`}
      >
        <div className="category-card">
          <img
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1621852003709-763b0b32da0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW50aXBhc3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            alt=""
            className="category-image"
          />
          <div className="category-card-title-container">
            <h2>{name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default CategoryCard;
