import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import Lenis from "lenis";
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Initialize standard Lenis smooth scrolling (Awwwards default config)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DefaultSeo
        titleTemplate="%s | VELOUR"
        defaultTitle="VELOUR | Digital Editorial"
        description="Ekskluzywny magazyn digitalowy i butik. Nowoczesne rzemiosło w służbie absolutnego minimalizmu."
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
