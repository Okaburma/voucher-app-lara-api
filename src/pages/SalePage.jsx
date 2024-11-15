import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import VoucherInfo from "../components/VoucherInfo";
import SaleForm from "../components/SaleForm";

const SalePage = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={"Sale Module"} />
        <VoucherInfo />
      </Container>
    </section>
  );
};

export default SalePage;
