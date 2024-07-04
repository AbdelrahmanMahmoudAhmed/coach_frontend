import useAxios from "./useAxios";
import { useGlobalStore } from "~/stores/global";
import getQuery from "~/utils/getQuery"

const useRequest = () => {
  const REQUEST = useAxios();
  const global = useGlobalStore()


  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `bearer ${global.token}`
  };





  // start auth
  const register = async (data) => {
    return await REQUEST.post("/client/sign-in", data, { headers });
  };

  const login = async (data) => {
    return await REQUEST.post("/client/login", data);
  };


  const sendForgetPassword = async (data) => {
    return await REQUEST.patch("/auth/forget-password", data);
  };
  const resetPassword = async (data) => {
    return await REQUEST.patch("/auth/reset-password", data);
  };


  // end auth


  //admin REQUESTs section >>>>

  const editCurrentAdmin = async (data) => {
    return await REQUEST.patch(`/admin/admins/me`, data, { headers });
  };


  const adminLogin = async (data) => {
    return await REQUEST.post("/admin/auth", data);
  };

  const adminData = async () => {
    return await REQUEST.get("/admin/admins/me", { headers });
  };

  const getAllAdmins = async (query) => {
    return await REQUEST.get(`/admin/admins${getQuery(query)}`, { headers });
  };
  const createAdmin = async (data) => {
    return await REQUEST.post(`/admin/admins`, data, { headers });
  };
  const editAdmin = async (id, data) => {
    return await REQUEST.patch(`/admin/admins/${id}`, data, { headers });
  };
  const deleteAdmin = async (id) => {
    return await REQUEST.delete(`/admin/admins/${id}`, { headers });
  };




/*--------------------  START PROGRAMS SECTION  --------------------*/


const getAllPackages = async (query) => {
  return await REQUEST.get(`/admin/website-management/packages${getQuery(query)}`, { headers });
};
const createPackage = async (data) => {
  return await REQUEST.post(`/admin/website-management/packages`, data, { headers });
};

/*--------------------  END PROGRAMS SECTION  --------------------*/






  return {
    register,
    login,
    sendForgetPassword,
    resetPassword,
    adminLogin,
    adminData,
    getAllAdmins,
    createAdmin,
    editAdmin,
    editCurrentAdmin,
    deleteAdmin,
    

    getAllPackages,
    createPackage

  };
};
export default useRequest;