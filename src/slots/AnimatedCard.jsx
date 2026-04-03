import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

const AnimatedCard = () => {
    return (
        <div
            className="w-full h-[250px] premium-shadow rounded-3xl overflow-hidden relative cursor-pointer group 
                 hover:-translate-y-2 transition-all duration-500 ease-out bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60"
        >
            {/* Image */}
            <img
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1468&auto=format&fit=crop"
                alt="animated_card"
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
            />

            {/* Text overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent p-6 flex flex-col justify-end">
                <p className="uppercase text-cyan-400 font-bold tracking-widest text-[10px] mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Deal of the Day</p>
                <h3 className="font-black text-white text-xl leading-tight drop-shadow-md">
                    Premium Audio<br/>Experience
                </h3>
                <p className="text-slate-300 text-sm mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">Shop Premium Headphones →</p>
            </div>
        </div>
    );
};

export default AnimatedCard;