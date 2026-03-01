import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function Slider() {
    return (
        <div className="w-[1600px] h-[110px] relative group">
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="h-full"
            >
                {Array.from({ length: 9 }).map((_, idx) => (
                    <SwiperSlide
                        key={idx}
                        className="flex items-center justify-center bg-gray-300 rounded-lg"
                    >
                        Slide {idx + 1}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Hover effect for arrows */}
            <style>
                {`
          /* Hide arrows by default */
          .swiper-button-next, .swiper-button-prev {
            opacity: 0;
            width: 30px;
            height: 30px;
            border-radius: 9999px;
            background-color: white;
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.3s ease;
          }

          /* Show arrows on hover */
          .group:hover .swiper-button-next,
          .group:hover .swiper-button-prev {
            opacity: 1;
          }

          /* Position arrows inside carousel */
          .swiper-button-next {
            right: 5px;
          }
          .swiper-button-prev {
            left: 5px;
          }

          /* Arrow icon size */
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 16px;
          }
        `}
            </style>
        </div>
    );
}

export default Slider;