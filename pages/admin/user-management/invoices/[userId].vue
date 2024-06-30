<template>
  <div class="pb-10">
    <div v-if="popup">
      <ManageInvoices
        :type="type"
        :currentUserInvoicesData="currentUserInvoicesData"
        @getUserInvoicesData="getUserInvoicesData"
        @closePopup="closePopup"
      />
    </div>
    <div
      class="px-0 flex justify-end flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4"
    >

      <form
        @submit.prevent="()=>searchUserInvoice()"
        class="flex gap-2 flex-row-reverse"
        action=""
      >
        <input
          v-model="searchInput"
          :placeholder="$t(`admin.actions.search_invoice`)"
          class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-md px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
          type="number"
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
        page="manage-user-invoices"
        @openPopup="openPopup"
        :dataFetched="dataFetched" 
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

import RegularDataTable from "~/components/panel/DataTable.vue";
import ManageInvoices from "~/components/panel/popups/ManageInvoices.vue";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";


const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const type = ref("");
const currentUserInvoicesData = ref("");
const popup = ref(false);
const dataFetched = ref(false)

const { getUserInvoices , searchInvoice } = useRequest();
const headers = ref([
  "package_name",
  "invoice_number",
  "invoice_date",
  "amount",
  "type",
  "status",
  "actions",
]);
const rows = ref([]);
const currentPage = ref(2);
const totalRecords = ref(1);
const searchInput = ref("");
const route = useRoute();

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false)

};
const openPopup = (operationType, invoices) => {
  currentUserInvoicesData.value = invoices;
  type.value = operationType;
  global.changePopupState(true)

  popup.value = true;
};



const getUserInvoicesData = (page = 1) => {
  getUserInvoices(route.params?.userId, page).then((res) => {
    totalRecords.value = res.data?.data?.count;

    const allInvoices = res.data?.data?.invoices;
    const handledInvoices = allInvoices.map((item) => {
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
          item: item?.packageName,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.id,
          actions: true,
        },
        {
          id: item?.id,
          item: formattedDate,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.amount,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.type,
          actions: true,
        },        {
          id: item?.id,
          item: item?.status == 'paid' ? 'admin.actions.paid' : 'admin.actions.not_paid',
          actions: true,
          withTranslate:true
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          currentItem: {
            id: item?.id,
            packageName: item?.packageName,
            createdAt: item?.createdAt,
            amount: item?.amount,
            type: item?.type,
            status: item?.status,
          },
          role: item?.role,
        },
      ];
    });
    rows.value = handledInvoices;
  });
};

const searchUserInvoice = ( ) => {


if( searchInput.value){
  searchInvoice(searchInput.value).then((res) => {

    const searchedInvoice = [res.data?.data];
    const handledInvoices = searchedInvoice.map((item) => {
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
          item: item?.packageName,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.id,
          actions: true,
        },
        {
          id: item?.id,
          item: formattedDate,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.amount,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.type,
          actions: true,
        },        {
          id: item?.id,
          item: item?.status == 'paid' ? 'admin.actions.paid' : 'admin.actions.not_paid',
          actions: true,
          withTranslate:true
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          currentItem: {
            id: item?.id,
            packageName: item?.packageName,
            createdAt: item?.createdAt,
            amount: item?.amount,
            type: item?.type,
            status: item?.status,
          },
          role: item?.role,
        },
      ];
    });
    rows.value = handledInvoices;
  }).catch(()=>{
    rows.value = [];
  }).finally(()=>{
    dataFetched.value = true
  });
}else{
  getUserInvoicesData()
}

}


const handlePageChange = (e) => {
  const page = e?.page + 1 || 1;
  getUserInvoicesData(page);
};

//hooks
onBeforeMount(() => {
  getUserInvoicesData();
});
</script>
    
    <style>
</style>