"use client";

import { motion } from "framer-motion";

export function RevealLine({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`h-px bg-brand-border ${className ?? ""}`}
    />
  );
}
