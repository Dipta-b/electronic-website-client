import Accordion from "./Acccordion";
import BestsellerCategory from "./BestsellerCategory";
import CarouselWithCata from "./CarouselWithCata";
import ContactPage from "./ContactPage";
import LimitedOffers from "./Limitedoffers";

const Home = () => {
  return (
    <div>
      <section className="mt-5">
        <CarouselWithCata></CarouselWithCata>
      </section>
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
