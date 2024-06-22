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

const global = useGlobalStore();
const currentLang = useCookie("i18n_redirected");

const roleCookie = useCookie("role");
const typeCookie = useCookie("type");
const userInfoCookie = useCookie("userInfo");
const tokenCookie = useCookie("token");

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
    dir: "ltr"
  },
  link: [{ rel: "icon", type: "image/png", href: "/logo.svg" }],
  meta: [
    // { name: 'description', content: 'Description of your content' },
    { name: 'title', content: 'Fox Proxy' },
    // Open Graph tags
    { property: 'og:title', content: 'Fox Proxy' },
    // { property: 'og:description', content: 'Description of your content' },
    { property: 'og:image', content: '/logo.png' },
    { property: 'og:url', content: '/logo.png' },
    { property: 'og:type', content: 'website' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'Fox Proxy' },
    { name: 'twitter:title', content: 'Fox Proxy' },
    // { name: 'twitter:description', content: 'Description of your content' },
    { name: 'twitter:image', content: '/logo.png' },
    // Google / Schema.org tags
    { itemprop: 'name', content: 'Fox Proxy' },
    // { itemprop: 'description', content: 'Description of your content' },
    { itemprop: 'image', content: '/logo.png' },
    // Pinterest Rich Pins
    { name: 'Fox Proxy', content: 'true' }
  ]
});




</script>

<style></style>
