"use client";

import Banner from "~/components/client-components/Banner";
import ServicesFaq from "~/components/client-components/services/Fag";
import Services from "~/components/client-components/services/Services";

const ServicesPage = () => {
  return (
    <>
      <Banner content="Services" />
      <Services />
      <ServicesFaq />
    </>
  );
};

export default ServicesPage;
