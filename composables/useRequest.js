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
    return await REQUEST.post("/client/sign-in", data , {headers}  );
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















   ////////////////////////////////////////////
   const contact = async (data) => {
    return await REQUEST.post("/api/contact-us", data);
  };

  //user REQUESTs section >>>>

  
  const getUserData = async () => {
    return await REQUEST.get(`/api/users/me`);
  };
  const changeUserAccountData =  async (data) => {
    return await REQUEST.patch(`/api/users/me`, data);
  }
  // Start billing
  const getAllBilling = async (page, search) => {
    return await REQUEST.get(`/api/billing?search=${search}&page=${page}`);
  };
  
  const createAlfaCoinBilling = async (data) => {
    return await REQUEST.post(`/api/billing/alfacoin`, data);
  };
  const createPaypalBilling = async (data) => {
    return await REQUEST.post(`/api/billing/paypal`, data);
  };

  const getDigiProxyReference = async () => {
    return await REQUEST.get(`/api/digiproxy-refrence`);
  };
    const generateId = async (id , data) => {
    return await REQUEST.post(`/api/users/packages/residential/${id}/generate`, data);
  };

  const downloadGeneratedIps = async (type , id) => {
    return await REQUEST.get(`/api/users/packages/${type}/${id}` , {headers:{ Accept : 'text/csv' }});
  };
  
  const getProxyReference = async (type) => {
    return await REQUEST.get(`/api/packages/proxy/${type}/reference`);
  };
  
  const calcRenewProxy = async ( type ,id , data) => {
    return await REQUEST.post(`/api/users/packages/${type}/${id}/renew/calc`, data);
  };




  // packages 
  const getUserPackagesByType = async (type) => {
    return await REQUEST.get(`/api/users/packages/${type}`);
  };
  const getUserPackageDetails = async (type , id) => {
    return await REQUEST.get(`/api/users/packages/${type}/${id}`);
  };

  const renewVps = async (id) => {
    return await REQUEST.post(`/api/users/packages/vps/${id}/renew`);
  };

  const renewProxy = async ( type , id , data) => {
    return await REQUEST.post(`/api/users/packages/${type}/${id}/renew` , data);
  };



 
  // end billing


  //admin REQUESTs section >>>>



  const adminLogin = async (data) => {
    return await REQUEST.post("/admin/auth", data);
  };

  const adminData  = async () => {
    return await REQUEST.get("/admin/admins/me" , {headers});
  };

  const getAllAdmins = async (query) => {
    return await REQUEST.get(`/admin/admins${getQuery(query)}`, {headers});
  };
  const createAdmin = async (data) => {
    return await REQUEST.post(`/admin/admins`, data ,{headers});
  };
  const editAdmin = async (id, data) => {
    return await REQUEST.patch(`/admin/admins/${id}`, data , {headers});
  };
  const deleteAdmin = async (id) => {
    return await REQUEST.delete(`/admin/admins/${id}`, {headers});
  };
  






































  

  const getAllSettings = async () => {
    return await REQUEST.get("/api/panel/settings");
  };

  const setAllSettings = async (data) => {
    return await REQUEST.patch("/api/panel/settings", data);
  };
  // admin dashboard
  const dashboard = async () => {
    return await REQUEST.get("/api/panel/dashboard");
  };

  // Start Manage Admins
  const editCurrentAdmin =  async ( data) => {
    return await REQUEST.patch(`/admin/admins/me`, data ,{headers});
  };



  // End Manage Admins


  // Start Manage Features
  const getAllFeatures = async () => {
    return await REQUEST.get(`/api/panel/features`);
  };
  const createFeatures = async (data) => {
    return await REQUEST.post(`/api/panel/features`, data);
  };
  const editFeatures = async (id, data) => {
    return await REQUEST.patch(`/api/panel/features/${id}`, data);
  };
  const deleteFeatures = async (id) => {
    return await REQUEST.delete(`/api/panel/features/${id}`);
  };
  // End Manage Features


  // Start Manage Feedback
  const getAllFeedback = async () => {
    return await REQUEST.get(`/api/panel/feedback`);
  };
  const createFeedback = async (data) => {
    return await REQUEST.post(`/api/panel/feedback`, data);
  };
  const editFeedback = async (id, data) => {
    return await REQUEST.patch(`/api/panel/feedback/${id}`, data);
  };
  const deleteFeedback = async (id) => {
    return await REQUEST.delete(`/api/panel/feedback/${id}`);
  };
  // End Manage Feedback


  // Start Manage Users
  const getAllUsers = async (page, search) => {
    return await REQUEST.get(`/api/panel/users?search=${search}&page=${page}`);
  };
  const downloadAllUsers = async () => {
    return await REQUEST.get(`/api/panel/users` , {headers:{ Accept : 'text/csv' }});
  };
  const createUser = async (data) => {
    return await REQUEST.post(`/api/panel/users`, data);
  };
  const editUser = async (id, data) => {
    return await REQUEST.patch(`/api/panel/users/${id}`, data);
  };
  const deleteUser = async (id) => {
    return await REQUEST.delete(`/api/panel/users/${id}`);
  };
  const changeUserCredit = async (id, data) => {
    return await REQUEST.post(`/api/panel/users/${id}/credit`, data);
  };
  // End Manage Users




  //start manage packages

  //vps
  const getVps = async (page, search) => {
    return await REQUEST.get(`/api/panel/packages/vps?search=${search}&page=${page}`);
  };
  const createVps = async (data) => {
    return await REQUEST.post(`/api/panel/packages/vps`, data);
  };
  const editVps = async (id, data) => {
    return await REQUEST.patch(`/api/panel/packages/vps/${id}`, data);
  };
  const deleteVps = async (id) => {
    return await REQUEST.delete(`/api/panel/packages/vps/${id}`);
  };




  //proxy
  const getProxy = async (page, search, type) => {
    return await REQUEST.get(`/api/panel/packages/proxy?search=${search}&page=${page}&type=${type}`);
  };
  const getAllProxy = async () => {
    return await REQUEST.get(`/api/packages/proxy`);
  };
  const createProxy = async (data) => {
    return await REQUEST.post(`/api/panel/packages/proxy`, data);
  };
  const editProxy = async (id, data) => {
    return await REQUEST.patch(`/api/panel/packages/proxy/${id}`, data);
  };
  const deleteProxy = async (id) => {
    return await REQUEST.delete(`/api/panel/packages/proxy/${id}`);
  };

  //end manage packages

  //start manage paypal REQUESTs 
  const getPaypalRequests = async (page, search) => {
    return await REQUEST.get(`/api/panel/billing/paypal?search=${search}&page=${page}`);
  };
  const acceptPaypalRequests = async (id) => {
    return await REQUEST.post(`/api/panel/billing/paypal/${id}/accept`);
  };
  const rejectPaypalRequests = async (id) => {
    return await REQUEST.post(`/api/panel/billing/paypal/${id}/reject`);
  };
  //end manage paypal REQUESTs

  // start orders
  const getAdminOrders = async (page, search) => {
    return await REQUEST.get(`/api/panel/orders?search=${search}&page=${page}`);
  };
  const editOrderStatus = async (id, date) => {
    return await REQUEST.patch(`/api/panel/orders/${id}`, date);
  };
  const deleteOrder = async (id) => {
    return await REQUEST.delete(`/api/panel/orders/${id}`);
  };
  // end orders


  //start manage invoices 

  const getUserInvoices = async (user, page) => {
    return await REQUEST.get(`/api/panel/invoices?user=${user}&page=${page}`);
  };
  const editInvoice = async (id, data) => {
    return await REQUEST.patch(`/api/panel/invoices/${id}`, data);
  };
  const deleteInvoice = async (id) => {
    return await REQUEST.delete(`/api/panel/invoices/${id}`);
  };

  const searchInvoice = async (search) => {
    return await REQUEST.get(`/api/panel/invoices/${search}`);
  };

  //end manage invoices
  //start manage services

  const createServices = async (data) => {
    return await REQUEST.post(`/api/panel/services` , data);
  };
  const getServices = async () => {
    return await REQUEST.get(`/api/panel/services`);
  };
  const editServices = async (id, data) => {
    return await REQUEST.patch(`/api/panel/services/${id}`, data);
  };
  const deleteServices = async (id) => {
    return await REQUEST.delete(`/api/panel/services/${id}`);
  };


  //end manage services

  //start manage user's packages 


  const createUserVpsPackages = async (user, data) => {
    return await REQUEST.post(`/api/panel/users/${user}/packages/vps`, data);
  };
  const getUserVpsPackages = async (user, page, search) => {
    return await REQUEST.get(`/api/panel/users/${user}/packages/vps?search=${search}&page=${page}`);
  };
  const editUserVpsPackages = async (user, id, data) => {
    return await REQUEST.patch(`/api/panel/users/${user}/packages/vps/${id}`, data);
  };
  const deleteUserVpsPackages = async (id) => {
    return await REQUEST.delete(`/api/panel/users/packages/vps/${id}`);
  };
  const createUserProxyPackages = async (user, type , data) => {
    return await REQUEST.post(`/api/panel/users/${user}/packages/${type}`, data);
  };
  const deleteUserProxyPackages = async (type , id) => {
    return await REQUEST.delete(`/api/panel/users/packages/${type}/${id}`);
  };




  const getUserProxyPackages = async (user, type, page, search) => {
    return await REQUEST.get(`/api/panel/users/${user}/packages/${type}?search=${search}&page=${page}`);
  };
  //end manage user's packages 

  return {
    contact,

    register,
    login,
    sendForgetPassword,
    resetPassword,
    adminLogin,
    getAllSettings,
    adminData,
    setAllSettings,
    getAllAdmins,
    createAdmin,
    editAdmin,
    editCurrentAdmin,
    deleteAdmin,
    getAllFeatures,
    createFeatures,
    editFeatures,
    deleteFeatures,
    getAllFeedback,
    createFeedback,
    editFeedback,
    deleteFeedback,
    dashboard,
    getAllUsers,
    downloadAllUsers,
    createUser,
    editUser,
    deleteUser,
    changeUserCredit,


    getVps,
    createVps,
    editVps,
    deleteVps,

    getProxy,
    getAllProxy,
    createProxy,
    editProxy,
    deleteProxy,


    getPaypalRequests,
    acceptPaypalRequests,
    rejectPaypalRequests,

    getUserInvoices,
    deleteInvoice,
    editInvoice,
    searchInvoice,

    getUserVpsPackages,
    createUserVpsPackages,
    editUserVpsPackages,
    deleteUserVpsPackages,
    deleteUserProxyPackages,
    getAdminOrders,
    editOrderStatus,
    createUserProxyPackages,
    deleteOrder,


    createServices,
    getServices,
    editServices,
    deleteServices,

    getUserProxyPackages,
    //user
    getAllBilling,
    createPaypalBilling,
    createAlfaCoinBilling,
    getUserPackagesByType,
    getUserPackageDetails,
    renewVps,
    renewProxy,
  
    getDigiProxyReference,
    getProxyReference,
    generateId,
    downloadGeneratedIps,
    changeUserAccountData,
    calcRenewProxy,
    getUserData

  };
};
export default useRequest;