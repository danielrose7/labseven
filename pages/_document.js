import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/shortcut_icon.png"
        />

        {/* fonts tied to Justin's account */}
        <link rel="stylesheet" href="https://use.typekit.net/fqt7rom.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
