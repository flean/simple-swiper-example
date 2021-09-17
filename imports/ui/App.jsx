import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Info/>
    <Swiper
        slidesPerView={3}
        onSlideChange={(e) => console.log(e.isEnd)}
        onSwiper={(swiper) => console.log(swiper)}
      >
      <SwiperSlide>
        <p>Slide 1</p>
      </SwiperSlide>
      <SwiperSlide>
        <p>Slide 2</p>
      </SwiperSlide>
      <SwiperSlide>
        <p>Slide 3</p>
      </SwiperSlide>
    </Swiper>
  </div>
);
