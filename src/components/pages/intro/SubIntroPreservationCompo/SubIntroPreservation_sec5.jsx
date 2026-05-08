import "./SubIntroPreservation_sec5.css";
import SubIntroPreservationSubTitle from "./SubIntroPreservationSubTitle";
import info4 from "/assets/info4.png";
export default function SubIntroPreservation_sec5({}) {
  return (
    <>
      <SubIntroPreservationSubTitle SubTitle={"좌석배치도"} />
      <div className="SubIntroPreservation_sec5">
        <img src={info4} alt="좌석배치도" />
      </div>
    </>
  );
}
