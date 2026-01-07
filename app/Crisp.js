"use client";

import Script from "next/script";

const Crisp = () => (
  <>
    <Script
      id="crisp-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="7af76858-a346-4774-91d7-fd99602a4d47";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
      }}
    />
  </>
);

export default Crisp;