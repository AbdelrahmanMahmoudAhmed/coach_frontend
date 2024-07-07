import axios from "axios";
import { useGlobalStore } from "~/stores/global";
import useCustomErr from "./useCustomErr";
import { useI18n } from 'vue-i18n'

const useAxios = () => {
  const config = useRuntimeConfig();
  const global = useGlobalStore();
  const {  t } = useI18n();

  let axiosObject = {
    baseURL:
      process.env.NODE_ENV === "production"
        ? config.public.prod_base
        : config.public.dev_base,
  };
  axios.defaults.withCredentials = true;
  const mainInstance = axios.create(axiosObject);

  mainInstance.interceptors.request.use(
    function (config) {
      global.turnLoaderOn();
      return config;
    },
    (error) => {
      global.turnLoaderOff();
      return Promise.reject(error);
    }
  );

  mainInstance.interceptors.response.use(
    async (res) => {

      global.turnLoaderOff();
      return Promise.resolve(res);
    },
    async (err) => {
      global.turnLoaderOff();

      if (err.response) {
        if (err.response.data.customCode) {
          useCustomErr(err.response.data.customCode , t); // to display the toast according to the customCode. 
        } else {
          switch (err.response.status) {
            case 400:
              break;
            case 401:
              break;
            case 422:
              break;
            case 403:
              break;
            case 429:
              break;
            case 404:
              break;
            case 500:
              break;
            case 0:
              break;

            default:
              break;
          }
        }
      }
      return Promise.reject(err);
    }
  );
  return mainInstance;
};

export default useAxios;
