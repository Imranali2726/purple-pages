import "../styles/globals.css";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import Layout from "./layout";
import store from "../services/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
    <>
      <Script id="accessbi" strategy="lazyOnload">
        {`  (function(d){
         var s = d.createElement("script");
         /* uncomment the following line to override default position*/
         /* s.setAttribute("data-position", 3);*/
         /* uncomment the following line to override default size (values: small, large)*/
         /* s.setAttribute("data-size", "small");*/
         /* uncomment the following line to override default language (e.g., fr, de, es, he, nl, etc.)*/
         /* s.setAttribute("data-language", "language");*/
         /* uncomment the following line to override color set via widget (e.g., #053f67)*/
         /* s.setAttribute("data-color", "#053e67");*/
         /* uncomment the following line to override type set via widget (1=person, 2=chair, 3=eye, 4=text)*/
         /* s.setAttribute("data-type", "1");*/
         /* s.setAttribute("data-statement_text:", "Our Accessibility Statement");*/
         /* s.setAttribute("data-statement_url", "http://www.example.com/accessibility")";*/
         /* uncomment the following line to override support on mobile devices*/
         /* s.setAttribute("data-mobile", true);*/
         /* uncomment the following line to set custom trigger action for accessibility menu*/
         /* s.setAttribute("data-trigger", "triggerId")*/
         s.setAttribute("data-account", "LMBzsbZJ1G");
         s.setAttribute("src", "https://cdn.userway.org/widget.js");
         (d.body || d.head).appendChild(s);})(document)`}
      </Script>
      <Provider store={store}>
        <SessionProvider session={session}>
          <Layout>
            <LoadingBar progress={progress} color="#2CB579" />
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </Provider>
    </>
  );
}

export default MyApp;
