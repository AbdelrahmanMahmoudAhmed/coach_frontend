<template>
  <div @click.self="closePopup" class="popup-holder popup">
    <div class="panel-form md:w-[600px]">
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
        {{ $t(`admin.actions.details_client`) }}
      </h3>

      <div class="flex flex-col justify-center">
        <div class="mb-4">
          <div
            class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-center"
          >
            <span class=" text-[20px] sm:text-[24px]">{{ currentClient.name }}</span>
          </div>
        </div>
        <div
            v-if="currentClient?.country"
            class="flex flex-col items-center mb-2 "
          >

            <span class=" mb-1"> 

{{ getSpecificCountry(currentClient?.country)?.[`name_${locale}`] }}

            </span>

            <country-flag :country="currentClient.country" size='big'/>
          </div>
        <div class="add-edit-holder">
          <div class="max-w-[200px] rounded-lg overflow-hidden">
            <img
              :src="`${BASE_URL}${currentClient.image}`"
              alt="package image"
            />
          </div>
        </div>

        <div class="mb-[10px] w-full flex flex-col justify-center m-auto">
          <div class="relative">
            <div class="w-fit mx-auto my-8">
              <div
                class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-between"
              >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color] whitespace-nowrap"
                >
                  {{ $t("auth.email") }}
                </span>
                <span>{{ currentClient.email }}</span>
              </div>
              <div
                class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-between"
              >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.phone") }}
                </span>
                <span>{{ currentClient.phone }}</span>
              </div>
              <div
                class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-between"
              >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.tall") }}
                </span>
                <span>{{ currentClient.tall }}</span>
              </div>
              <div
                class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-between"
              >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.weight") }}
                </span>
                <span>{{ currentClient.weight }}</span>
              </div>
              <div
                class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-between"
              >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.goal") }}
                </span>
                <span>{{ getGoal(currentClient.goal) }}</span>
              </div>
              <div
                class="flex flex-col items-center mb-2 xs:mb-0 xs:flex-row xs:gap-4 xs:justify-between"
              >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.client_has_disease") }}
                </span>
                <span>{{ getAnswer(currentClient.hasDisease)  }}</span>
              </div>
              <div
              v-if="currentClient.diseaseType && currentClient.hasDisease  "
                class="flex flex-col items-center mb-2 mt-4 "
              >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.disease_type") }}
                </span>
                <span>{{ currentClient.diseaseType  }}</span>
              </div>
              <div
             
                class="flex flex-col items-center mb-2 mt-4 "
              >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.fav_meal") }}
                </span>
                <span>{{ currentClient.favouriteMeals || t('global.not_found')  }}</span>
              </div>
              <div
            
                class="flex flex-col items-center mb-2 mt-4 "
              >
                <span
                  class="font-bold text-[--main-color] dark:text-[--third-color]"
                >
                  {{ $t("auth.un_fav_meal") }}
                </span>
                <span>{{ currentClient.unFavouriteMeals || t('global.not_found') }}</span>
              </div>

              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import CountryFlag from 'vue-country-flag-next';
  import {getSpecificCountry } from "@/utils/getCountry.js";
  // import {getSpecificCountry} from "../../../utils/getCountry"

const emit = defineEmits(["closePopup"]);
const props = defineProps({
  currentClient: Object,
  page: String,
});
const theme = useCookie("isDark", {
  watch: "shallow",
});

const closePopup = () => {
  emit("closePopup");
};
const { locale, locales, setLocale, t } = useI18n();

const getAnswer = ( bool ) => {
  if(bool && locale.value == 'ar') return "نعم";
  if(bool && locale.value == 'en') return "Yes";
  if(!bool && locale.value == 'ar') return "لا";
  if(!bool && locale.value == 'en') return "No";
}


const getGoal = ( goal ) => {
    
    switch (goal) {
        case 'loseFat':
            return locale.value == 'ar' ? 'خسارة الدهون' : 'Lose Fat';
            break;
            case 'loseWeight':
            return locale.value  == 'ar' ? 'خسارة وزن' : 'Lose Weight';
            break;
            case 'gainMuscle':
            return locale.value  == 'ar' ? 'زيادة العضل' : 'Gain Muscle';
            break;
            case 'gainWeight':
            return locale.value  == 'ar' ? 'زيادة وزن' : 'Gain Weight';
            break;
            case 'maintain':
            return locale.value  == 'ar' ? 'الثبات' : 'Maintaining'
            break;
            ''
        default:
            break;
    }
}

const config = useRuntimeConfig();
const BASE_URL = config.public.base_url;
</script>
  
  <style></style>
  