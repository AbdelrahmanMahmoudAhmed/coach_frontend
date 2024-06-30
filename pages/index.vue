<template>
  <div v-if="pending">
    <Loader />
  </div>
  
  <div id="home-page">
  <div class="mb-[28px] 2xl:app-container">
    <img
      v-if="isDark == 'light'"
      src="../assets/imgs/Banner-web@2x.png"
      alt=""
    />
    <img
      v-if="isDark == 'dark'"
      src="../assets/imgs/Banner-web2@2x.png"
      alt=""
    />
  </div>

  <div id="about-section"  class="app-container mb-[28px] lg:mb-[70px]">
    <div class="relative">
      <!-- absolute w-full h-full top-0 left-0 -->
      <div class="pt-[17px] bg-[#00C2F729] pb-[50px] mb-[10px]">
        <h1
          class="text-center font-[800] text-[20px] mb-[10px] xs:text-[26px] md:text-[30px]"
        >
          {{ locale =='ar' ? data?.data?.title?.ar : data?.data?.title?.en }}
        </h1>
        <p
        v-html=" locale == 'ar' ?( data?.data?.description?.ar?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '')  : (data?.data?.description?.en?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '') "
          class="text-center text-[14px] font-[500] m-auto w-[95%] xs:text-[18px] 2xl:w-[60%]"
        >
          
        </p>
        <NuxtLink
        v-if="role == 'admin' || global.user.type == 'admin' "
              :to="`/admin`"
          class=" text-center block m-auto mt-[16px] w-[155px] text-nowrap bg-[--main-color] text-white rounded-[23px] px-[27px] py-[8px] text-[18px] xs:text-[21px] sm:w-[175px]"
        >
          {{ $t("auth.my_account") }}
        </NuxtLink>
        <NuxtLink
        v-else-if="role == 'user' || global.user.type == 'user' "
              :to="`/user`"
              class=" text-center block m-auto mt-[16px] w-[155px] text-nowrap bg-[--main-color] text-white rounded-[23px] px-[27px] py-[8px] text-[18px] xs:text-[21px] sm:w-[175px]"
        >
          {{ $t("auth.my_account") }}
        </NuxtLink>
        <NuxtLink
        v-else
              :to="`/login`"
              class=" text-center block m-auto mt-[16px] w-[155px] text-nowrap bg-[--main-color] text-white rounded-[23px] px-[27px] py-[8px] text-[18px] xs:text-[21px] sm:w-[175px]"
        >
          {{ $t("auth.login_now") }}
        </NuxtLink>
      </div>
      <div
        class="absolute h-[65px] w-full left-0 bottom-[-32px] skew-x-0 skew-y-[2.5deg] bg-[#fff] dark:bg-[#062946]"
      ></div>
      <!-- <img class="w-full block" src="../assets/imgs/Path1.svg" alt="" /> -->
    </div>
    <div class="relative">
      <div
        class="absolute h-[65px] w-full left-0 top-[-32px] skew-x-0 skew-y-[2.5deg] bg-[--third-color]"
      ></div>
      <div
        :class="` ${
          locale == 'ar'
            ? '2xl:pr-[54px] 2xl:pl-[30px]'
            : '2xl:pl-[54px] 2xl:pr-[30px]'
        } relative z-10 bg-[--third-color] px-3 pb-[20px] lg:px-10 lg:pb-[40px] `"
      >
        <h2
          class="text-[#2FA3F7] font-[800] text-[20px] mb-[10px] xs:text-[26px] md:text-[35px]"
        >
          {{ $t("header.about") }}
        </h2>
        <div
          class="flex flex-col justify-between items-center lg:items-start lg:flex-row"
        >
          <p
          v-html=" locale == 'ar' ?( data?.data?.aboutUs?.ar?.replace(/(?:\r\n|\r|\n)/g, '<br>')?.slice(0,170) + (data?.data?.aboutUs?.ar?.replace(/(?:\r\n|\r|\n)/g, '<br>')?.length > 169 && ' ....') || '')  : (data?.data?.aboutUs?.en?.replace(/(?:\r\n|\r|\n)/g, '<br>')?.slice(0,170) + (data?.data?.aboutUs?.en?.replace(/(?:\r\n|\r|\n)/g, '<br>')?.length > 169 && ' ....') || '') "
            class="text-[#fff] w-full text-[14px] xs:text-[18px] md:text-[20px] lg:w-[78%] lg:gap-[50%] 2xl:w-[85%]"
          >

          </p>
          <NuxtLink to="/about"
            class="block mt-[16px] h-[48px] bg-[--main-color] text-white rounded-[23px] px-[52px] py-[8px] text-[18px] max-w-[155px] xs:text-[21px]"
          >
            {{ $t("auth.more") }}
          </NuxtLink>
        </div>
      </div>
      <!-- <img class="w-full block" src="../assets/imgs/Path2.svg" alt="" /> -->
    </div>
  </div>
  <div id="feature-section">
    <Feature :features="data?.data?.features" />
  </div>

  <div id="feedback-section">
    <Feedback :feedbacks="data?.data?.feedbacks" />
  </div>

  <div
    class="bg-[--main-color] py-[45px] flex justify-center items-center gap-[30px] md:gap-[60px] dark:bg-[#1E78B9]"
  >
    <img class="w-[100px] sm:w-auto" src="../assets/imgs/paypal.png" alt="" />
    <img class="w-[50px] sm:w-auto" src="../assets/imgs/Bitcoin.png" alt="" />
  </div>
  <div id="contact-us-section">
    <ContactUs />
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

const { locale, locales, setLocale } = useI18n();
const isDark = useCookie("isDark");
const global = useGlobalStore();
const role = useCookie("role");
console.log(global.token)

const { home } = useServerRequist()
const { data , error , pending} = await home();


</script>

<style>
</style>