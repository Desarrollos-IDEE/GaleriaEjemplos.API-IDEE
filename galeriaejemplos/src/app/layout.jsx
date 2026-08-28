import { Roboto } from "next/font/google";
import CustomHead from "./head";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={roboto.className}>
      <head>
        <CustomHead />
        <style>{
          `html, body {
              margin: 0;
          }`}
        </style>
      </head>
      <body>
        <main id="main">
          <noscript>
            ⚙️ You need to enable JavaScript to run this app ⚙️
          </noscript>
          {children}
        </main>
      </body>
    </html>
  );
}