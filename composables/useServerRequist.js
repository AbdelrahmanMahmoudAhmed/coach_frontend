import { useFetch } from "#app"

const useServerRequest = () => {
    const config = useRuntimeConfig()
    const baseURL = process.env.NODE_ENV === "production" ? config.public.prod_base : config.public.dev_base

    const layout = async () => {

        return useFetch('/layout', {
            baseURL,
            method: "GET",
        })
    };
    const home = async () => {
        return useFetch('/layout?section=home', {
            baseURL,
            method: "GET",
        })
    };
    const aboutUs = async () => {

        return useFetch('/layout?section=about', {
            // return useFetch('/layout?section=layout', {
            
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

    const testimonials = async () => {

        return useFetch('/testimonials', {
            baseURL,
            method: "GET",
        })
    };
    const quickAnswer = async () => {

        return useFetch('/quick-answers', {
            baseURL,
            method: "GET",
        })
    };
    const transformations = async () => {

        return useFetch('/transformations?notPagenated=1', {
            baseURL,
            method: "GET",
        })
    };
    
    




    return {
        layout, aboutUs, terms, policy, home ,testimonials, quickAnswer , transformations
    };
};
export default useServerRequest;