import React from "react";
import Carousel from "../slots/Carousel";
import Slider from "../slots/Slider";
import AnimatedCard from "../slots/AnimatedCard";
import FilterSidebar from "../slots/FilterSidebar";

const CarouselWithCata = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar></FilterSidebar>
        </div>

        {/* Middle Column - Hero Carousel */}
        <div className="col-span-1 lg:col-span-3 flex items-center justify-center w-full">
          <div className="w-full">
            <Carousel></Carousel>
          </div>
        </div>

        {/* Right Column - Featured Deals */}
        <div className="hidden lg:block lg:col-span-1">
          <AnimatedCard></AnimatedCard>
        </div>
      </div>
    </div>
  );
};

export default CarouselWithCata;
