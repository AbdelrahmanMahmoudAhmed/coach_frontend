import { useGlobalStore } from "../stores/global";



export const saveUserData = ({ type, role, userInfo, token }) => {
const global = useGlobalStore();

  const roleCookie = useCookie("role" ,{ expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
  const typeCookie = useCookie("type",{ expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
  const userInfoCookie = useCookie("userInfo",{ expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
  const tokenCookie = useCookie("token",{ expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

  const savedData = {
    user : userInfo,
    token:token,
    isAuth:true
  }

global.updateAuth(savedData);

  typeCookie.value = type;
  roleCookie.value = role;
  userInfoCookie.value = userInfo;
  tokenCookie.value = token;
};




export const updateUserData = (  userInfo ) => {
  const global = useGlobalStore();
  

    const userInfoCookie = useCookie("userInfo",{ expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
  
  
  global.updateUserInfo(userInfo);
  

    userInfoCookie.value = userInfo;
  };
  





export const removeUserData = () => {
  const global = useGlobalStore();
  
    const roleCookie = useCookie("role");
    const typeCookie = useCookie("type");
    const userInfoCookie = useCookie("userInfo");
    const tokenCookie = useCookie("token");
  
    const savedData = {
      user : "",
      token:"",
      isAuth:false
    }
  
  global.updateAuth(savedData);
  
    typeCookie.value = "";
    roleCookie.value = "";
    userInfoCookie.value = "";
    tokenCookie.value = "";
  };

