import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFlip, Pagination, Navigation, Autoplay } from 'swiper/modules';

function Carousel() {
    return (
        <div className="w-full h-[500px]"> {/* Set a fixed height for the carousel */}
            <Swiper
                effect={'flip'}
                grabCursor={true}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[EffectFlip, Pagination, Navigation, Autoplay]}
                className="w-full h-full"
            >

                <SwiperSlide>
                    <img
                        src="https://i.pinimg.com/736x/94/9f/2b/949f2b4e7dabb6ccb96246c5e815b75d.jpg"
                        alt="Slide 1"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://i.pinimg.com/736x/d0/49/b6/d049b6861877ca8357d7d96aac7fb399.jpg"
                        alt="Slide 2"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://i.pinimg.com/originals/f7/48/be/f748be61e639995ef633770e8583852d.jpg"
                        alt="Slide 3"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://i.pinimg.com/736x/d6/0c/9d/d60c9d77a34977468662c36ae2510002.jpg"
                        alt="Slide 6"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </SwiperSlide>

            </Swiper>
        </div>
    );
}

export default Carousel;