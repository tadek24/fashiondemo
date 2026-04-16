import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DefaultSeo
        titleTemplate="%s | Quiet Luxury"
        defaultTitle="Quiet Luxury | Premium Fashion Boutique"
        description="A premium fashion boutique showcasing minimalist design, luxury clothing, and editorial fashion."
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
