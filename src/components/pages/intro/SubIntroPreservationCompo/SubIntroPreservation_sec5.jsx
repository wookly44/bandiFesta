import "./SubIntroPreservation_sec5.css";
import SubIntroPreservationSubTitle from "./SubIntroPreservationSubTitle";
import reserv_info from "../../../../assets/reserv_info.webp";
export default function SubIntroPreservation_sec5({}) {
  return (
    <>
      <SubIntroPreservationSubTitle SubTitle={"좌석배치도"} />
      <div className="SubIntroPreservation_sec5">
        <img src={reserv_info} alt="좌석배치도" loading="lazy"/>
      </div>
    </>
  );
}
