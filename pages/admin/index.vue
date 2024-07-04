<template>
  <div>
    <div
      class="grid grid-cols-1 gap-[10px] md:grid-cols-2 justify-center lg:grid-cols-3 2xl:gap-[23px] 2xl:grid-cols-4"
    >
        <Card v-for="(item, idx) in pageData" :key="idx">
          <template #title>
            <div class="text-center">{{ $t(`dashboard.${item?.title}`)  }}</div>
          </template>
          <template #content>
            <p class="m-0 text-center">{{ item?.content }}</p>
          </template>
        </Card>
    </div>
  </div>
</template>

<script setup>
import useRequest from "~/composables/useRequest";

definePageMeta({
  layout: "panel",
  middleware: "admin-guard",
});
// const { dashboard } = useRequest();
const pageData = ref([]);
onBeforeMount(() => {
  // dashboard().then((res) => {
  //   const pageObj = res.data?.data;
  //   console.log("res.data" , res.data?.data)
  //    for (const property in pageObj) {
  //     if(property == 'mobile') continue;
  //     console.log("property" ,property)
  //     pageData.value.push({
  //       title: property,
  //       content: pageObj[property],
  //     });
  //   }
  // }).catch((err)=>{
  //   console.error( err)
  // });
});
</script>

<style>
</style>