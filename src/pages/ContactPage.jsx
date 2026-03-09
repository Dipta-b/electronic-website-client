import React from "react";
import { motion } from "framer-motion";
import BangladeshMap from "../slots/BangladeshMap";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function ContactPage() {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-10"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Heading */}
      <motion.h2 className="text-3xl font-bold mb-6" variants={item}>
        Our Branch Locations
      </motion.h2>

      {/* Map */}
      <motion.div variants={item}>
        <BangladeshMap />
      </motion.div>
    </motion.div>
  );
}

export default ContactPage;
