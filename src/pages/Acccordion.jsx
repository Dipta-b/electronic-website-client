import React, { useState } from "react";

// react icons
import { FaPlus } from "react-icons/fa6";

const Accordion = () => {
    const accordingData = [
        {
            title: "What should I consider when buying a new smartphone?",
            description:
                "Check the battery life, performance, camera quality, storage, and software updates to ensure the phone meets your daily needs.",
        },
        {
            title: "How do I choose the right laptop for work or gaming?",
            description:
                "Consider the processor, RAM, storage, graphics card, display quality, and portability based on whether you need it for productivity or gaming.",
        },
        {
            title: "Are wireless headphones worth it?",
            description:
                "Wireless headphones offer convenience and freedom from cords. Look for battery life, sound quality, and connectivity stability when choosing.",
        },
        {
            title: "How can I extend the life of my electronics?",
            description:
                "Keep devices clean, avoid overheating, use protective cases, update software regularly, and charge batteries properly to extend lifespan.",
        },
        {
            title: "What accessories are essential for smartphones?",
            description:
                "Common accessories include protective cases, screen protectors, portable chargers, wireless earbuds, and USB-C/Lightning cables for convenience.",
        },
        {
            title: "How do I choose the best external storage?",
            description:
                "Consider the type (SSD or HDD), storage capacity, transfer speed, and compatibility with your devices when picking external storage.",
        },
    ];

    const [isPlusAccording, setIsPlusAccording] = useState(0);

    const handleBorderClick = (index) =>
        setIsPlusAccording((prevIndex) => (prevIndex === index ? null : index));

    return (
        <div className="flex gap-3 flex-col w-full">
            {accordingData?.map((according, index) => (
                <article
                    key={index}
                    className="border dark:border-slate-700 border-[#e5eaf2] rounded p-3"
                >
                    <div
                        className="flex gap-2 cursor-pointer items-center justify-between w-full"
                        onClick={() => handleBorderClick(index)}
                    >
                        <h2 className="text-[#3B9DF8] font-[600] text-[1.2rem]">
                            {according.title}
                        </h2>
                        <p>
                            <FaPlus
                                className={`text-[1.3rem] dark:text-slate-600 text-text transition-all duration-300 ${isPlusAccording === index &&
                                    "rotate-[45deg] !text-[#3B9DF8]"
                                    }`}
                            />
                        </p>
                    </div>
                    <div
                        className={`grid transition-all duration-300 overflow-hidden ease-in-out ${isPlusAccording === index
                            ? "grid-rows-[1fr] opacity-100 mt-4"
                            : "grid-rows-[0fr] opacity-0"
                            }`}
                    >
                        <p className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem] overflow-hidden">
                            {according.description}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default Accordion;