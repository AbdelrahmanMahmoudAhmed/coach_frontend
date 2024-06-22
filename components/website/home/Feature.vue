<template>
    <div class=" mb-[30px] lg:mb-[80px] ">
      <div>
        <SectionTitle :title="`${$t('header.feature')}`" :isColord="true" />
      </div>
      <div class="app-container pt-[25px] lg:pt-[40px]">
            <div class=" grid grid-cols-1 gap-[10px] md:grid-cols-2 justify-center lg:grid-cols-3 2xl:gap-[23px] 2xl:grid-cols-4">

                    <div v-for="(feature , idx) in features" :key="idx" class=" bg-[--trans-color] p-[20px] rounded-[20px] dark:bg-[#00C2F729]">
                        <div class=" mx-auto mt-[11px] mb-[16px] rounded-full bg-[--main-color] w-[90px] h-[90px] flex justify-center items-center sm:w-[123px] sm:h-[123px]" >
                            <img class="w-[53px] h-[53px] object-contain" :src="`${baseURL}u/${feature?.icon}`" alt="">
                        </div>
                        <h5 class=" font-[600] text-center text-[18px] mb-[12px] md:text-[22px]">{{ locale == 'ar' ?  feature.titleAr : feature.title }}</h5>
                        <p v-html="locale == 'ar' ? (feature.contentAr.replace(/(?:\r\n|\r|\n)/g, '<br>') || '') : (feature.content.replace(/(?:\r\n|\r|\n)/g, '<br>') || '') " :class="`${locale == 'ar' ? 'pr-[5px]' : 'pl-[5px]'} text-center text-[16px] mb-[7px] text-[#557A97] dark:text-[#A1AFBA] lg:text-start` "></p>
                    </div>
            </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import SectionTitle from "../home/SectionTitle.vue";
  const props = defineProps({
    features:Array
});
const config = useRuntimeConfig();
const baseURL =  process.env.NODE_ENV === "production" ? config.public.prod_base : config.public.dev_base;
  const { locale, locales, setLocale } = useI18n();

  const allFeatures = ref([
    {
        title:"Feature 1",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        title:"Feature 1",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        title:"Feature 1",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        title:"Feature 1",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },

    {
        title:"Feature 1",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        title:"Feature 1",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        title:"Feature 1",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        title:"Feature 1",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },

  ])

  </script>
  
  <style>
  
  </style>
  
  
  