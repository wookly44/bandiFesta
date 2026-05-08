import React from "react";
import "./CourseInfo.css";
import gbgMap from "/assets/gbg_map02.jpg";
import peopleImg from "/assets/people.png";

function CourseInfo({ getCourseTitle, points, currentSet, ClickInfo, data, currentKey }) {
  return (
    <div className="course">
      <div>
        <h2>{getCourseTitle()}</h2>
        <div>
          <a href=""></a>
        </div>
      </div>
      <div>
        <img src={gbgMap} alt="지도" />
      </div>
      <div>
        <img
          src={peopleImg}
          alt="people"
          className="path-image"
        />
      </div>
      {points[currentSet].map((point) => (
        <div
          key={point.id}
          className="clickable-point"
          style={{ left: point.x, top: point.y }}
          onClick={() => ClickInfo(point.id, point.x, point.y)}
        >
          {point.id}
        </div>
      ))}
      <div className="info">
        <h3>{data[currentKey]?.name}</h3>
        {data[currentKey]?.image && (
          <img src={data[currentKey]?.image} alt={currentKey} />
        )}
        <p>{data[currentKey]?.text}</p>
      </div>
    </div>
  );
}

export default CourseInfo;