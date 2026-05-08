import "./sec3.css";
import Sec3_top from './sec3_compo/sec3_top'
import Sec3_bottom from './sec3_compo/sec3_bottom'
import leftObj from "/assets/left_obj2.png";
import rightObj from "/assets/right_obj1.png";
function MainSec3() {
  return (
    <>
      <section className="sec3 flex">
        <div className="sec3_tree">
          <img src={leftObj} alt="배경장식1" />
        </div>
        <div className="main_sec3_bottom">
          <img src={rightObj} alt="배경장식2" />
        </div>
        <article className="sec3_info_title">
          <h3>알려드립니다</h3>
          <p>
            자세한 관람안내와 공지사항을 확인하시려면 더보기를 눌러 주세요.
          </p>
        </article>
        <Sec3_top />
        <Sec3_bottom />
      </section>
    </>
  );
}
export default MainSec3;
