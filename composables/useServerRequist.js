import { useFetch } from "#app"

const useRequest = () => {
    const config = useRuntimeConfig()
    const baseURL = process.env.NODE_ENV === "production" ? config.public.prod_base : config.public.dev_base

    const layout = async () => {

        return useFetch('/layout', {
            baseURL,
            method: "GET",
        })
    };
    const home = async () => {
        return useFetch('/layout', {
            baseURL,
            method: "GET",
        })
    };
    const aboutUs = async () => {

        return useFetch('/layout?section=about', {
            baseURL,
            method: "GET",
        })
    };
    const terms = async () => {

        return useFetch('/layout?section=terms', {
            baseURL,
            method: "GET",
        })
    };
    const policy = async () => {

        return useFetch('/layout?section=policy', {
            baseURL,
            method: "GET",
        })
    };




    return {
        layout, aboutUs, terms, policy, home
    };
};
export default useRequest;