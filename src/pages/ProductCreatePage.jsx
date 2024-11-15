import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import ProductCreateCard from "../components/ProductCreateCard";

const ProductCreatePage = () => {
  return (
    <section>
      <Container>
        <BreadCrumb
          currentPageTitle={"Create Product"}
          links={[{ title: "Product Module", path: "/product" }]}
        />
        <ProductCreateCard/>
      </Container>
    </section>
  );
};

export default ProductCreatePage;
