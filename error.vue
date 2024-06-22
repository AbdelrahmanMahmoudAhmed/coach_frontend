<template>
  <div class=" app-container flex items-center justify-center w-[100vw] h-[100vh] flex-col gap-[25px]">
    <div>
      <p class=" text-center text-[16px] md:text-[22px]">{{ $t('global.err_msg1') }}</p>
      <p class=" text-center text-[16px] md:text-[22px]">{{ $t('global.err_msg2') }}</p>
    </div>
    <div class="flex gap-10">
      <NuxtLink  to="/" class=" text-white cursor-pointer min-w-[180px] px-3 h-[50px] flex justify-center items-center bg-[--main-color] text-[16px] font-bold rounded-md md:text-[22px] " >{{ $t('global.to_home') }}</NuxtLink>
    </div>
  </div>
</template>





<script setup>

const currentLang = useCookie('i18n_redirected')
const { locale, locales, setLocale ,t } = useI18n();

const lang = useCookie("lang");
const isDark = useCookie("isDark", {
  default: () => "dark",
  watch: "shallow",
});

useHead({
  bodyAttrs: {
    class: computed(() => isDark.value == "dark" ? "dark" : "light"),
    dir: computed(() => {
      if (locale.value == "ar") return "rtl";
      else return "ltr";
    }),
  },
  link: [{ rel: "icon", type: "image/png", href: "/logo.svg" }],
});

</script>

<style>
</style>
