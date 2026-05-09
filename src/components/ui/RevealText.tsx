"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealTextProps = {
  delay?: number;
  className?: string;
  children: ReactNode;
};

export function RevealText({ delay = 0, className, children }: RevealTextProps) {
  return (
    <motion.span
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.span>
  );
}
