<template>
  <div>
    <div>
      <Loader v-if="global.loader" />
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>



<script setup>

import Loader from "./components/generic/Loader.vue";
import { useGlobalStore } from "~/stores/global";
import useServerRequist from "../../composables/useServerRequist";

const global = useGlobalStore();
const currentLang = useCookie("i18n_redirected");
const roleCookie = useCookie("role");
const typeCookie = useCookie("type");
const userInfoCookie = useCookie("userInfo");
const tokenCookie = useCookie("token");
const { layout } = useServerRequist()



  const { data , error} = await layout();
  const payload = {
    socialMedia: data.value?.data?.socialMedia,
    mainDescription:{ar:data.value?.data?.data?.mainDescAr , en: data.value?.data?.data?.mainDescEn},
    footerDescription:{ar:data.value?.data?.data?.footerDescAr , en: data.value?.data?.data?.footerDescEn},
  }
global.setMainData(payload)



const seo = data?.value?.data?.seo





const isDark = useCookie("isDark", {
  default: () => "light",
  watch: "shallow",
});

onBeforeMount(() => {
// check if the user is logged in and update the state management
  if (roleCookie.value && typeCookie.value && tokenCookie.value && userInfoCookie.value) {

    const savedData = {
      user: userInfoCookie.value,
      token: tokenCookie.value,
      isAuth: true
    }
    global.updateAuth(savedData);

  } else {
    global.updateAuth({ user: {}, token: "", isAuth: false });
    userInfoCookie.value = "";
    tokenCookie.value = "";
    typeCookie.value = ""
    roleCookie.value = ""
  }
});
useHead({
  bodyAttrs: {
    class: computed(() => (isDark.value == "dark" && global.isPopup) ? "dark freeze" : isDark.value == "dark" && !global.isPopup ? "dark" : isDark.value == "light" && global.isPopup ? "light freeze" : "light",),
    dir: computed(() => currentLang.value == 'ar' ? 'rtl' : 'ltr' ),

  },
  link: [{ rel: "icon", type: "image/png", href: "/logo.svg" }],
  meta: [
    { name: 'description', content: seo.description },
    { name: 'title', content: seo.title },
    { name: 'keywords', content: seo.keywords },
    // Open Graph tags
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:image', content: '/logo.png' },
    { property: 'og:url', content: '/logo.png' },
    { property: 'og:type', content: 'website' },
    // Twitter Card tags
    { name: 'twitter:card', content: seo.title },
    { name: 'twitter:title', content: seo.title },
    { name: 'twitter:description', content: seo.description },
    { name: 'twitter:image', content: '/logo.png' },
    // Google / Schema.org tags
    { itemprop: 'name', content: seo.title },
    { itemprop: 'description', content: seo.description },
    { itemprop: 'image', content: '/logo.png' },
    // Pinterest Rich Pins
    { name: seo.title, content: 'true' }
  ]
});




</script>

<style></style>
