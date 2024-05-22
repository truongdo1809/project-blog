import React from "react";
import Footer from "~/components/client-components/Footer";
import Header from "~/components/client-components/header/Header";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;