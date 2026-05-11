import { useContext, useEffect, useState, useRef } from "react";
import { getFestivals } from "/src/api_utils/festivalUtil";
import { configContext } from "/src/App";
import { Swiper, SwiperSlide } from "swiper/react";
import { FestivalCard } from "/src/components/generic/festival/FestivalCard";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./sec4.css";
import logo2 from "../../../../../assets/logo2.png"

function MainSec4() {
    const config = useContext(configContext);
    const [festivals, setFestivals] = useState([]);
    const [loopedFestivals, setLoopedFestivals] = useState([]);
    const [fontSize, setFontSize] = useState(18)
    const textRef = useRef()

    useEffect(() => {
    const changeFontSize = () => {
        if (textRef.current) {
        const { clientWidth } = textRef.current;
        const maxWidth = clientWidth;
        const baseFontSize = 16;
        let newFontSize = baseFontSize;

        while (textRef.current.scrollWidth > maxWidth && newFontSize > 12) {
            newFontSize -= 1;
            textRef.current.style.fontSize = `${newFontSize}px`;
        }
        setFontSize(newFontSize);
        }
    };
    changeFontSize();
    window.addEventListener('resize', changeFontSize);
    return () => {
        window.removeEventListener('resize', changeFontSize);
    };
    }, []);

    useEffect(() => {
    // API 호출 (동일)
    getFestivals(
        {
        itemsPerPage: 10,
        pageNum: 1,
        language: config.language,
        periodType: 1,
        sortMethod: 0,
        },
        (response) => {
        const data = response.data || [];
        setFestivals(data);
        if (data.length > 0) {
            const minCount = 20; // 슬라이드 개수 안전하게 상향
            let looped = [...data];
            while (looped.length < minCount) {
            looped = [...looped, ...data];
            }
            setLoopedFestivals(looped.map((f, i) => ({ ...f, _loopKey: `${f.festival_id}_${i}` })));
        }
        },
        (error) => {
        // console.log(`error: ${error}`);
        }
    );
    }, [config.language]);


    return (
    <div className="Main_sec4">
        <div>
            <h5>인기있는 행사</h5>
            <p>다양한 축제를 통해 각 지역의 독특한 문화와 전통을 만나보세요!</p>
            {loopedFestivals.length > 0 && (
                <Swiper
                    key={loopedFestivals.length}
                    loop={true}
                    slidesPerView={6.8}
                    spaceBetween={15}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper sec4Swiper"
                >
                    {loopedFestivals.map((festival) => (
                        <SwiperSlide key={festival._loopKey}>
                            <FestivalCard
                                festival={festival}
                                disableTag={true}
                                fontSize={fontSize}
                            />
                        </SwiperSlide>
                    ))}
                    {loopedFestivals.map((festival) => (
                        <SwiperSlide key={festival._loopKey}>
                            <FestivalCard
                                festival={festival}
                                disableTag={true}
                                fontSize={fontSize}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
        <div className="moonLogo">
            <img src={logo2} alt="달님" />
        </div>
    </div>
    );
}

export default MainSec4;