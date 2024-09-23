<template>
  <h1
    class="text-center font-bold text-[18px] mb-6 sm:text-[26px] lg:text-[32px]"
  >
    {{ $t(`sidebar.admin.${title}`) }}
  </h1>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

