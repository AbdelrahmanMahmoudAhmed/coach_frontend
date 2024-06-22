<template>
  <div class="">
    <h1 class=" w-fit mx-auto mt-[70px] text-[18px] text-[--main-card-color] rounded-[33px] bg-[--trans-color] text-center py-[12px] px-[25px] font-[600] xs:text-[22px] md:text-[28px] lg:text-[32px] lg:py-[12px] lg:px-[65px]  dark:text-[#fff] dark:bg-[--main-card-color]">
       {{ title }}
    </h1>
  </div>
</template>

<script setup>
const props = defineProps({
    title:String
})

</script>

<style>

</style>