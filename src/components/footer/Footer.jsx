import { useEffect, useState, useRef } from "react";
import "./footer.css";
// 이미지 경로
import fot_bg from "../../assets/fot_bg.png"
import fot_bg1 from "../../assets/fot_bg1.png"
import fotLogo1 from "../../assets/fotLogo1.png"
import fotLogo2 from "../../assets/fotLogo2.png"
import fotLogo3 from "../../assets/fotLogo3.png"
import fotLogo4 from "../../assets/fotLogo4.png"
import logoGrey from "../../assets/logoGrey.png"

export default function Footer({}) {
    const footerRef = useRef(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const handleScroll = ([entry]) => {
            setActive(entry.isIntersecting);
        }
        const observer = new IntersectionObserver(handleScroll, {
            rootMargin: "0px 0px 600px 0px",
        });

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }
        return () => {
            if (footerRef.current) {
            observer.unobserve(footerRef.current);
            }
        };
    }, []);
  
  return (
    <>
        <footer ref={footerRef}>
            <div className="f_top">
                <img className={`pc ${active ? "active" : ""}`} src={fot_bg} alt="푸터사람들" />
                <img className={`mobile ${active ? "active" : ""}`} src={fot_bg1} alt="푸터사람들" />
            </div>
            <div className="f_btm">
                <div className="flex">
                    <div className="f_logo">
                        <img loading="lazy" src={logoGrey} alt="회색로고" />
                    </div>
                    <div className="info_wrap">
                        <ul className="info_01">
                            <li>개인정보 처리방침</li>
                            <li>이용약관</li>
                            <li>저작권정책</li>
                            <li>이용약관</li>
                        </ul>
                        <ul className="info_02">
                            <li>(01693) 서울 노원구 상계로3길 21 3층, 6층</li>
                            <li>Tel. 02-6953-2002</li>
                            <li>Fax. 02-6953-2002</li>
                        </ul>
                        <ul className="info_03">
                            <li>(주)TOTb</li>
                            <li>대표이사: 우대희</li>
                            <li>사업자등록번호 : 105-85-29522</li>
                            <li>통신판매신고 : 제 2019-서울노원-1028호</li>
                        </ul>
                        <ul className="APILOGO">
                            <li>
                                <img loading="lazy" src={fotLogo3} alt="api logo" />
                            </li>
                            <li>
                                <img loading="lazy" src={fotLogo2} alt="api logo" />
                            </li>
                            <li>
                                <img loading="lazy" src={fotLogo1} alt="api logo" />
                            </li>
                            <li>
                                <img loading="lazy" src={fotLogo4} alt="api logo" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </>
  );
}
