import React from "react";
import CategoryCard from "../../components/home/CategoryCard";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="grid gap-2 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Link to={"/category/rice"}>
        <CategoryCard
          title="Rice"
          image="http://res.cloudinary.com/ds1xih6dd/image/upload/v1717011416/download_j5vlxz.jpg"
        />
      </Link>
      <Link to={"/category/wheat"}>
        <CategoryCard
          title="Wheat"
          image="categories/wheat.jpg"
        />
      </Link>
      <Link to={"/category/nuts"}>
        <CategoryCard
          title="Nuts"
          image="categories/nut.jpg"
        />
      </Link>
      <Link to={"/category/sugar"}>
        <CategoryCard
          title="Sugar"
          image="categories/sugar.jpg"
        />
      </Link>
      <Link to={"/category/spices"}>
        <CategoryCard
          title="Spices"
          image="categories/spices.jpg"
        />
      </Link>
      <Link to={"/category/fruits"}>
        <CategoryCard
          title="Fruits"
          image="categories/fruits.jpg"
        />
      </Link>
      <Link to={"/category/vegetables"}>
        <CategoryCard
          title="Vegetables"
          image="categories/veg.jpg"
        />
      </Link>
      <Link to={"/category/pulses"}>
        <CategoryCard
          title="Pulses"
          image="categories/pulses.jpg"
        />
      </Link>
    </div>
  );
}

export default Category;
