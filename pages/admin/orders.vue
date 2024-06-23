<template>
  <div class=" pb-10">
    <div v-if="popup">
    </div>
    <div class="px-0  flex justify-end flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4">
      <!-- <button  @click="()=>openPopup('add')" class=" rounded-md px-6 py-2 text-white bg-[#6fb7eb] dark:bg-[#0F426B] hover:bg-[#8ACBFA] hover:dark:bg-[#3b74a3] lg:px-8">{{ t(`admin.actions.add_admin`) }}</button> -->
      <form @submit.prevent="getOrdersData" class="flex gap-2 flex-row-reverse" action="">
        <input
                v-model="searchInput"
                :placeholder=" $t(`admin.actions.search_order`) "
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-md px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text"
              />
              <button         class="rounded-md px-6 py-2 font-[700] h-[50px] border border-[#6fb7eb] dark:bg-[#0F426B] hover:bg-[#c6e3f7] hover:dark:bg-[#3b74a3] lg:px-8"
 type="submit">
                {{ $t(`admin.actions.search`) }}
              </button>
      </form>
    </div>
    <div class="min-h-[60vh] overflow-x-auto ">
      <RegularDataTable :loadingData="loadingData"  :headers="headers" :rows="rows" page="manage-orders" @openPopup="openPopup" />
    </div>
  
    <div     v-if="totalRecords > 10" dir="ltr" class="">
      <Paginator  v-model:first="currentPage"  @page="handlePageChange" :rows="10" :totalRecords="totalRecords" ></Paginator>
  
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
  const type = ref('');
  const currentOrder = ref('');
  const popup = ref(false)
  const { getAdminOrders } = useRequest();
  const headers = ref(["name", "to_packages", "type", "price", "status" , "actions"]);
  const rows = ref([]);
  const currentPage =ref(2);
  const totalRecords = ref(1);
  const searchInput = ref('')
  const loadingData = ref(false)
  
  const closePopup = ( ) => {
    popup.value = false
    global.changePopupState(false)
  }
  const openPopup = ( operationType , order ) => {
    currentOrder.value = order
    type.value = operationType
    popup.value = true
    global.changePopupState(true)
  }
  
  const getOrdersData = ( page = 1 ) => {
    getAdminOrders(page , searchInput.value).then((res) => {
      totalRecords.value = res.data?.data?.count
  
      const AllOrders = res.data?.data?.orders;
      const handledOrders = AllOrders.map((item) => {
        return [
          {
            id: item?.id,
            item: item?.userName,
            actions: true
          },
          {
            id: item?.id,
            item: item?.package?.name,
            actions: true
  
          },
          {
            id: item?.id,
            item: item?.packageType,
            actions: true
  
          },
          {
            id: item?.id,
            item: item?.totalPrice,
            actions: true
  
          },
          {
            id: item?.id,
            item: item?.status,
            actions: true
  
          },
          {
            id: item?.id,
            item: 'action',
            actions: true,
            currentItem:{
              id:item?.id,
              userName: item?.userName,
              name: item?.package?.name,
              packageType: item?.packageType,
              totalPrice: item?.totalPrice,
              status: item?.status,
            
            },
            role:item?.role
  
          },
        ];
      });
      rows.value = handledOrders
    }).catch(console.error).finally(()=>{
    loadingData.value = true
  });
  
  
  }
  
  const handlePageChange = (e) =>{
      const page = e?.page + 1 || 1
      getOrdersData(page)
  
    }
  
  //hooks
  onBeforeMount(() => {
    getOrdersData()
  });
  
  </script>
  
  <style>
  </style>