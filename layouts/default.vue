
<template>
  <Header />

<div :class="``	"> 

  <div class="min-h-[50vh] mt-[86px] lg:mt-[178px]">
    <slot />
  </div>
  <Footer />
</div>
</template>




<script setup>
import { useGlobalStore } from "~/stores/global";
import Header from "~/components/generic/Header.vue";
import Footer from "~/components/generic/Footer.vue";


const { locale, locales, setLocale } = useI18n();
const lang = useCookie("lang");
const global = useGlobalStore();
</script>

<style>
body{
  transition: all .3s ease-out;
}
</style>