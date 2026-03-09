import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa6";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Accordion = () => {
  const accordingData = [
    {
      title: "What should I consider when buying a new smartphone?",
      description:
        "Check the battery life, performance, camera quality, storage, and software updates to ensure the phone meets your daily needs.",
    },
    {
      title: "How do I choose the right laptop for work or gaming?",
      description:
        "Consider the processor, RAM, storage, graphics card, display quality, and portability based on whether you need it for productivity or gaming.",
    },
    {
      title: "Are wireless headphones worth it?",
      description:
        "Wireless headphones offer convenience and freedom from cords. Look for battery life, sound quality, and connectivity stability when choosing.",
    },
    {
      title: "How can I extend the life of my electronics?",
      description:
        "Keep devices clean, avoid overheating, use protective cases, update software regularly, and charge batteries properly to extend lifespan.",
    },
    {
      title: "What accessories are essential for smartphones?",
      description:
        "Common accessories include protective cases, screen protectors, portable chargers, wireless earbuds, and USB-C/Lightning cables for convenience.",
    },
    {
      title: "How do I choose the best external storage?",
      description:
        "Consider the type (SSD or HDD), storage capacity, transfer speed, and compatibility with your devices when picking external storage.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.div
      className="flex flex-col gap-4 w-full"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {accordingData.map((itemData, index) => (
        <motion.article
          key={index}
          variants={item}
          whileHover={{ y: -3 }}
          className="border dark:border-slate-700 border-[#e5eaf2] rounded p-4 transition-shadow hover:shadow-md"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <h2 className="text-[#3B9DF8] font-semibold text-[1.1rem]">
              {itemData.title}
            </h2>

            <motion.div
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaPlus className="text-[1.2rem] text-gray-500" />
            </motion.div>
          </div>

          {/* Content */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <p className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem] mt-3">
                  {itemData.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>
      ))}
    </motion.div>
  );
};

export default Accordion;
