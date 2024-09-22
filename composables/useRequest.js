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
  const auth = {
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


/*--------------------  START CLIENTS SECTION  --------------------*/

  const getAllClients = async (query) => {
    return await REQUEST.get(`/admin/clients-management${getQuery(query)}`, { headers });
  };
  const createClient = async (data) => {
    return await REQUEST.post(`/admin/clients-management`, data, { headers });
  };
  const editClient = async (id, data) => {
    return await REQUEST.patch(`/admin/clients-management/${id}`, data, { headers });
  };
  const deleteClient = async (id) => {
    return await REQUEST.delete(`/admin/clients-management/${id}`, { headers });
  };
/*--------------------  END CLIENTS SECTION  --------------------*/



/*--------------------  START PROGRAMS SECTION  --------------------*/


const getAllPackages = async (query) => {
  return await REQUEST.get(`/admin/website-management/packages${getQuery(query)}`, { headers });
};
const createPackage = async (data) => {
  return await REQUEST.post(`/admin/website-management/packages`, data, { headers });
};
const editPackage = async (id, data) => {
  return await REQUEST.patch(`/admin/website-management/packages/${id}`, data, { headers });
};
const deletePackage = async (id) => {
  return await REQUEST.delete(`/admin/website-management/packages/${id}`, { headers });
};

/*--------------------  END PROGRAMS SECTION  --------------------*/


/*--------------------  START PRODUCTS SECTION  --------------------*/


const getAllProducts = async (query) => {
  return await REQUEST.get(`/admin/website-management/products${getQuery(query)}`, { headers });
};
const createProduct = async (data) => {
  return await REQUEST.post(`/admin/website-management/products`, data, { headers });
};
const editProduct = async (id, data) => {
  return await REQUEST.patch(`/admin/website-management/products/${id}`, data, { headers });
};
const deleteProduct = async (id) => {
  return await REQUEST.delete(`/admin/website-management/products/${id}`, { headers });
};

/*--------------------  END PRODUCTS SECTION  --------------------*/


/*--------------------  START CLIENTS SECTION  --------------------*/

const getAllBolgs = async (query) => {
  return await REQUEST.get(`/admin/website-management/blogs${getQuery(query)}`, { headers });
};
const createBolg = async (data) => {
  return await REQUEST.post(`/admin/website-management/blogs`, data, { headers });
};
const editBolg = async (id, data) => {
  return await REQUEST.patch(`/admin/website-management/blogs/${id}`, data, { headers });
};
const deleteBolg = async (id) => {
  return await REQUEST.delete(`/admin/website-management/blogs/${id}`, { headers });
};
/*--------------------  END CLIENTS SECTION  --------------------*/




/*--------------------  START CONTACT US SECTION  --------------------*/
const getAllMessages = async (query) => {
  return await REQUEST.get(`/admin/website-management/contact-us${getQuery(query)}`, { headers });
};
const deleteMessage = async (id) => {
  return await REQUEST.delete(`/admin/website-management/contact-us/${id}`, { headers:auth });
};

/*--------------------  END CONTACT US SECTION  --------------------*/


/*--------------------  START WEBSITE MANAGEMENT SECTION  --------------------*/

// VIDEOS

const getAllVideos = async () => {
  return await REQUEST.get(`/admin/website-management/videos`, { headers });
};
const createVideo = async (data) => {
  return await REQUEST.post(`/admin/website-management/videos`, data, { headers });
};
const editVideo = async (id, data) => {
  return await REQUEST.patch(`/admin/website-management/videos/${id}`, data, { headers });
};
const deleteVideo = async (id) => {
  return await REQUEST.delete(`/admin/website-management/videos/${id}`, { headers });
};
// certifications
const getAllSections  = async () => {
  return await REQUEST.get(`/admin/website-management/sections`, { headers });
};
const createSection = async (data) => {
  return await REQUEST.post(`/admin/website-management/sections`, data, { headers });
};
const editSection = async (id, data) => {
  return await REQUEST.patch(`/admin/website-management/sections/${id}`, data, { headers });
};
const deleteSection = async (id) => {
  return await REQUEST.delete(`/admin/website-management/sections/${id}`, { headers });
};
// certifications
const getAllCertifications  = async () => {
  return await REQUEST.get(`/admin/website-management/certifications`, { headers });
};
const createCertification = async (data) => {
  return await REQUEST.post(`/admin/website-management/certifications`, data, { headers });
};
const editCertification = async (id, data) => {
  return await REQUEST.patch(`/admin/website-management/certifications/${id}`, data, { headers });
};
const deleteCertification = async (id) => {
  return await REQUEST.delete(`/admin/website-management/certifications/${id}`, { headers });
};
//transformations
const getAllTransformations  = async (query) => {
  return await REQUEST.get(`/admin/website-management/transformations${getQuery(query)}`, { headers });
};
const createTransformation = async (data) => {
  return await REQUEST.post(`/admin/website-management/transformations`, data, { headers });
};
const editTransformation = async (id, data) => {
  return await REQUEST.patch(`/admin/website-management/transformations/${id}`, data, { headers });
};
const deleteTransformation = async (id) => {
  return await REQUEST.delete(`/admin/website-management/transformations/${id}`, { headers });
};


//quick-answers
const getAllQuickAnswers  = async () => {
  return await REQUEST.get(`/admin/website-management/quick-answers`, { headers });
};
const createQuickAnswer = async (data) => {
  return await REQUEST.post(`/admin/website-management/quick-answers`, data, { headers });
};
const editQuickAnswer = async (id, data) => {
  return await REQUEST.patch(`/admin/website-management/quick-answers/${id}`, data, { headers });
};
const deleteQuickAnswer = async (id) => {
  return await REQUEST.delete(`/admin/website-management/quick-answers/${id}`, { headers });
};


// website data
const getAllSettings  = async () => {
  return await REQUEST.get(`/admin/website-management/layout`, { headers });
};
const setAllSettings = async (data) => {
  return await REQUEST.patch(`/admin/website-management/layout`, data, { headers:auth });
};
/*--------------------  END WEBSITE MANAGEMENT SECTION  --------------------*/


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
    createPackage,
    editPackage,
    deletePackage,

    getAllProducts,
    createProduct,
    editProduct,
    deleteProduct,

    
getAllClients,
createClient,
editClient,
deleteClient,


getAllVideos,createVideo,editVideo,deleteVideo,
getAllCertifications,createCertification,editCertification,deleteCertification,
getAllSections, createSection, editSection, deleteSection,
getAllTransformations,createTransformation,editTransformation,deleteTransformation,
getAllSettings,setAllSettings,
getAllQuickAnswers,createQuickAnswer,editQuickAnswer,deleteQuickAnswer,
getAllMessages,deleteMessage,
getAllBolgs,
createBolg ,
editBolg ,
deleteBolg, 



  };
};
export default useRequest;