import './festivalwidget.css';
import { Link } from 'react-router-dom';
import sparkle from "/bandiFesta/assets/sparkle.png";

function FestivalWidget({festival}) {
	return <>{
		festival
		?<Link className="festivalWidget" to={`/festival/detail/${festival?festival.festival_id:'0'}`}>
			<div className='left fontMain'>
				<img src={sparkle} alt='sparkle'/>
				<p>{festival===null?'':festival.title}</p>
			</div>
			<div className='right fontMain'>
				{festival===null?'':`${festival.start_date}~${festival.end_date}`}
			</div>
		</Link>
		:<></>
	}</>
}

function FestivalWidgetList({festivals}) {
	return <div className="festivalWidgetList">
		{festivals.map((festival,index)=>{
			return <FestivalWidget festival={festival} key={(festival===null)?index:`${festival.festival_id}_${index}`}/>
		})}
	</div>
}

export {
	FestivalWidget,
	FestivalWidgetList
}