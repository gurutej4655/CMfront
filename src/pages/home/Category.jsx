import React from "react";
import CategoryCard from "../../components/home/CategoryCard";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="grid gap-2 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Link to={"/category/rice"}>
        <CategoryCard
          title="Rice"
          image="http://res.cloudinary.com/ds1xih6dd/image/upload/v1717011767/rice_hjgemr.jpg"
        />
      </Link>
      <Link to={"/category/wheat"}>
        <CategoryCard
          title="Wheat"
          image="http://res.cloudinary.com/ds1xih6dd/image/upload/v1717011887/wheat_tyxzww.jpg"
        />
      </Link>
      <Link to={"/category/nuts"}>
        <CategoryCard
          title="Nuts"
          image="http://res.cloudinary.com/ds1xih6dd/image/upload/v1717011694/nut_pjtpag.jpg"
        />
      </Link>
      <Link to={"/category/sugar"}>
        <CategoryCard
          title="Sugar"
          image="http://res.cloudinary.com/ds1xih6dd/image/upload/v1717011829/sugar_dknuox.jpg"
        />
      </Link>
      <Link to={"/category/spices"}>
        <CategoryCard
          title="Spices"
          image="http://res.cloudinary.com/ds1xih6dd/image/upload/v1717011792/spices_gevlwu.jpg"
        />
      </Link>
      <Link to={"/category/fruits"}>
        <CategoryCard
          title="Fruits"
          image="http://res.cloudinary.com/ds1xih6dd/image/upload/v1717011665/fruits_xmjfpm.jpg"
        />
      </Link>
      <Link to={"/category/vegetables"}>
        <CategoryCard
          title="Vegetables"
          image="http://res.cloudinary.com/ds1xih6dd/image/upload/v1717011859/veg_ihracm.jpg"
        />
      </Link>
      <Link to={"/category/pulses"}>
        <CategoryCard
          title="Pulses"
          image="http://res.cloudinary.com/ds1xih6dd/image/upload/v1717011732/pulses_pl5obp.jpg"
        />
      </Link>
    </div>
  );
}

export default Category;
