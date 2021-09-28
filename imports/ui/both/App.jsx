import React from 'react';
import { Meteor } from "meteor/meteor"
import { useTracker } from 'meteor/react-meteor-data'
import { Hello } from '../Hello.jsx';
import { Info } from '../Info.jsx';
import LoginForm from '../LoginForm.jsx';
import { Swiper , SwiperSlide  } from 'swiper/react'
import SwiperCore , { Navigation, Pagination, Scrollbar, A11y , Autoplay } from 'swiper'
if (Meteor.isClient){ 
	import 'swiper/swiper-bundle.min.css'
	import 'swiper/components/navigation/navigation.min.css'
	import 'swiper/components/scrollbar/scrollbar.min.css'
	import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
}
import { getMyInfo } from '../../api/users/users_Q'


export default App = () =>{
  // Subscribe to User data
	const user = useTracker(() => {
    options= {}
    settings = {
      filters:{
        _id:Meteor.userId()
      },
      options:options
    }
    query = getMyInfo.clone(settings)
    if (Meteor.isServer){
      return query.fetchOne()
    }
    query.subscribe()
    return query.fetchOne()
  });
  console.log(user)
  SwiperCore.use([Autoplay, Navigation, A11y])
  return(
    <div>
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Info/>
    <div>
    {user ? (
      <h1>{user.profile.firstName}</h1>
    ) : (
      <LoginForm/>
    )
    }
    </div>
   
  
    <Swiper
        autoplay={ {
          "delay": 5000,
          "disableOnInteraction": true
        }}
        slidesPerView={1}
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
  )
}