import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import ProductEditCard from "../components/ProductEditCard";

const ProductEditPage = () => {
  return (
    <section>
      <Container>
        <BreadCrumb
          currentPageTitle={"Edit Product"}
          links={[{ title: "Product Module", path: "/product" }]}
        />
        <ProductEditCard />
      </Container>
    </section>
  );
};

export default ProductEditPage;
