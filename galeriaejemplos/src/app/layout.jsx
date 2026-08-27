import CustomHead from "./head";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <CustomHead />
        <style>{
          `html, body {
              margin: 0;
          }`}
        </style>
      </head>
      <body >
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