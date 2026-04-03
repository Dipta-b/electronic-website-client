import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFlip, Pagination, Navigation, Autoplay } from 'swiper/modules';

function Carousel() {
    const slides = [
        {
            image: "https://i.pinimg.com/736x/94/9f/2b/949f2b4e7dabb6ccb96246c5e815b75d.jpg",
            title: "Next-Gen Gaming Setup",
            subtitle: "Unleash ultimate performance with our premium gear.",
            button: "Shop Gaming"
        },
        {
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1452&auto=format&fit=crop",
            title: "MacBook Pro M3",
            subtitle: "Mind-blowing speed. Incredible battery life.",
            button: "Buy Now"
        },
        {
            image: "https://i.pinimg.com/736x/d6/0c/9d/d60c9d77a34977468662c36ae2510002.jpg",
            title: "Smart Home Tech",
            subtitle: "Control your entire house from the palm of your hand.",
            button: "Explore Smart Home"
        }
    ];

    return (
        <div className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden relative group premium-shadow my-8">
            <Swiper
                effect={'fade'}
                grabCursor={true}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Pagination, Navigation, Autoplay]}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover absolute inset-0"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent flex items-center">
                                <div className="px-10 md:px-20 max-w-2xl">
                                    <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-md">
                                        {slide.title}
                                    </h2>
                                    <p className="text-slate-200 text-lg md:text-xl font-medium mb-8 drop-shadow">
                                        {slide.subtitle}
                                    </p>
                                    <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:-translate-y-1">
                                        {slide.button}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Carousel;