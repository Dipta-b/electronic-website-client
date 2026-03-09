import Accordion from "./Acccordion";
import BestsellerCategory from "./BestsellerCategory";
import CarouselWithCata from "./CarouselWithCata";
import ContactPage from "./ContactPage";
import LimitedOffers from "./Limitedoffers";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-5"
      >
        <CarouselWithCata></CarouselWithCata>
      </motion.section>
      <section className="mt-5">
        <BestsellerCategory></BestsellerCategory>
      </section>
      <section className="mt-5">
        <LimitedOffers></LimitedOffers>
      </section>
      <section className="mt-5">
        <Accordion></Accordion>{" "}
      </section>
      <section className="mt-5">
        <ContactPage></ContactPage>
      </section>
    </div>
  );
};

export default Home;
