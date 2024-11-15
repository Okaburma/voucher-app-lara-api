import React from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import VoucherCard from "../components/VoucherCard";

const VoucherDetailPage = () => {
  return (
    <section>
      <Container>
        <BreadCrumb
          currentPageTitle={"Voucher Detail"}
          links={[{ title: "Voucher Module", path: "/voucher" }]}
        />
        <VoucherCard/>
      </Container>
    </section>
  );
};

export default VoucherDetailPage;
 