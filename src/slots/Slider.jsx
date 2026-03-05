import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';

function Slider() {
    return (
        <div className="w-[1600px] h-[110px] relative group">
            {/* Custom Next/Prev Buttons */}
            <div className="swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 text-xl cursor-pointer">
                ‹
            </div>
            <div className="swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 text-xl cursor-pointer">
                ›
            </div>

            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
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
        </div>
    );
}

export default Slider;