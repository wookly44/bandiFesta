import { useEffect } from "react";
import IntroTitle from "./intro_components/IntroTitle"
import MyComponent from "../../generic/googlemap/MyComponent"
import SubIntroLocation_sec1 from './SubIntroLocation/SubIntroLocation_sec1'
import comeLocation from "/assets/come_location.webp"
export default function SubIntroLocation({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])

	return <>
			<IntroTitle introTitle={"오시는 길"}/>
			<MyComponent />
			<div className="mapWrap">
				<img src={comeLocation} alt="오시는길" />
			</div>
			<SubIntroLocation_sec1 />
	</>
}