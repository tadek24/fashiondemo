import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background selection:bg-foreground selection:text-background text-foreground">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={router.asPath}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} 
          className="flex-grow flex flex-col" 
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
