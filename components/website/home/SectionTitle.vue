<template>
    <div class="text-center pt-[27px]">
      <h3 :class="`${isColord ? 'text-[--third-color] dark:text-[#fff]' : 'text-[#fff]'} font-[900] text-[18px] xs:text-[20px] sm:text-[28px] md:text-[35px]`">
          {{title}}
      </h3>
      <span :class="`w-[67px] h-[6px] block m-auto rounded-md ${isColord ? ' bg-[--main-color] dark:bg-white' : 'bg-white'} `"></span>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
      title:String,
      isColord:Boolean
  })
  </script>
  
  <style>
  
  </style>