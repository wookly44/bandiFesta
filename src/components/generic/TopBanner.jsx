import './topbanner.css';

export default function TopBanner({children}) {
	return <div className="topBanner">
		<img className='logo' src={'/assets/bannerLogo.png'} />
		<div className='title'>
			{children}
		</div>
	</div>
}