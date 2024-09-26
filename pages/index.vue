<template>
  <div v-if="pending">
    <Loader />
  </div>
  <div id="home-page" class="-mt-[108px] ">

  <Vedio :firstSecData="firstSecData" />
  <div >





<AboutUsVue  :aboutData="aboutData"/>




  
  <div id="feature-section">
    <Feature :features="data?.data?.features" />
  </div>

<div>
<Transformation />
</div>

<section>
  <QA />
</section>
  

  <div id="feedback-section">
    <Feedback :feedbacks="data?.data?.feedbacks" />
  </div>

  <!-- <div
    class="bg-[--main-color] py-[45px] flex justify-center items-center gap-[30px] md:gap-[60px] dark:bg-[#1E78B9]"
  >
    <img class="w-[100px] sm:w-auto" src="../assets/imgs/paypal.png" alt="" />
    <img class="w-[50px] sm:w-auto" src="../assets/imgs/Bitcoin.png" alt="" />
  </div> -->
  <div id="contact-us-section">
    <ContactUs />
  </div>

</div>
</div>
</template>

<script setup>

import ContactUs from "~/components/website/home/ContactUs.vue";
import Feedback from "~/components/website/home/Feedback.vue";
import Feature from "~/components/website/home/Feature.vue";
import useServerRequist from "~/composables/useServerRequist";
import { useGlobalStore } from "../stores/global"
import Loader from "~/components/generic/Loader.vue";
import Vedio from "~/components/website/home/Vedio.vue";
import AboutUsVue from "~/components/website/home/AboutUs.vue";
import QA from "~/components/website/home/Q&A.vue";
import Transformation from "~/components/website/home/Transformation.vue";
const { locale, locales, setLocale } = useI18n();
const isDark = useCookie("isDark");
const global = useGlobalStore();
const role = useCookie("role");

const { home } = useServerRequist()
const { data , error , pending} = await home();
const aboutData = {
  aboutAr: data.value.data?.aboutAr,
  aboutEn: data.value.data?.aboutEn,
}
const firstSecData = {
  mainTitleAr:data.value?.data?.mainTitleAr,
  mainTitleEn:data.value?.data?.mainTitleEn,
  mainDescAr:data.value?.data?.mainDescAr,
  mainDescEn:data.value?.data?.mainDescEn,
}

</script>

<style>
</style>