import "../styles/globals.css";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import Layout from "./layout";
import store from "../services/store";

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(50));
    router.events.on("routeChangeComplete", () => setProgress(100));
    return () => {
      router.events.off("routeChangeStart", () => setProgress(50));
      router.events.off("routeChangeComplete", () => setProgress(100));
    };
  });
  return (
    <Provider store={store}>
      <Layout>
        <LoadingBar progress={progress} color="#2CB579" />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
