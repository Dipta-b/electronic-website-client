import React from "react";
import Carousel from "../slots/Carousel";
import AnimatedCard from "../slots/AnimatedCard";
import FilterSidebar from "../slots/FilterSidebar";

const CarouselWithCata = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-6 mb-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Sidebar Stack */}
        <div className="hidden lg:flex flex-col gap-8 lg:col-span-1 h-full">
          <FilterSidebar></FilterSidebar>
          <AnimatedCard></AnimatedCard>
        </div>

        {/* Right Column - Hero Carousel */}
        <div className="lg:col-span-3 w-full relative">
            <Carousel></Carousel>
        </div>
      </div>
    </div>
  );
};

export default CarouselWithCata;
