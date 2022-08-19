import Footer from "../components/include/Footer";
import Navbar from "../components/include/Navbar";
// eslint-disable-next-line import/no-unresolved
import "@splidejs/react-splide/css";

export default function layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
