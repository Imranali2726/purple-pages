import Head from "next/head";
import { FaAngleUp } from "react-icons/fa";
import Footer from "../components/include/Footer";
import Navbar from "../components/include/Navbar";
// eslint-disable-next-line import/no-unresolved
import "@splidejs/react-splide/css";
import "rc-rate/assets/index.css";

export default function layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <div className="fixed left-8 bottom-8 z-50">
        <button
          type="button"
          className="bg-primary p-4 rounded-full pp-shadow"
          onClick={() => window.scrollTo(0, 0)}
        >
          <span className="invert">
            <FaAngleUp />
          </span>
        </button>
      </div>
      <Footer />
    </>
  );
}
