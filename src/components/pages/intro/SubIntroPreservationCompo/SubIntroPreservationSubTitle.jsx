import "./SubIntroPreservationSubTitle.css";
import highlight1 from "/assets/highlight1.png";
export default function SubIntroPreservation_sec1({SubTitle}) {
  return (
    <>
      <div className="flex SubIntroPreservationSubTitle">
        <div className="flex">
          <img src={highlight1} alt="별모양" />
        </div>
        <h5>{SubTitle}</h5>
      </div>
    </>
  );
}
