import BestsellerCategory from "./BestsellerCategory";
import CarouselWithCata from "./CarouselWithCata";


const Home = () => {
    return (
        <div>
            <section className="mt-5">
                <CarouselWithCata></CarouselWithCata>
            </section>
            <section className="mt-5">
                <BestsellerCategory></BestsellerCategory>
            </section>
        </div>
    );
};

export default Home;
