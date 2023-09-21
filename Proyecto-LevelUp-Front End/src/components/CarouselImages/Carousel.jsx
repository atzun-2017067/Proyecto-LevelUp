import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { EffectCoverflow, Navigation } from 'swiper';

import slide_image_1 from './img/ht.jpg';
import slide_image_2 from './img/image1.png';
import slide_image_3 from './img/mar.jpg';
import slide_image_4 from './img/ht.jpg';
import slide_image_5 from './img/ht.jpg';
import slide_image_6 from './img/ht.jpg';
import slide_image_7 from './img/ht.jpg';
import './Carousel.css'

const Carousel = () => {
  return (
    // <div className="con">

    <Swiper
      style={{height:'44vh'}}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      // pagination={{ el: '.swiper-pagination', clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true,
      }}
      modules={[EffectCoverflow, Navigation]}
      className="swiper_con"
    >
      <SwiperSlide>
        <img src={slide_image_1} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_2} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_3} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_4} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_5} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_6} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_7} alt="slide_image" />
      </SwiperSlide>

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
        <i className="bi bi-arrow-left fs-1" id='left'></i>
        </div>
        <div className="swiper-button-next slider-arrow">
        <i className="bi bi-arrow-right fs-1" id="right"></i>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  // </div>
  );
};

export default Carousel;
