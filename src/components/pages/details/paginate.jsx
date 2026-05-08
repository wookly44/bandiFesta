import ReactPaginate from 'react-paginate';
import nextPage from "../../../assets/nextPage.png";
import prevPage from "../../../assets/prevPage.png";

export default function Paginate({pageCount, handlePageClick}){
    return <>
        <ReactPaginate
            nextLabel={<img src={nextPage} alt='다음'/>}
            previousLabel={<img src={prevPage} alt='이전'/>}
            nextLinkClassName="subNoticePageNext"
            previousLinkClassName="subNoticePagePrev"

            activeClassName="subNoticePageActive"
            pageClassName="subNoticePage fontMain"
            containerClassName="subNoticeNavi"

            pageRangeDisplayed={3}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            onClick={false}
            
            renderOnZeroPageCount={null}
        />
    </>
}