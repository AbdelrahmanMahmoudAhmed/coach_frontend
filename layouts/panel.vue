
<template>
  <div class="relative">
    <Header />

    <div :class="`px-3 pt-8 ${locale =='ar' ? 'lg:pr-[110px]':'lg:pl-[110px]'}  `">
      <slot />
    </div>

  </div>
</template>




<script setup>
import { useGlobalStore } from "~/stores/global";
import Header from "~/components/panel/Header.vue";

const { locale, locales, setLocale } = useI18n();
const lang = useCookie("lang");
const global = useGlobalStore();
</script>

<style>
.p-dropdown.p-component.p-inputwrapper{
border-radius: 50px !important;

}
/* .light .p-dropdown.p-component.p-inputwrapper{
    border-color: var(--main-color) !important;
} */
.dark .p-dropdown.p-component.p-inputwrapper{
   background-color: #011f37 !important;
 
}
.dark .p-dropdown-label.p-inputtext.p-placeholder{
  color: #fff !important;
}

.p-dropdown-label.p-inputtext.p-placeholder span{
  color: #00000038 !important;
}
.dark .p-dropdown-label.p-inputtext.p-placeholder span{
  color: #ffffff82 !important;
}
.dark .p-dropdown-label.p-inputtext {
  color: #fff !important;
}





/* .p-dropdown-trigger {
    color: var(--main-color) !important;
} */
</style>