<template>
  <div class="pb-10">
    <div v-if="popup">
      <ManageVps
        :type="type"
        :currentVps="currentVps"
        @getVpsData="getVpsData"
        @closePopup="closePopup"
      />
    </div>
    <div
      class="px-0 flex justify-between flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4"
    >
      <button
        @click="() => openPopup('add')"
        class="rounded-md px-6 font-[700] py-2 border border-[#6fb7eb] dark:bg-[--rows-color]  hover:bg-[#c6e3f7]  hover:dark:bg-[#3b74a3] lg:px-8"
      >
        {{ t(`admin.actions.add_vps`) }}
      </button>
      <form
      @submit.prevent="getVpsData"
        class="flex gap-2 flex-row-reverse"
        action=""
      >
        <input
      
          v-model="searchInput"
          :placeholder="$t(`admin.actions.search_vps`)"
          class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-md px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
          type="text"
        />
        <button
          class="rounded-md px-6 py-2 font-[700] h-[50px] border border-[#6fb7eb] dark:bg-[--rows-color] hover:bg-[#c6e3f7] hover:dark:bg-[#3b74a3] lg:px-8"
          type="submit"
        >
          {{ $t(`admin.actions.search`) }}
        </button>
      </form>
    </div>
    <div class="min-h-[60vh] overflow-x-auto">
      <RegularDataTable
        :headers="headers"
        :rows="rows"
        page="manage-vps"
        @openPopup="openPopup"
        :dataFetched="dataFetched" 
      />
    </div>

    <div dir="ltr" class=""     v-if="totalRecords > 10">
      <Paginator  v-model:first="currentPage"  @page="handlePageChange" :rows="10" :totalRecords="totalRecords" ></Paginator>
  
    </div>
  </div>
</template>
  
  <script setup>
definePageMeta({
  layout: "panel",
  middleware: "admin-guard",
});

import RegularDataTable from "~/components/panel/DataTable.vue";
import ManageVps from "~/components/panel/popups/ManageVps.vue";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";


const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const type = ref("");
const currentVps = ref("");

const popup = ref(false);
const { getVps } = useRequest();
const headers = ref(["package_name", "ram", "processor_core", "operating_system" , "actions"]);
const rows = ref([]);
const allData = ref();
const currentPage = ref(2);
const totalRecords = ref(1);
const searchInput = ref("");
const dataFetched = ref(false)


const closePopup = () => {
  popup.value = false;
  global.changePopupState(false)
};
const openPopup = (operationType, vps) => {
  currentVps.value = vps;
  type.value = operationType;
  global.changePopupState(true)
  popup.value = true;
};

const getVpsData = (page = 1) => {
  getVps(page, searchInput.value).then((res) => {
    totalRecords.value = res.data?.data?.count
    // totalRecords.value = res.data?.data?.count
    const allVps = res.data?.data?.packages;
    allData.value = allVps;
    const handelVps = allVps.map((item) => {
      return [
        {
          id: item?.id,
          item: item?.name,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.ram,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.cors,
          actions: true,
        },
        {
          id: item?.id,

     

          item: item?.os == "linux" ? "/imgs/ubuntu.svg" :  item?.os == "win" ? "/imgs/windows.svg" : "/imgs/unavailable.svg" ,
            actions: true,
            withImg: true,
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          currentItem: {
            id: item?.id,
            name: item?.name,
            ram: item?.ram,
            cors: item?.cors,
            hard: item?.hard,
            price: item?.price,
            features: item?.features,
            os:item?.os
          },
        },
      ];
    });
    rows.value = handelVps;
  }).catch(console.error).finally(()=>{
    dataFetched.value = true
  });
};

const handlePageChange = (e) => {
  const page = e?.page + 1 || 1;
  getVpsData(page);
};

//hooks
onBeforeMount(() => {
  getVpsData();
});
</script>
  
  <style>
</style>