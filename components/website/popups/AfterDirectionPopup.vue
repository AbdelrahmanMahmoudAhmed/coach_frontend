<template>
    <div
      @click.self="closePopup"
      class="popup fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#00000099] z-30 overflow-auto flex justify-center items-center"
    >
      <div
        class="px-[45px] py-[30px] bg-[#fff] border-[5px] border-[#fff] rounded-[20px] w-[95%] sm:w-[60%] md:w-[488px] dark:bg-[#1E78B9] dark:border-[#3C97D8]"
      >
      <div class=" flex justify-center mb-[15px]">
        <img v-if="isDark == 'light'" src="../../../assets/imgs/ok_popup_light.svg" alt="" />
        <img v-else src="../../../assets/imgs/ok_popup_dark.svg" alt="" />
  
      </div>
        <p
          class="text-center text-[#747474] text-[12px]  mx-auto xs:text-[18px] font-bold md:text-[22px] dark:text-[#FFFFFFAD]"
        >
          {{ $t("proxy.popups.direction_success_message") }}
        </p>
        <div class="text-center text-[#747474] text-[12px] xs:text-[14px]">
          <button
            @click="()=>closePopup()"
            class="bg-[#062946] rounded-[21px] h-[40px] px-[23px] text-[#fff] transition-all duration-300 mt-[15px] text-[14px] xs:text-[18px] hover:bg-[--main-color]"
          >
            {{ $t("proxy.popups.ok") }}
          </button>
        </div>
      </div>
    </div>
  </template>
    
    <script setup>
    import { useGlobalStore } from "~/stores/global";

    const isDark = useCookie("isDark");
    const global = useGlobalStore();

  
  const closePopup = () => {
 global.closeAfterConfirmationPopup()
 global.changePopupState(false)
  };
  
  
  </script>
    
    <style >
  </style>