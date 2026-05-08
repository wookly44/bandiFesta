import fakeFestivalsData from '../../public/JSON/fake_festivals.json';

// 1. 기간 타입 가짜 데이터
export const getFestivalPeriodTypes = (params, thenCallback) => {
    // console.log("Mock: getFestivalPeriodTypes 호출됨");
    const fakeData = { data: ["전체", "진행중", "예정", "마감"] };
    if (thenCallback) thenCallback(fakeData);
};

// 2. 정렬 방법 가짜 데이터
export const getFestivalSortMethods = (params, thenCallback) => {
    // console.log("Mock: getFestivalSortMethods 호출됨");
    const fakeData = { data: ["최신순", "인기순", "이름순"] };
    if (thenCallback) thenCallback(fakeData);
};

// 3. 축제 리스트 가짜 데이터 (SubFestivalGallery 등에서 사용)
export const getFestivals = (params, thenCallback, finallyCallback) => {
    // console.log("Mock: getFestivals 호출됨", params);
    
    // 실제 백엔드 대신 보낼 가짜 데이터
    const fakeData = fakeFestivalsData;

    // 에러 없이 즉시 성공 콜백 실행
    if (thenCallback) thenCallback(fakeData);
    if (finallyCallback) finallyCallback();
};

// 4. 좋아요 확인 (항상 false 반환)
export const isFestivalLiked = (params, thenCallback) => {
    if (thenCallback) thenCallback({ data: false });
};

// 5. 좋아요 실행 (성공 시뮬레이션)
export const likeFestival = (params, thenCallback) => {
    if (thenCallback) thenCallback({ data: "success" });
};

// 6. 축제 상세 정보 가짜 데이터
export const getFestivalDetail = (params, thenCallback, catchCallback, finallyCallback) => {
    // console.log("Mock: getFestivalDetail 호출됨", params);

    const id = Number(params.festivalId || 1);
    const detailData = fakeFestivalsData.data.find(item => item.festival_id === id) || null;

    if (detailData) {
        if (thenCallback) thenCallback({ data: detailData });
    } else {
        if (catchCallback) catchCallback(new Error(`festival_id ${id}에 해당하는 데이터가 없습니다.`));
    }

    if (finallyCallback) finallyCallback();
};



// 7. 축제 좋아요 개수 가져오기 가짜 데이터
export const getFestivalLikeCount = (params, thenCallback, catchCallback, finallyCallback) => {
    // console.log("Mock: getFestivalLikeCount 호출됨", params);
    
    // 임의의 좋아요 개수를 반환 (예: 123개)
    const fakeData = { data: 123 };

    if (thenCallback) thenCallback(fakeData);
    if (finallyCallback) finallyCallback();
};