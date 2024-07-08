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
          <!-- <div class="max-w-[200px] rounded-lg overflow-hidden">
              <img :src="`${BASE_URL}${currentDetails.image}`" alt="package image" />
            </div> -->
          <video
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
              {{ $t("auth.video_link") }}
            </span>
            <span class="text-[14px]">{{ currentDetails.link }}</span>
          </div>
        </div>

        <div class="mb-[10px] w-full flex flex-col justify-center m-auto">
          <div class="relative">
            <div class="flex flex-col items-center">
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.description_ar") }}
              </span>
              <span class="text-[14px]">{{
                currentDetails.descriptionAr
              }}</span>
            </div>

            <div class="flex flex-col mt-2 items-center mb-4">
              <span
                class="font-bold text-[--main-color] dark:text-[--third-color]"
              >
                {{ $t("auth.description_en") }}
              </span>
              <span class="text-[14px]">{{
                currentDetails.descriptionEn
              }}</span>
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
  