"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

function Overlay({ visible, z = 5 }: { visible: boolean; z?: number }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bg-black/50 backdrop-blur-md inset-0 pointer-events-auto"
          style={{ zIndex: z }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          animate={{ opacity: z ? 1 : 0 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
}

export default Overlay;
