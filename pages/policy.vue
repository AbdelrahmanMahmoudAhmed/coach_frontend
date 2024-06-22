<template>
  <div class=" mt-[120px] lg:mt-[250px]">
    <PageTitle :title="$t('footer.privacy')" />
 <div class="app-container py-[30px] sm:py-[40px] lg:pt-[65px] lg:pb-[140px]">
  <p v-html=" locale == 'ar' ? ( data?.data?.policyAr?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '')  : (data?.data?.policyEn?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '') " class="text-[#000000] text-[14px] text-center xs:text-start xs:text-[16px] sm:text-[18px] md:text-[20px] dark:text-[#FFFFFF85]">

    </p>
 </div>
  </div>
</template>

<script setup>
import PageTitle from '~/components/website/home/PageTitle.vue';
import useServerRequist from "~/composables/useServerRequist";
const { locale, locales, setLocale } = useI18n();

const { policy } = useServerRequist()
const { data , error} = await policy();

</script>

<style>

</style>