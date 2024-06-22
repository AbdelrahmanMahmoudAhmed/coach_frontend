<template>
  <div
    @click.self="closePopup"
    class="popup fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#00000099] z-30 overflow-auto flex justify-center items-center"
  >
    <form
      @submit.prevent="submitVps"
      class="px-[45px] py-[30px] bg-[#fff] border-[5px] border-[#fff] rounded-[20px] w-[95%] sm:w-[60%] md:w-[488px] dark:bg-[#1E78B9] dark:border-[#3C97D8]"
    >
      <h3
        class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
      >
        {{ $t("proxy.popups.confirmation") }}
      </h3>

      <div
        class="text-center text-[#747474] text-[12px] xs:text-[14px] dark:text-[#FFFFFFAD]"
      >
      
        {{ $t('proxy.popups.purchase_confirmation') }} 
        <span class=" font-bold">{{ currentPackage?.name }}</span>
      </div>

      <div
        class="text-[#fff] pt-[22px] flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-[20px]"
      >
        <button
          @click="closePopup"
          type="button"
          class="bg-[#062946] rounded-[21px] h-[40px] px-[23px]"
        >
          {{ $t("proxy.popups.cancel") }}
        </button>
        <button
          type="submit"
          class="bg-[#2FA3F7] rounded-[21px] h-[40px] px-[23px]"
        >
          {{ $t("proxy.popups.submit") }}
        </button>
      </div>
    </form>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  currentPackage: Object,
});
const emit = defineEmits(["closePopup", "openSuccessPopup"]);
import useRequest from "~/composables/useRequist";

const router = useRouter();
const closePopup = () => {
  emit("closePopup");
};

const submitVps = () => {

};


</script>
  
  <style >
</style>