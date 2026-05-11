import "./sec2.css";
import { useNavigate } from "react-router-dom";
import MainSec3_mobile from"./sec3_mobile"
import mainImg from "../../../../../assets/mainImg.png";
import posterImg from "../../../../../assets/poster.webp";
function MainSec2() {
  const Navigate = useNavigate();

  const sec2ButtonClick = () => {
    Navigate("/intro/main");
  };

  return (
    <>
      <section className="sec2 flex">
        <div className="sec2_wrap">
          <div className="sec2_top">
            <h3>
              더 쉽고, 더 빠르게
              <br />
              경복궁 별빛 야행에 대해 알아보세요.
            </h3>
            <div className="sec2_button" onClick={sec2ButtonClick}>보러가기</div>
          </div>
        </div>
        <div className="sec2_img">
          <img src={mainImg} alt="메인 페스티벌 소개" fetchpriority="high" width="1100" height="619" />
          <img src={posterImg} alt="메인 페스티벌 포스터" loading="lazy" width="400" height="533" />
        </div>
        <MainSec3_mobile />
      </section>
      
    </>
  );
}
export default MainSec2;
