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
        {{ $t(`admin.actions.details_${page}`) }}
      </h3>

      <div class="flex flex-col justify-center">
        <div class="mb-4">
          <div
          v-if="currentDetails.nameAr"
            class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-center"
          >
            <span
              class="font-bold text-[--main-color] dark:text-[--third-color]"
            >
              {{ $t("auth.name_ar") }}
            </span>
            <span>{{ currentDetails.nameAr }}</span>
          </div>
          <div
          v-if="currentDetails.nameEn"
            class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-center"
          >
            <span
              class="font-bold text-[--main-color] dark:text-[--third-color]"
            >
              {{ $t("auth.name_en") }}
            </span>
            <span>{{ currentDetails.nameEn }}</span>
          </div>
          <div
          v-if="currentDetails.titleAr"
            class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-center"
          >
            <span
              class="font-bold text-[--main-color] dark:text-[--third-color]"
            >
              {{ $t("auth.title_ar") }}
            </span>
            <span>{{ currentDetails.titleAr }}</span>
          </div>
          <div
          v-if="currentDetails.titleEn"
            class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-center"
          >
            <span
              class="font-bold text-[--main-color] dark:text-[--third-color]"
            >
              {{ $t("auth.title_en") }}
            </span>
            <span>{{ currentDetails.titleEn }}</span>
          </div>
          
        </div>
        
        <div class="add-edit-holder mb-4">
          <div    v-if="withImg && currentDetails.image" class="max-w-[200px] rounded-lg overflow-hidden mb-2">
              <img :src="`${BASE_URL}${currentDetails.image}`" alt="package image" />
          </div>
          <video
          v-if="currentDetails.link"
            class="rounded-xl mt-2"
            width="420"
            height="315"
            controls
            :src="currentDetails.link"
            :title="currentDetails.titleEn"
          >
            Your browser does not support the video tag.
          </video>

          <div class="flex flex-col items-center">
            <span
              class="font-bold text-[--main-color] dark:text-[--third-color]"
            >
              {{page == 'video' ? $t("auth.video_link") :( page == 'certification' )? $t("auth.certification_img") :  page == 'transformation' ? $t("auth.transformation_img") :  page == 'sections' ? $t("auth.section_img") : '' }}
            </span>
            <span class="text-[14px]">{{ currentDetails.link }}</span>
          </div>
        </div>

        <div class="mb-[10px] w-full flex flex-col justify-center m-auto">
          <div class="relative">
            <div class="flex flex-col items-center" v-if="currentDetails.callToAction && currentDetails.callToActionLink">
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.call_to_action") }}
              </span>
              <a  class="text-[14px] text-center hover:text-[--main-color]" target="_blank" :href="currentDetails.callToActionLink" >{{ $t("auth.click_here") }}</a>
            </div>
            <div class="flex flex-col items-center" v-if="currentDetails.descriptionAr">
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.description_ar") }}
              </span>
              <span  class="text-[14px] text-center" v-html="currentDetails.descriptionAr?.replace(/\n/g, '<br />')" ></span>
            </div>
            <div class="flex flex-col mt-2 items-center mb-4" v-if="currentDetails.descriptionEn">
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.description_en") }}
              </span>
              <span v-html=" currentDetails.descriptionEn?.replace(/\n/g, '<br />')" class="text-[14px] text-center"></span>
            </div>
            <div class="flex flex-col mt-2 items-center mb-4" v-if="currentDetails.contentAr">
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.content_ar") }}
              </span>
              <span v-html=" currentDetails.contentAr?.replace(/\n/g, '<br />')" class="text-[14px] text-center"></span>
            </div>
            <div class="flex flex-col mt-2 items-center mb-4" v-if="currentDetails.contentEn">
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.content_en") }}
              </span>
              <span v-html=" currentDetails.contentEn?.replace(/\n/g, '<br />')" class="text-[14px] text-center"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
const emit = defineEmits(["closePopup"]);
const props = defineProps({
  currentDetails: Object,
  page: String,
  withImg:Boolean
});
const theme = useCookie("isDark", {
  watch: "shallow",
});

const closePopup = () => {
  emit("closePopup");
};
const { locale, locales, setLocale, t } = useI18n();

const config = useRuntimeConfig();
const BASE_URL = config.public.base_url;
</script>
  
  <style></style>
  