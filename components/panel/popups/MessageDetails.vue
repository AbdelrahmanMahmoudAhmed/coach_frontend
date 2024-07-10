<template>
    <div @click.self="closePopup" class="popup-holder popup">
      
      <div class="panel-form">
        <div
          @click="closePopup"
          :class="`${
            locale == 'ar' ? 'left-4' : 'right-4'
          } absolute top-4 cursor-pointer`"
        >
          <img
            class="w-[40px] cursor-pointer"
            :src="
              theme == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'
            "
            alt=""
          />
        </div>
        <h3
          class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
        >
          {{ $t(`admin.actions.details_message`) }}
        </h3>
  
        <div class="w-fit mx-auto">
          <div class="mb-4">
            <div
              class="flex flex-col items-center justify-between mb-2 xs:mb-0 xs:flex-row xs:gap-4 "
            >
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.name") }}
              </span>
              <span>{{ currentDetails.name }}</span>
            </div>
            <div
              class="flex flex-col items-center justify-between mb-2 xs:mb-0 xs:flex-row xs:gap-4 "
            >
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.email") }}
              </span>
              <span>{{ currentDetails.email }}</span>
            </div>


            
            <div
              class="flex flex-col items-center justify-between mb-2 xs:mb-0 xs:flex-row xs:gap-4 "
            >
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.phone") }}
              </span>
              <span>{{ locale == 'ar' ? useArabicNums( currentDetails.phone) :  currentDetails.phone }}</span>
            </div>
            <div
              class="flex flex-col items-center justify-between mb-2 xs:mb-0 xs:flex-row xs:gap-4 "
            >
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.date") }}
              </span>
              <span>{{ locale == 'ar' ? useArabicDates( currentDetails.createdAt) :  useEnglishDates(currentDetails.createdAt) }}</span>
            </div>

    
          </div>





        
  
          <div class="mb-[10px] w-full flex flex-col justify-center m-auto">
            <div class="relative">
                <div class="flex flex-col items-center" >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.title") }}
                </span>
                <span  class="text-[14px] text-center" v-html="currentDetails.title?.replace(/\n/g, '<br />')" ></span>
              </div>
              <div class="flex flex-col items-center" >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.message") }}
                </span>
                <span  class="text-[14px] text-center" v-html="currentDetails.message?.replace(/\n/g, '<br />')" ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    
    <script setup>
    import useDateAndNums from "~/composables/useDateAndNums.js"


const { useArabicDates , useEnglishDates , useArabicNums } = useDateAndNums();
const { locale, locales, setLocale, t } = useI18n();

  const emit = defineEmits(["closePopup"]);
  const props = defineProps({
    currentDetails: Object,
    withImg:Boolean
  });
  const theme = useCookie("isDark", {
    watch: "shallow",
  });
  
  const closePopup = () => {
    emit("closePopup");
  };
  
  const config = useRuntimeConfig();
  const BASE_URL = config.public.base_url;
  </script>
    
    <style></style>
    