import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { getFestivalDetail } from "/src/api_utils/festivalUtil";
import TopBanner from "../../generic/TopBanner";
import './pagefestivaldetail.css';
import GenericTag from "../../generic/GenericTag";
import { getFestivalLikeCount } from "../../../api_utils/festivalUtil";
import { configContext } from '/src/App';
import { FestivalLikeButton } from "../../generic/festival/FestivalCard";
import GenericButton from '/src/components/generic/GenericButton'
import Loading from '/src/components/generic/Loading'
import GoTop from "../../generic/GoTop";

function LikeIndicator({festival}) {
	const config = useContext(configContext)
	const [count,setCount] = useState(0);
	useEffect(()=>{
		if (!festival) {return;}
		getFestivalLikeCount({
			festivalId:festival.festival_id
		},(response)=>{
			setCount(response.data);
		})
	},[festival])
	//
	const onChangeCallback = (flag)=>{
		if (flag) {
			setCount(count+1);
		} else {
			setCount(count-1);
		}
	}
	return config.user ? <div className="likeIndicator fontMain">
		{
			festival
			?<FestivalLikeButton festivalId={festival.festival_id} userId={config.user?config.user.id:null} onChange={onChangeCallback}/>
			:<></>
		}
		<div className="fontSubTitle">
			{count}
		</div>
	</div> : <></>
}

function FestivalContent({festival}) {
	const config = useContext(configContext);
	const infoTextRef = useRef(null);
	const containerRef = useRef(null);
	const [tagVariation,setTagVariation] = useState({
		value:0,
		string:''
	});
	//
	let localeString = [
		'진행중',
		'예정',
		'마감',
		'진행기간',
		'장소',
		'요금',
		'홈페이지',
		'문의전화',
		'전시내용',
		'목록으로'
	];
	//
	switch (config.language) {
	case 'Eng' :
		localeString = [
			'ongoing',
			'scheduled',
			'expired',
			'Duration',
			'Location',
			'Price',
			'Website',
			'Contact Number',
			'Description',
			'Back'
		];
		break;
	case 'Jpn' :
		localeString = [
			'進行中',
			'予定',
			'終了',
			'期間',
			'場所',
			'料金',
			'ホームページ',
			'問い合わせ電話番号',
			'内容',
			'戻る'
		];
		break;
	}
	//
	useEffect(()=>{
		if (festival===null) {return;}
		let element = containerRef.current;
            element.scrollIntoView({ behavior: "smooth", block: "start" });
		let startDate = new Date(festival.start_date);
		let today = new Date();
		let endDate = new Date(festival.end_date);
		if(startDate>today) {
			setTagVariation({
				value:1,
				string:localeString[1]
			})
		} else if(endDate<=today) {
			setTagVariation({
				value:2,
				string:localeString[2]
			})
		} else {
			setTagVariation({
				value:0,
				string:localeString[0]
			})
		}

	},[festival,config.language]);
	return <div className="festivalDetail" ref={containerRef}>
		{/* 상단 제목 */}
		<div className="top">
			<div className="tagAndLike">
				<GenericTag variation={tagVariation.value}>
					{tagVariation.string}
				</GenericTag>
				<LikeIndicator festival={festival}/>
			</div>
			<div className="fontTitle">
				{festival?festival.title:''}
			</div>
		</div>
		{/* 포스터&설명 */}
		<div className="middle">
			<div className="imgContainer">
				{
					festival.image
					?<>
						<img className='blur' src={String(festival.image).replace('http://','https://')}/>
						<img className='upper' src={String(festival.image).replace('http://','https://')}/>
					</>
					:<>
					</>
				}
			</div>
			<div className="description">
				{/* 진행기간 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						{localeString[3]}
					</div>
					<div className="right fontMain">
						{festival.start_date}~{festival.end_date}
					</div>
				</div>
				{/* 장소 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						{localeString[4]}
					</div>
					<div className="right fontMain">
						{festival.address}
					</div>
				</div>
				{/* 요굼 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						{localeString[5]}
					</div>
					<div className="right fontMain">
						{festival.sponsor1}
						{
							festival.fee
							?<>{festival.fee}</>
							:<></>
						}
					</div>
				</div>
				{/* 홈페이지 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						{localeString[6]}
					</div>
					<div className="right fontMain" dangerouslySetInnerHTML={{__html: festival.homepage.replace('홈페이지 ','')}}>

					</div>
				</div>
				{/* 문의전화 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						{localeString[7]}
					</div>
					<div className="right fontMain">
						{festival.tel}
					</div>
				</div>
				{/* 전시내용 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						{localeString[8]}
					</div>
					<div className="right fontMain" ref={infoTextRef}>
						{festival.content}
					</div>
				</div>
			</div>
		</div>
		<div className="bottom">
			<GenericButton to={'/festival/gallery'}>{localeString[9]}</GenericButton>
		</div>
	</div>
}

export default function PageFestivalDetail({}) {
	const { festivalId } = useParams(); //festivalId
	const [ festival,setFestival ] = useState(null);
	useEffect(()=>{
		window.scrollTo(0,0);
		if (!festivalId) {return;}
		getFestivalDetail({
			festivalId:festivalId
		},(response)=>{
			setFestival(response.data);
		},(error)=>{
			setFestival(null);
		})
	},[festivalId])
	return <>
		<TopBanner>축제둘러보기</TopBanner>
		<div className="innerbox">
			<div className="mainContent">
				{
					festival
					?<FestivalContent festival={festival}/>
					:<Loading></Loading>
				}
				
			</div>
		</div>
		<GoTop/>
	</>
}