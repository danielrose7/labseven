import * as React from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { GOOGLE_ANALYTICS_ID, pageview } from "../lib/googleAnalytics";

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
      <Component {...pageProps} />
      {!!GOOGLE_ANALYTICS_ID && (
        <>
          <Script
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
            strategy="lazyOnload"
          />
          <Script defer id="google-analytics" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');`}
          </Script>
        </>
      )}
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
