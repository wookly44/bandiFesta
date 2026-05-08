import './topbanner.css';

export default function TopBanner({children}) {
	return <div className="topBanner">
		<img className='logo' src={'/bandiFesta/assets/bannerLogo.png'} />
		<div className='title'>
			{children}
		</div>
	</div>
}