import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="tr" className="dark">
      <Head />
      <body className="antialiased dark:bg-backgroundDark bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
