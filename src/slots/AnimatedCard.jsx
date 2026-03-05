import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

const AnimatedCard = () => {
    return (
        <div
            className="w-full h-full shadow-md rounded-md overflow-hidden relative cursor-pointer group 
                 hover:scale-105 transition-transform duration-300 ease-out h-[350px] bg-white"
        >
            {/* Image */}
            <img
                src="https://i.pinimg.com/originals/10/f8/9b/10f89bce1bbee2e461b3447fc38ff520.jpg"
                alt="animated_card"
                className="w-full h-[60%] object-cover transition-all duration-300 ease-out group-hover:opacity-70"
            />



            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/90 dark:from-gray-900/80 p-4">
                <p className="uppercase text-gray-600 dark:text-[#abc2d3]/80 text-sm">Travel</p>
                <h3 className="font-bold text-gray-900 dark:text-[#abc2d3] text-lg mt-1">
                    Discover the sea
                </h3>
                <p className="text-gray-600 dark:text-[#abc2d3]/90 text-sm mt-1">by Jhon Doe</p>
            </div>
        </div>
    );
};

export default AnimatedCard;