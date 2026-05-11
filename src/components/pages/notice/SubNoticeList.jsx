import {useContext, useMemo} from 'react';
import {Link} from 'react-router-dom';
import arrowGrey from "../../../assets/arrowGrey.png";
import { editContext } from '../../../App';

function noticeList(data){
    const {increaseView} = useContext(editContext);

    const onIncrease = ()=>{
        increaseView(data.id);
    }

    return useMemo(() => (
        <Link to={`/notice/detail/${data.id}`} onClick={onIncrease}>
            <ul key={data.id} className='noticeListM'>
                <li className='notiNumber'>{data.id}</li>
                <li className='notiTitle'>
                        <span className='notiTitTxt'>{data.title}</span>
                        <img className='notiArrow' src={arrowGrey} alt="notiArrow" />
                </li>
                <li className='notiWriter'>{data.name}</li>
                <li className='notiDate'>{data.createDate}</li>
                <li className='notiView'>{data.view || 0}</li>
            </ul>
        </Link>
    ), [data.id, data.title, data.name, data.createDate, data.view]);
}

export default noticeList;