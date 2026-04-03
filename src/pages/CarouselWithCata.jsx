import React from "react";
import Carousel from "../slots/Carousel";
import Slider from "../slots/Slider";
import AnimatedCard from "../slots/AnimatedCard";
import FilterSidebar from "../slots/FilterSidebar";

const CarouselWithCata = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch mb-12">
        {/* Left Column Stack - Sidebar & Features */}
        <div className="hidden lg:flex flex-col w-[300px] shrink-0 gap-8 h-full">
          <FilterSidebar></FilterSidebar>
          <AnimatedCard></AnimatedCard>
        </div>

        {/* Right Column - Expanding Hero Carousel */}
        <div className="flex-1 w-full flex items-center justify-center">
            <Carousel></Carousel>
        </div>
      </div>
    </div>
  );
};

export default CarouselWithCata;
