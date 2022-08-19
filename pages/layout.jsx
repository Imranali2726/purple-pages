import Head from "next/head";
import Footer from "../components/include/Footer";
import Navbar from "../components/include/Navbar";
// eslint-disable-next-line import/no-unresolved
import "@splidejs/react-splide/css";

export default function layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
