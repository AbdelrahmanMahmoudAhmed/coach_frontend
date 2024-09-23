<template>
  <footer>
    <div class="app-container bg-[#05131E] flex flex-col py-[40px] justify-between gap-[40px] xl:flex-row" >
      <div class="flex flex-col items-center flex-1">
        <div class="mb-[16px]">
          <img src="../../assets/imgs/logo2.svg" alt="">
        </div>
        <ul class="flex gap-[8px] mb-[25px]">
          <li>
            <a target="_blanck" :href="data?.data?.socialMedia?.instagram">
              <img src="../../assets/imgs/insta.svg" alt="">
            </a>
          </li>
          <li>
            <a  target="_blanck"  :href="data?.data?.socialMedia?.facebook">
              <img src="../../assets/imgs/fb.svg" alt="">
            </a>
          </li>
          <li>
            <a target="_blanck"  :href="data?.data?.socialMedia?.twitter">
              <img src="../../assets/imgs/x.svg" alt="">
            </a>
          </li>
          <li>
            <a target="_blanck"  :href="data?.data?.socialMedia?.discord">
              <img src="../../assets/imgs/Discord.svg" alt="">
            </a>
          </li>
        </ul>
        <p v-html=" global.footerDescription?.[locale]?.replace(/(?:\r\n|\r|\n)/g, '<br>') " class="text-center text-[#DCE4EB] text-[16px] max-w-[710px] md:text-[19px]">
       
        </p>
      </div>
      <div :class="` ${locale == 'ar' ? 'xl:border-r-[5px]' :'xl:border-l-[5px]'} flex justify-evenly  border-[#21303B] flex-col items-center sm:px-[40px] md:items-start md:flex-row xl:flex-col xl:w-[30%]` ">
    
        <div class=" text-center text-white md:text-start">
          <h5 class="text-[22px] mb-[20px] md:text-[28px] lg:text-[35px]">{{ $t('footer.get_in_touch') }}</h5>
          <ul class="mb-[45px]">
            <li class="mb-[10px]">
              <a :href="`mailto:${global.socialMedia?.email}`" class="flex gap-[10px]">
               <img class="w-[32px]" src="../../assets/imgs/email.svg" alt="">
               <span class="text-[18px] break-all md:break-normal md:text-[20px] lg:text-[24px]">{{global.socialMedia?.email }}</span>
              </a>
            </li>
            <li>
           

              <a :href="`https://wa.me/${global.socialMedia?.whatsApp}`" target="_blank" class="flex gap-[10px]">
               <a class=" w-[32px]"><img src="../../assets/imgs/whatsapp.svg" alt=""></a>
               <span class="text-[18px] md:text-[20px] lg:text-[24px]">{{ global.socialMedia?.whatsApp }}</span>
              </a>
            </li>
            
          </ul>
        </div>

        <div class=" text-center text-white md:text-start">
          <h5 class=" text-[22px] mb-[20px] md:text-[28px] lg:text-[35px]">{{ $t('footer.quick_links') }}</h5>
          <ul class=" text-[#7890A4] text-[18px] md:text-[20px] lg:text-[24px]">
            <li class="mb-[5px]">
              <NuxtLink to="/terms"> {{ $t("footer.terms") }} </NuxtLink>
            </li>
         
            <li>
              <NuxtLink to="/policy"> {{ $t("footer.privacy") }} </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-container bg-[#05131E]">
      <div
        class="text-[#FFFFFF70] text-[16px] md:text-[20px] border-t-[#7a7a7a24] border-t-[2px]"
      >
        <div
          class="flex justify-between items-center flex-col py-2 sm:flex-row md:py-5"
        >
          <ul class="flex gap-4 justify-center w-full">
            <!-- <li>
              <NuxtLink to="/terms"> {{ $t("footer.terms") }} </NuxtLink>
            </li> -->
            <li class="text-center text-[16px] flex items-center md:text-[18px] lg:text-[20px]">
              <span class="pb-1"> {{ $t("footer.foot") }}</span> 
              <a href="https://www.heptaserv.com/" target="_blanck"><img class="w-[100px]" src="../../assets/imgs/heptaserv.png" alt=""></a>
             <span class="pb-1"> © {{ currentYear }}</span>
            </li>
            <!-- <li>
              <NuxtLink to="/privacy"> {{ $t("footer.privacy") }} </NuxtLink>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import useServerRequist from "../../composables/useServerRequist";

const { layout } = useServerRequist()


const { locale, locales, setLocale } = useI18n();


const { data , error} = await layout()

import { useGlobalStore } from "~/stores/global";
const global = useGlobalStore();
console.log("global>>>" , global.footerDescription)

// layout
// to make the  ( year ) dynamic value
const currentYear = computed(() => {
  return new Date().getFullYear();
});
</script>

<style>
</style>



