import axios from "axios";
import { useGlobalStore } from "~/stores/global";
import showToast from "~/composables/useToast";

// import notify from './useToast'

const useAxios = () => {
  
  const config = useRuntimeConfig();
  const global = useGlobalStore();

  let axiosObject = {
    baseURL: process.env.NODE_ENV === "production" ? config.public.prod_base : config.public.dev_base,
  };
  axios.defaults.withCredentials = true
  const mainInstance = axios.create(axiosObject);
  const { locale, locales, setLocale, t } = useI18n();



  mainInstance.interceptors.request.use(
    function (config) {
      global.turnLoaderOn()

      return config;
    },
    (error) => {
      //if err don't do any thing and i will handel it in my global handel error
      global.turnLoaderOff()

      return Promise.reject(error);
      // clg error
    }
  );

  mainInstance.interceptors.response.use(

    async (res) => {
      global.turnLoaderOff()
      return Promise.resolve(res);
    },
    async (err) => {
      global.turnLoaderOff()

      if (err.response) {
        //bad req

  







        if (err.response.status === 400) {

        }
        if (err.response.status === 401) {
                 showToast({
             type:'error' ,
              message: err.response.data.customCode == 1 ? t('toast.wrong_email') : err.response.data.customCode == 2 ? t('toast.wrong_password'): t('toast.something_wrong') 
            });
          router.push('/')
          // if the refresh token expired clear the local storage and navigate to login
          //* logout
        }
        //   // with validations errors show toasters
        if (err.response.status === 422) {
          for (const key in err.response.data.errors) {
            const element = err.response.data.errors[key];

          }
        }
        // else just show error message with
        // validations errors
        if (err.response.status === 403) {
          // notify({ title: t('global.failed'), msg: t('global.failed_message'), type: "error" })

        }
        if (err.response.status === 429) {
          // notify({ title: t('global.failed'), msg: t('global.failed_message'), type: "error" })

        }
        // servers error
        if (err.response.status === 404 ) {
          console.log("hello its me" , err.response)
          showToast({
             type:'error' ,
              message: err.response.data.customCode == 1 ? t('toast.wrong_email') 
              : err.response.data.customCode == 2 ? t('toast.wrong_password'):
              err.response.data.customCode == 3 ? t('toast.wrong_type'): t('toast.something_wrong') 
            });

        }
        if( err.response.status === 500){

        }
        //internet and fire wall errors
        if (err.response.status === 0) {
          // notify({ title: t('global.failed'), msg: t('global.failed_message'), type: "error" })

        } else {
          // notify({ title: t('global.failed'), msg: t('global.failed_message'), type: "error" })

        }
      }
      return Promise.reject(err);
    }
  );
  // }, []);
  return mainInstance;
};

export default useAxios;