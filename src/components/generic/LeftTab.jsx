import { useNavigate } from 'react-router-dom'
import './lefttab.css'
import { useEffect, useState, useRef } from 'react';

function LeftTabTitle({children}) {
	return <div className='leftTabTitle fontSubTitle'>
		{children}
	</div>
}

function LeftTab({children,to,active,onClick}) {
	const navigate = useNavigate();
	const navigateCallback = ()=>{
		if(to) {
			navigate(to);
		}
	}
	return <div className={`leftTab fontMain${active?' active':''}`} onClick={onClick?onClick:navigateCallback}>
		{children}
	</div>
}

function LeftTabContainer({children}) {
	const [top, setTop] = useState(0);
	const wrapperRef = useRef(null);
	const containerRef = useRef(null);
	const offsetY = 280
	useEffect(() => {
		const handleScroll = () => {
			if(!wrapperRef.current || !containerRef.current) return;
			
			const wrapperHeight = wrapperRef.current.offsetHeight;
			const containerHeight = containerRef.current.offsetHeight;
			const maxTop = wrapperHeight - containerHeight;
			
			let scrollTop = window.scrollY - offsetY;
			
			// 경계값 처리: 0보다 작으면 0, maxTop보다 크면 maxTop
			if (scrollTop < 0) scrollTop = 0;
			if (scrollTop > maxTop) scrollTop = Math.max(0, maxTop);
			
			setTop(scrollTop);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // 초기 위치 설정

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return <div className='leftTabContainerWrapper' ref={wrapperRef}>	
		<div className='leftTabContainer' ref={containerRef} style={{ marginTop: `${top}px` }}>
			{children}
		</div>
	</div>
}

export {
	LeftTabContainer,
	LeftTabTitle,
	LeftTab
}