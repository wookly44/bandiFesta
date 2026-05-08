import { useEffect } from "react";
import IntroTitle from "./intro_components/IntroTitle"
import SubIntroLocation_sec1 from './SubIntroLocation/SubIntroLocation_sec1'
import comeLocation from "/bandiFesta/assets/come_location.webp"
import "./SubIntroLocation/SubIntroLocation.css";
export default function SubIntroLocation({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])

	return <>
			<IntroTitle introTitle={"오시는 길"}/>
			<div className="mapWrap">
				<img src={comeLocation} alt="오시는길" />
			</div>
			<SubIntroLocation_sec1 />
	</>
}