<template>
  <div
    @click.self="closePopup"
    class="popup fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#00000099] z-50 overflow-auto flex justify-center items-center"
  >
    <form
      @submit.prevent="logoutFun"
      class="px-[45px] py-[30px] bg-[#fff] border-[5px] border-[#fff] rounded-[20px] w-[95%] sm:w-[60%] md:w-[488px] dark:bg-[#1E78B9] dark:border-[#3C97D8]"
    >
      <h3
        class="capitalize text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
      >
        {{ $t("header.logout") }}
      </h3>

      <div
        class="text-center text-[#747474] text-[12px] xs:text-[14px] dark:text-[#FFFFFFAD]"
      >
        {{ $t("popups.logout_confirmation", { name: global.user?.name }) }}
        <!-- <span class="font-bold">{{ global.user?.name }}</span> -->
      </div>

      <div
        class="popup-actions-holder"
      >
        <button
          @click="closePopup"
          type="button"
          class="bg-[#062946] rounded-[21px] h-[40px] px-[23px] transition-all hover:bg-[#2FA3F7]"
        >
          {{ $t("popups.cancel") }}
        </button>
        <button
          type="submit"
          class="bg-[#2FA3F7] rounded-[21px] h-[40px] px-[23px] transition-all	hover:bg-[#062946]"
        >
          {{ $t("header.logout") }}
        </button>
      </div>
    </form>
  </div>
</template>
    
    <script setup>
import { removeUserData } from "~/composables/useAuth";
import { useGlobalStore } from "~/stores/global";

const emit = defineEmits(["closePopup", "openSuccessPopup"]);
const { locale, locales, setLocale } = useI18n();
const global = useGlobalStore();
const route = useRoute();
const router = useRouter();

const closePopup = () => {
  emit("closePopup");
};

const logoutFun = () => {
  // let isRedirect = route.fullPath.includes("/panel");

  removeUserData();
  // if (isRedirect) 
  router.push("/");
  closePopup();
};
</script>
    
    <style >
</style>