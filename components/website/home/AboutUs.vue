<template>
  <div id="about-section"  class="">
    <div class="relative">
      <!-- dark:bg-gradient-to-t dark:from-[--main-color] dark:to-[#105B91] -->
      <div class="pt-[17px] bg-[--main-color-opacity] pb-[50px] dark:bg-gradient-to-t dark:from-[#105B91] dark:to-[--main-color]   ">
        <!-- <div class="pt-[17px] bg-[--main-color-opacity] pb-[50px] dark:bg-[#00C2F729]  "> -->
        <h1
          class="text-center font-[800] text-[20px] xs:text-[26px] md:text-[30px]"
        >
        adsfadsfsad
          <!-- {{ locale =='ar' ? data?.data?.title?.ar : data?.data?.title?.en }} -->
        </h1>
        <!-- <p
        v-html=" locale == 'ar' ?( data?.data?.description?.ar?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '')  : (data?.data?.description?.en?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '') "
          class="text-center text-[14px] font-[500] m-auto w-[95%] xs:text-[18px] 2xl:w-[60%]"
        > 
        </p> -->
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

    </div>
    <div class="relative">
      <div
        :class="` ${
          locale == 'ar'
            ? '2xl:pr-[54px] 2xl:pl-[30px]'
            : '2xl:pl-[54px] 2xl:pr-[30px]'
        } relative z-10 bg-[--third-color] px-3 pb-[20px] lg:px-10 lg:pb-[40px] app-container`"
      >
        <h2
          class="text-[--main-color] font-[800] text-[20px] pt-4 mb-[10px] text-center xs:text-[26px] md:text-start md:text-[35px]"
        >
          {{ $t("header.about") }}
        </h2>
        <div
          class="flex flex-col justify-between items-center lg:items-start lg:flex-row"
        >
          <p
          v-html=" locale == 'ar' ?( aboutData?.aboutAr?.replace(/(?:\r\n|\r|\n)/g, '<br>')?.slice(0,300) + (aboutData?.aboutAr?.replace(/(?:\r\n|\r|\n)/g, '<br>')?.length > 299  ? ' ....' : '') || '')  : (aboutData?.aboutEn?.replace(/(?:\r\n|\r|\n)/g, '<br>')?.slice(0,300) + (aboutData?.aboutEn?.replace(/(?:\r\n|\r|\n)/g, '<br>')?.length > 299 ? ' ....' : '') || '') "
            class="text-[#fff] w-full text-[14px] text-center xs:text-[18px] md:text-start md:text-[20px] lg:w-[78%] lg:gap-[50%] 2xl:w-[85%]"
          >
          </p>
          <NuxtLink to="/about"
            class="block mt-[16px] h-[48px] bg-[--main-color] text-white rounded-[23px] px-[52px] py-[8px] text-[18px] max-w-[155px] xs:text-[21px]"
          >
            {{ $t("auth.more") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  aboutData:Object
})
import { useGlobalStore } from "~/stores/global";

const { locale, locales, setLocale } = useI18n();
const global = useGlobalStore();


</script>

<style>

</style>