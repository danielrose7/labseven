import * as React from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID, pageview } from "../lib/googleAnalytics";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  React.useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    router.events.on("hashChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
      router.events.off("hashChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <Component {...pageProps} />
      <Script
        id="crisp-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="7af76858-a346-4774-91d7-fd99602a4d47";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
        }}
      />
    </>
  );
}

export default MyApp;
