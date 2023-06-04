import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../scss/style.scss";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function AppSwiper({ images, accountId }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {(images || [])?.length > 0 ? (
          (images || [])?.map((item) => (
            <SwiperSlide>
              <img
                src={`${process.env.REACT_APP_API_ENDPOINT}/media/eventImage/${accountId}/${item}`}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src="./images/no_image_found.png" />
          </SwiperSlide>
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        style={{ marginTop: "5px" }}
      >
        {(images || [])?.length > 0 ? (
          (images || [])?.map((item) => (
            <SwiperSlide>
              <img
                src={`${process.env.REACT_APP_API_ENDPOINT}/media/eventImage/${accountId}/${item}`}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src="./images/no_image_found.png" />
          </SwiperSlide>
        )}
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
