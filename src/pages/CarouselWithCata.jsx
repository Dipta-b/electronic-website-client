import React from "react";
import Carousel from "../slots/Carousel";
import Slider from "../slots/Slider";
import AnimatedCard from "../slots/AnimatedCard";
import FilterSidebar from "../slots/FilterSidebar";

const CarouselWithCata = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column (1/5) - Sidebar */}
        <div className="hidden lg:block lg:col-span-1 premium-shadow bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
          <FilterSidebar></FilterSidebar>
        </div>

        {/* Middle Column (3/5) - Hero Carousel */}
        <div className="col-span-1 lg:col-span-3 premium-shadow bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl h-[500px] flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700 relative group">
          <div className="w-full h-full rounded-2xl flex items-center justify-center text-slate-400">
            <Carousel></Carousel>
          </div>
        </div>

        {/* Right Column (1/5) - Featured Deals */}
        <div className="hidden lg:block lg:col-span-1 premium-shadow bg-white dark:bg-slate-800 rounded-2xl overflow-hidden h-[500px] border border-slate-100 dark:border-slate-700">
          <AnimatedCard></AnimatedCard>
        </div>
      </div>
    </div>
  );
};

export default CarouselWithCata;
