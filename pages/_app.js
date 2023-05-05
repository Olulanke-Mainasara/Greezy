import "@/styles/globals.css";
import ReactQueryProvider from "@/utils/react-query";

export default function App({ Component, pageProps }) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}
