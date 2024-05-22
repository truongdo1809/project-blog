import React from "react";
import { Button, Result } from "antd";
import Link from "next/link";
import Header from "~/components/client-components/header/Header";
import Footer from "~/components/client-components/Footer";

const NotFound: React.FC = () => (
  <div>
    <Header />

    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link href={"/"}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
    <Footer />
  </div>
);

export default NotFound;
