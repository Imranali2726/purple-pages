import "../styles/globals.css";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
      {/* <Script id="accessbi" strategy="lazyOnload">
        {` (function(){
        var s    = document.createElement('script');
        var h    = document.querySelector('head') || document.body;
        s.src    = 'https://acsbapp.com/apps/app/dist/js/app.js';
        s.async  = true;
        s.onload = function(){
            acsbJS.init({
                statementLink    : '',
                footerHtml       : '',
                hideMobile       : false,
                hideTrigger      : false,
                disableBgProcess : false,
                language         : 'en',
                position         : 'right',
                leadColor        : '#146FF8',
                triggerColor     : '#146FF8',
                triggerRadius    : '50%',
                triggerPositionX : 'right',
                triggerPositionY : 'bottom',
                triggerIcon      : 'people',
                triggerSize      : 'bottom',
                triggerOffsetX   : 20,
                triggerOffsetY   : 20,
                mobile           : {
                    triggerSize      : 'small',
                    triggerPositionX : 'right',
                    triggerPositionY : 'bottom',
                    triggerOffsetX   : 20,
                    triggerOffsetY   : 20,
                    triggerRadius    : '20'
                }
            });
        };
        h.appendChild(s);
    })();`}
      </Script> */}
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
