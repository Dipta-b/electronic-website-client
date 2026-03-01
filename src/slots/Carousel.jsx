import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectFlip, Pagination, Navigation, Autoplay } from 'swiper/modules';

function Carousel() {
    return (
        <Swiper
            effect={'flip'}
            grabCursor={true}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
                delay: 3000, // 3 seconds
                disableOnInteraction: false,
            }}
            modules={[EffectFlip, Pagination, Navigation, Autoplay]}
            className="w-full h-full"
        >
            <SwiperSlide>
                <img
                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                    alt="Slide 1"
                    className="w-full h-full object-cover rounded-lg"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://swiperjs.com/demos/images/nature-2.jpg"
                    alt="Slide 2"
                    className="w-full h-full object-cover rounded-lg"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://swiperjs.com/demos/images/nature-3.jpg"
                    alt="Slide 3"
                    className="w-full h-full object-cover rounded-lg"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://swiperjs.com/demos/images/nature-4.jpg"
                    alt="Slide 4"
                    className="w-full h-full object-cover rounded-lg"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://swiperjs.com/demos/images/nature-5.jpg"
                    alt="Slide 5"
                    className="w-full h-full object-cover rounded-lg"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://swiperjs.com/demos/images/nature-6.jpg"
                    alt="Slide 6"
                    className="w-full h-full object-cover rounded-lg"
                />
            </SwiperSlide>
        </Swiper>
    );
}

export default Carousel;