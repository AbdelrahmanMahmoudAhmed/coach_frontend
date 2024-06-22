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
        class="text-center text-[#747474] text-[12px] max-w-[245px] mx-auto xs:text-[14px] dark:text-[#FFFFFFAD]"
      >
        {{ $t("proxy.popups.success_message") }}
      </p>
      <div class="text-center text-[#747474] text-[12px] xs:text-[14px]">
        <button
          @click="()=>closePopup('home')"
          class="bg-[#062946] rounded-[21px] h-[40px] px-[23px] text-[#fff] mt-[15px] text-[14px] xs:text-[18px]"
        >
          {{ $t("proxy.popups.to_home") }}
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  const isDark = useCookie("isDark");
  const router = useRouter()

const emit = defineEmits(["closePopup"]);

const closePopup = (toHome) => {
  emit("closePopup");
  if(toHome == 'home'){
    router.push('/')
  }
};


</script>
  
  <style >
</style>