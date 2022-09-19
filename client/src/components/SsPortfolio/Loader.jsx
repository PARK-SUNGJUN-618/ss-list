import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary z-10">
      <div className="flex gap-5 text-4xl font-semibold">
        <motion.h1
          className="text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0.5, 0.5, 0.5, 1, 1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          P
        </motion.h1>
        <motion.h1
          className="text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 1, 0.5, 0.5, 0.5, 1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          S
        </motion.h1>
        <motion.h1
          className="text-tertiary"
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 1, 1, 0.5, 0.5, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          J
        </motion.h1>
      </div>
    </div>
  );
}
