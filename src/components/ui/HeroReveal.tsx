"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.h1
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}
