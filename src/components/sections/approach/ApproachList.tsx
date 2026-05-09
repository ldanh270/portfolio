"use client";

import { motion } from "framer-motion";
import { approach } from "@/data/approach";

export function ApproachList() {
  return (
    <div>
      {approach.map((item, index) => (
        <motion.article
          key={item.number}
          className="grid gap-8 border-b border-brand-border px-6 py-12 sm:px-12 md:grid-cols-[80px_1fr] md:gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <p className="text-[5rem] font-extrabold leading-none tracking-tighter text-[rgba(10,10,10,0.08)]">{item.number}</p>
          <div>
            <h2 className="mb-3 text-xl font-bold tracking-tight">{item.title}</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[#555]">{item.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
