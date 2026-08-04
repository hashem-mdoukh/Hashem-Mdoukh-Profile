"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.5,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const arrowVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -3,
    transition: { duration: 0.2, repeat: Infinity, repeatType: "reverse" },
  },
};

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={buttonVariants}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 15px var(--glow)",
          }}
          whileTap={{
            scale: 0.9,
            borderColor: "var(--accent)",
          }}
          className="fixed bottom-6 right-6 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full border-2 border-line bg-cta text-cta-ink shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-reduce:transition-none"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
