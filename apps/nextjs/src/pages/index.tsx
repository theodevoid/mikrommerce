import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@chakra-ui/react";

import { ProductList } from "~/features/home";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mikrommerce</title>
        <meta name="description" content="Solusi berjualan untuk kamu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container py="6">
        <ProductList />
      </Container>
    </>
  );
};

export default Home;
