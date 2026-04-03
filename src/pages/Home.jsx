import Accordion from "./Acccordion";
import BestsellerCategory from "./BestsellerCategory";
import CarouselWithCata from "./CarouselWithCata";
import ContactPage from "./ContactPage";
import LimitedOffers from "./Limitedoffers";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-28 pb-16 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20"
      >
        <motion.section variants={itemVariants} className="pt-2">
          <CarouselWithCata />
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <BestsellerCategory />
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <LimitedOffers />
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <Accordion />
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <ContactPage />
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Home;
