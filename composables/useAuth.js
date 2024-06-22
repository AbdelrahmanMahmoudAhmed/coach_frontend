import { useGlobalStore } from "../stores/global";



export const saveUserData = ({ type, role, userInfo, token }) => {
const global = useGlobalStore();

  const roleCookie = useCookie("role");
  const typeCookie = useCookie("type");
  const userInfoCookie = useCookie("userInfo");
  const tokenCookie = useCookie("token");

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

// export default login
