import './topbanner.css';
import bannerLogo from '../../assets/bannerLogo.png';

export default function TopBanner({children}) {
	return <div className="topBanner">
		<img className='logo' src={bannerLogo} alt="배너로고" />
		<div className='title'>
			{children}
		</div>
	</div>
}