import React from "react";
import Carousel from "../slots/Carousel";
import Slider from "../slots/Slider";
import AnimatedCard from "../slots/AnimatedCard";
import FilterSidebar from "../slots/FilterSidebar";

const CarouselWithCata = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="grid grid-cols-5 gap-4">
        {/* Left Column (1/5) */}
        <FilterSidebar></FilterSidebar>

        {/* Middle Column (3/5) */}
        <div className="col-span-3 bg-gray-50 p-4 rounded-lg h-[500px] flex items-center justify-center">
          {/* Placeholder Carousel */}
          <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold">
            <Carousel></Carousel>
          </div>
        </div>

        {/* Right Column (1/5) */}
        <div className="col-span-1 bg-gray-100  rounded-lg h-[500px] ">
          <AnimatedCard></AnimatedCard>
        </div>
      </div>

      {/* <div className='mt-8'>
                <Slider></Slider>
            </div> */}
    </div>
  );
};

export default CarouselWithCata;
