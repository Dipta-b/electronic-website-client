import React from 'react'
import Carousel from '../slots/Carousel'
import Slider from '../slots/Slider'
import AnimatedCard from '../slots/AnimatedCard'

const CarouselWithCata = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-6">
            <div className="grid grid-cols-5 gap-4">
                {/* Left Column (1/5) */}
                <div className="col-span-1 bg-gray-100 p-4 rounded-lg h-[500px] overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4">Categories</h2>
                    <ul className="space-y-2">
                        <li className="p-2 bg-white rounded shadow hover:bg-gray-200 cursor-pointer">
                            Category 1
                        </li>
                        <li className="p-2 bg-white rounded shadow hover:bg-gray-200 cursor-pointer">
                            Category 2
                        </li>
                        <li className="p-2 bg-white rounded shadow hover:bg-gray-200 cursor-pointer">
                            Category 3
                        </li>
                        <li className="p-2 bg-white rounded shadow hover:bg-gray-200 cursor-pointer">
                            Category 4
                        </li>
                        <li className="p-2 bg-white rounded shadow hover:bg-gray-200 cursor-pointer">
                            Category 5
                        </li>
                    </ul>
                </div>

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
    )
}

export default CarouselWithCata