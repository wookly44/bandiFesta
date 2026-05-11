import './festival.css';
import { useEffect, useRef, useState, useContext } from 'react';
import GenericTag from '../GenericTag';
import { isFestivalLiked } from '/src/api_utils/festivalUtil';
import { likeFestival } from '/src/api_utils/festivalUtil';
import { configContext } from '/src/App';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../../../api_utils/loginUtil';
import heartFill from '../../../assets/heartFill.png';
import heart from '../../../assets/heart.png';

import { editContext } from '/src/App';

function FestivalLikeButton({festivalId,userId,onChange}) {
	const config = useContext(configContext);
	const {toggleLike} = useContext(editContext);

	// 전역 상태에서 현재 축제의 좋아요 여부 확인
	const pressed = config.likedFestivals.includes(festivalId);

	//좋아요버튼 콜백
	const likeRequest = (e)=>{
		e.stopPropagation(); // 부모 요소로의 이벤트 전파 방지
		
		if(!userId) {
			//로그아웃 상태일 때 로그인 요청
			if (config.language==='Kor') {
				if (window.confirm('로그인이 필요한 서비스입니다. 카카오 계정으로 로그인하시겠습니까? ')) {
					loginRequest();
				}
			}
			return;
		}

		// 전역 상태 토글 함수 호출
		toggleLike(festivalId);

		// 외부 콜백 실행 (필요한 경우)
		if (onChange) {
			onChange(!pressed);
		}
	}

	return <div className='festivalLikeButton' onClick={likeRequest}>
		<img className={'heart'} src={pressed?heartFill:heart} alt={'축제 좋아요 버튼'}/>
	</div>
}

function FestivalCard({festival,disableTag,userId,fontSize}) {
	const config = useContext(configContext);
	const navigate = useNavigate();
	const imgElement = useRef(null);
	const [tagVariation,setTagVariation] = useState({
		value:0,
		string:''
	});
	const isNull = festival===null;
	// console.log(userId);
	//진,예,마 판별
	let localeString = ['진행중','예정','마감'];
	switch (config.language) {
	case 'Eng' :
		localeString = [
			'ongoing',
			'scheduled',
			'expired'
		]
		break;
	case 'Jpn' :
		localeString = [
			'進行中',
			'予定',
			'終了'
		]
		break;
	}
	useEffect(()=>{
		if (isNull){
			setTagVariation({
				value:3,
				string:''
			});
			return;
		}
		let startDate = new Date(festival.start_date);
		let today = new Date();
		let endDate = new Date(festival.end_date);
		if(startDate>=today) {
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
	},[])

	return <div className={`festivalCard${(festival===null)?' disabled':''}`}>
		<div className='festivalCardTop'>
			{
				(!isNull)
				?<Link to={`/festival/detail/${festival?festival.festival_id:'0'}`}>
					{/* 썸네일 */}
					{
						festival.image
						?<img src={String(festival.image).replace('http://','https://')}
						alt={festival.title} 
						className='festivalCardImage'
						ref={imgElement}/>
						:<></>
					}
						
					{/* 하이라이팅 */}
					<div className='hightlight'></div>
				</Link>
				:<></>
			}
			{
				//userId에 따른 좋아요버튼 표시 분기
				(userId&&!isNull)
				?<FestivalLikeButton festivalId={festival.festival_id} userId={userId}/>
				:<></>
			}
		</div>
		{/* 진,예,마 태그 */}
		{
			disableTag
			?<></>
			:<div className=''>
			<GenericTag variation={tagVariation.value}>
				{tagVariation.string}
			</GenericTag>
			</div>
		}
		<div className='fontSubTitle'
			style={{fontSize : `${fontSize}px`}}>
			{(!isNull)?festival.title:''}
		</div>
	</div>
}

function FestivalCardList({festivals,className}) {
	const config = useContext(configContext);
	return <div className={`festivalCardList${className?(' '+className):''}`}>
		{festivals.map((festival,index)=>{
			return <FestivalCard key={festival ? `${festival.festival_id}_${index}` : index} festival={festival} userId={(config.user)?config.user.id:undefined}/>
		})}
	</div>
}

export { FestivalCardList, FestivalCard, FestivalLikeButton };
