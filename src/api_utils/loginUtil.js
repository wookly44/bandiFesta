import axios from "axios";
import Cookies from "universal-cookie";
import loginUserData from '../data/login_user.json';

axios.defaults.withCredentials = true;

const cookies = new Cookies();
const cookieConfig = {
	sameSite:'none',
	secure:true,
	httpOnly:false
}

const login = async(body,thenCallback,catchCallback,finallyCallback)=>{
    // 모의 로그인 처리
    setCookie('access_token', 'mock_access_token');
    setCookie('refresh_token', 'mock_refresh_token');
    if(thenCallback) thenCallback({ data: { access_token: 'mock_access_token', refresh_token: 'mock_refresh_token' } });
    if(finallyCallback) finallyCallback();
}

const refreshToken = async(body,thenCallback,catchCallback,finallyCallback)=>{
    setCookie('access_token', 'mock_access_token_refreshed');
    if(thenCallback) thenCallback({ data: { access_token: 'mock_access_token_refreshed', refresh_token: 'mock_refresh_token' } });
    if(finallyCallback) finallyCallback();
}

const getKakaoUser = async(body,thenCallback,catchCallback,finallyCallback)=>{
    const token = getCookie('access_token');
    if (token) {
        const user = loginUserData.user[0];
        const mockResponse = {
            data: {
                ...user,
                id: user.user_id,
                nickname: user.nickname,
                profile: user.profile,
                thumbnail: user.thumbnail
            }
        };
        setCookie('user_id', user.user_id);
        if(thenCallback) thenCallback(mockResponse);
    } else {
        if(catchCallback) catchCallback(new Error('로그인 정보가 없습니다.'));
    }
    if(finallyCallback) finallyCallback();
}

const loginRequest = ()=>{
	alert("관리자 권한의 아이디로 로그인 되었습니다.");
    setCookie('access_token', 'mock_access_token');
    window.location.reload();
}

const logout = async(body,thenCallback,catchCallback,finallyCallback)=>{
    removeCookie('access_token');
    removeCookie('refresh_token');
    removeCookie('user_id');
	alert("로그아웃 되었습니다.");
    window.location.reload();
    if(thenCallback) thenCallback({ data: 'success' });
    if(finallyCallback) finallyCallback();
}

const unlink = async(body,thenCallback,catchCallback,finallyCallback)=>{
    removeCookie('access_token');
    removeCookie('refresh_token');
    removeCookie('user_id');
    if(thenCallback) thenCallback({ data: 'success' });
    if(finallyCallback) finallyCallback();
}

const setCookie = (fieldName,val)=>{
	cookies.set(fieldName,val,cookieConfig);
}

const getCookie = (fieldName)=>{
	return cookies.get(fieldName);
}

const removeCookie = (fieldName)=>{
	cookies.remove(fieldName,cookieConfig)
}

export {
	//REST
	getKakaoUser,
	loginRequest,
	login,
	logout,
	unlink,
	refreshToken,
	//UTILS
	getCookie,
	setCookie,
}
