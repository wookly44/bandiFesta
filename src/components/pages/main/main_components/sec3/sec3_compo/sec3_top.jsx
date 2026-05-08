import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from 'react-router-dom';
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import "./sec3_top.css";
import "swiper/css";
import gbg01 from "/bandiFesta/assets/gbg_01.webp";
import gbg02 from "/bandiFesta/assets/gbg_02.webp";
import gbg03 from "/bandiFesta/assets/gbg_03.webp";
import gbg04 from "/bandiFesta/assets/gbg_04.webp";
import gbg05 from "/bandiFesta/assets/gbg_05.webp";
import gbg06 from "/bandiFesta/assets/gbg_06.webp";
import gbg07 from "/bandiFesta/assets/gbg_07.webp";
import gbg08 from "/bandiFesta/assets/gbg_08.webp";
import gbg09 from "/bandiFesta/assets/gbg_09.webp";
import gbg10 from "/bandiFesta/assets/gbg_10.webp";
import gbg11 from "/bandiFesta/assets/gbg_11.webp";
import gbg12 from "/bandiFesta/assets/gbg_12.webp";
import gbg13 from "/bandiFesta/assets/gbg_13.webp";
import gbg14 from "/bandiFesta/assets/gbg_14.webp";
function Sec3_top() {
const Navigate = useNavigate()
const sec3_button_festival = ()=>{
  Navigate("/course/min40");
}
  return (
    <>
      <div className="Sec3_top ">
        <h4>관람안내</h4>
        <button onClick={sec3_button_festival}>더보기 +</button>
        <Swiper
          loop={true}
          slidesPerView={4}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={gbg01} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg02} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg03} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg04} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg05} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg06} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg07} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg08} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg09} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg10} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg11} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg12} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg13} alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gbg14} alt="경복궁이미지" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
export default Sec3_top;
