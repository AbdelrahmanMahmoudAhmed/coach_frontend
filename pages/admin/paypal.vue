<template>
  <div class="pb-10">
    <div v-if="popup">
 
    </div>
    <div
      class="px-0 flex justify-end flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4"
    >
      <!-- <button  @click="()=>openPopup('add')" class=" rounded-md px-6 py-2 text-white bg-[#6fb7eb] dark:bg-[#0F426B] hover:bg-[#8ACBFA] hover:dark:bg-[#3b74a3] lg:px-8">{{ t(`admin.actions.add_admin`) }}</button> -->
      <form
        @submit.prevent="getPaypalRequestsData"
        class="flex gap-2 flex-row-reverse"
        action=""
      >
        <input
          v-model="searchInput"
          :placeholder="$t(`admin.actions.search_paypal`)"
          class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-md px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
          type="text"
        />
        <button
        class="rounded-md px-6 py-2 font-[700] h-[50px] border border-[#6fb7eb] dark:bg-[#0F426B] hover:bg-[#c6e3f7] hover:dark:bg-[#3b74a3] lg:px-8"
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
        page="manage-paypal"
        @openPopup="openPopup"
        :loadingData="loadingData" 
      />
    </div>

    <div     v-if="totalRecords > 10" dir="ltr" class="">
      <Paginator
        v-model:first="currentPage"
        @page="handlePageChange"
        :rows="10"
        :totalRecords="totalRecords"
      ></Paginator>
    </div>
  </div>
</template>
  
  <script setup>
definePageMeta({
  layout: "panel",
  middleware: "admin-guard",
});

import RegularDataTable from "~/components/panel/RegularDataTable.vue";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";


const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const type = ref("");
const currentRequest = ref("");
const popup = ref(false);
const { getPaypalRequests } = useRequest();
const headers = ref(["name", "paypal_email", "amount", "date", "actions"]);
const rows = ref([]);
const currentPage = ref(2);
const totalRecords = ref(1);
const searchInput = ref("");
const loadingData = ref(false)

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false)

};
const openPopup = (operationType, request) => {

  currentRequest.value = request;
  type.value = operationType;
  global.changePopupState(true)

  popup.value = true;
};

const getPaypalRequestsData = (page = 1) => {
  getPaypalRequests(page, searchInput.value).then((res) => {
    totalRecords.value = res.data?.data?.count;
    const allrequests = res.data?.data?.requests;
    const handelrequests = allrequests.map((item) => {
      const dateString = item?.createdAt;
      const date = new Date(dateString);

      // Format the date as "YYYY-MM-DD HH:MM:SS"
      const formattedDate = `${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date
        .getSeconds()
        .toString()
        .padStart(2, "0")}  ,  ${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
      return [
        {
          id: item?.id,
          item: item?.userName,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.email,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.amount,
          actions: true,
        },
        {
          id: item?.id,
          item:formattedDate,
          actions: true,
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          currentItem: {
            id: item?.id,
            userName: item?.userName,
            email: item?.email,
            amount: item?.amount,
            createdAt: item?.createdAt,
          },
        },
      ];
    });
    rows.value = handelrequests;
  }).catch(console.error).finally(()=>{
    loadingData.value = true
  });
};

const handlePageChange = (e) => {
  const page = e?.page + 1 || 1;
  getPaypalRequestsData(page);
};

//hooks
onBeforeMount(() => {
  getPaypalRequestsData();
});
</script>
  
  <style>
</style>