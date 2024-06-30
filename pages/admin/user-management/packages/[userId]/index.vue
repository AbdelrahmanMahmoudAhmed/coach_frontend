<template>
  <div>
    <div class="mb-[30px] dark:text-[#fff] 2xl:px-[299px]">
      <div
        id="continents-holder"
        
        class="  overflow-hidden h-[41px] rounded-[50px] flex items-center border border-[#8ACBFA] dark:border-none dark:bg-[--rows-color]"
      >
        <span
          @click="vpsSection"
          :class="`${
            global.currentSection && 'active'
          } continent transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`"
        >
          VPS
        </span>
        <span
          @click="proxySection"
          :class="`${
            !global.currentSection && 'active'
          } continent transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`"
        >
          PROXY
        </span>
      </div>
    
    </div>
    <div>
        <div v-if="global.currentSection">
            <Vps />
        </div>
        <div v-else>
            <Proxy />
        </div>
      </div>
  </div>
</template>
  
  <script setup>
  import Vps from "~/components/panel/adminViews/Vps.vue"
  import Proxy from "~/components/panel/adminViews/Proxy.vue"
  import { useGlobalStore } from "~/stores/global";
  const global = useGlobalStore();

definePageMeta({
  layout: "panel",
  middleware: "admin-guard",
});
const vpsSection = () => {
   global.toggleCurrentSection(true)
};
const proxySection = () => {
  global.toggleCurrentSection(false)
};
</script>
  
  <style>
.dark .active {
  color: #fff !important;
  background: var(--main-color) !important;
}
.light .active {
  color: #fff !important;
  background: #7ac1f4 !important;
}
</style>