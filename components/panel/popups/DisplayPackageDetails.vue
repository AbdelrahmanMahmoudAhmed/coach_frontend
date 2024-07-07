<template>
  <div
    @click.self="closePopup"
    class="popup-holder popup"
  >
    <div
      class="panel-form "
    >
    <div @click="closePopup" :class="`${locale == 'ar' ? 'left-4' : 'right-4'} absolute top-4 cursor-pointer`">
      <img class="w-[40px] cursor-pointer" :src="theme == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'" alt="">
   </div>
      <h3
        class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
      >
        {{ $t(`admin.actions.details_package`) }}
      </h3>

      <div class="flex flex-col justify-center">
        <div class="mb-4">
          <div class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-center">
            <span class="font-bold text-[--main-color] dark:text-[--third-color]">
              {{ $t("auth.title_ar") }}
            </span>
            <span>{{ currentPackage.titleAr }}</span>
          </div>
          <div  class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-center">
            <span class="font-bold text-[--main-color] dark:text-[--third-color]">
              {{ $t("auth.title_en") }}
            </span>
            <span>{{ currentPackage.titleEn }}</span>
          </div>
        </div>
        <div
          class="add-edit-holder"
        >
          <div class="max-w-[200px] rounded-lg overflow-hidden">
            <img :src="`${BASE_URL}${currentPackage.image}`" alt="package image" />
          </div>
        </div>

        <div class="mb-[10px] w-full flex flex-col justify-center m-auto">
          <div class="relative">
            <div class="flex flex-col items-center">
              <span class="font-bold text-[--main-color] dark:text-[--third-color]">
                {{ $t("auth.description_ar") }}
              </span>
              <span class="text-[14px]">{{ currentPackage.descriptionAr }}</span>
            </div>

            <div class="flex flex-col mt-2 items-center mb-4">
              <span class="font-bold text-[--main-color] dark:text-[--third-color]">
                {{ $t("auth.description_en") }}
              </span>
              <span class="text-[14px]">{{ currentPackage.descriptionEn }}</span>
            </div>
            <div class="w-fit mx-auto my-8">
              <div class="flex gap-8 justify-between">
                <span class="font-bold text-[--main-color] dark:text-[--third-color]">
                  {{ $t("auth.period") }}
                </span>
                <span class="font-bold">{{ currentPackage.period }}</span>
              </div>
              <div class="flex gap-8 justify-between">
                <span class="font-bold text-[--main-color] dark:text-[--third-color]">
                  {{ $t("auth.price") }}
                </span>
                <span class="font-bold">{{ currentPackage.price }}</span>
              </div>
              <div class="flex gap-8 justify-between">
                <span class="font-bold text-[--main-color] dark:text-[--third-color]">
                  {{ $t("auth.discount_percentage") }}
                </span>
                <span class="font-bold">{{ currentPackage.discountPercentage }} %</span>
              </div>
            </div>

            <div class="my-6">
              <h5 class="text-center font-bold text-[20px] mb-3 sm:text-[22px]">{{ $t("auth.package_features") }}</h5>
              <div class=" mx-auto my-2" v-if="currentPackage.PackageFeatures">
                <div class=" border rounded-lg mb-2 w-full px-2 py-1"
                  v-for="(feature, idx) in currentPackage.PackageFeatures"
                  :key="idx"
                >
                  <div  class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-between">
                    <span class="font-bold text-[--main-color] dark:text-[--third-color]">
                      {{ $t("auth.package_feature_ar") }}
                    </span>
                    <span>{{ feature.featureAr }}</span>
                  </div>
                  <div  class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-between">
                    <span class="font-bold text-[--main-color] dark:text-[--third-color]">
                      {{ $t("auth.package_feature_en") }}
                    </span>
                    <span>{{ feature.featureEn }}</span>
                  </div>
                </div>
              </div>
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
  currentPackage: Object,
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
