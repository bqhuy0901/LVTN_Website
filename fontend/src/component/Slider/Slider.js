import "swiper/css";
import { Navigation, Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "./Slider.css";

function Slider() {
  const photos = [
    {
      url: "https://theme.hstatic.net/200000278317/1000929405/14/slideshow_2.jpg?v=162",
    },
    {
      url: "https://theme.hstatic.net/200000278317/1000929405/14/slideshow_4.jpg?v=162",
    },
    {
      url: "https://theme.hstatic.net/200000278317/1000929405/14/slideshow_6.jpg?v=162",
    },
    {
      url: "https://theme.hstatic.net/200000278317/1000929405/14/slideshow_7.jpg?v=162",
    },
  ];

  return (
    <div className="Container">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        speed={800}
        slidesPerView={1}
        loop
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="mySwiper"
      >
        {photos.map((photo) => (
          <SwiperSlide className="swiperSlide">
            <img src={photo.url} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
