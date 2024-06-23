<template>
  <div class="pb-10 ">
    <div v-if="popup">

    </div>

    <div
      class="px-0 gap-3 md:flex-row md:px-2 lg:px-4"
    >
    <h1  v-if="packageName" class="pt-8 text-center mb-[20px] font-bold text-[20px] md:text-[32px] 2xl:px-[299px]"> 
      {{ ` ${$t("table.headers.package_name")}  :    ${packageName} ` }}
    </h1>
    </div>
    <div class="min-h-[60vh] overflow-x-auto">
      <RegularDataTable
        :headers="headers"
        :rows="rows"
        page="show-details"
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
const loadingData = ref(false)

const { locale, locales, setLocale, t } = useI18n();
const type = ref("");
const currentVpsPackage = ref("");
const popup = ref(false);
const { getUserProxyPackages } = useRequest();
const headers = ref([
  "username",
  "password",
  "protocol",
  "ip",
  "port",
  "expiration_date",
  "status",
]);
const rows = ref([]);
const currentPage = ref(2);
const totalRecords = ref(1);
const searchInput = ref("");
const route = useRoute();
const proxyType =ref('ipv4')




const packageName = ref('')


const closePopup = () => {
  popup.value = false;
  global.changePopupState(false)
};
const openPopup = (operationType, payload) => {
  currentVpsPackage.value = payload;
  type.value = operationType;
  global.changePopupState(true)
  popup.value = true;
};

const getUserProxyPackagesData = (page = 1) => {
  getUserProxyPackages(route.params.userId, route.params?.packageType , page, searchInput.value).then(
    (res) => {


      totalRecords.value = res.data?.data?.count;
      const allProxyPackages = res.data?.data?.pakages?.find((item)=>{
        return item?.id == route.query?.id
      });
      packageName.value = allProxyPackages?.package?.name;

      // to get an array from items 
      // because the provider API returns the data some times as an array and some times as an object 
      const allItems = Array.isArray(allProxyPackages?.items) ? allProxyPackages?.items : Object.values(allProxyPackages?.items);
      
       const handledProxyPackages = allItems.map((item) => {
        return [
          {
            id: item?.id,
            item: item?.login,
            actions: false,
          },
          {
            id: item?.id,
            item: item?.password,
            actions: false,
          },
          {
            id: item?.id,
            item: item?.protocol,
            actions: false,
          },
          {
            id: item?.id,
            item: item?.ip,
            actions: false,
            copy:true,
          },
          {
            id: item?.id,
            item: item?.port_http,
            actions: false,
            copy:true,

          },
          {
            id: item?.id,
            item: item?.date_end,
            actions: false,
          },
          {
            id: item?.id,
            item: item?.status,
            actions: false,
          },       
        ];
      })
      
      rows.value = handledProxyPackages;


    }
  ).catch(console.error).finally(()=>{
    loadingData.value = true
  });
};

const handlePageChange = (e) => {
  const page = e?.page + 1 || 1;
  getUserProxyPackagesData(page);
};

//hooks
onBeforeMount(() => {
  getUserProxyPackagesData();
});

watch(()=> proxyType.value , ()=>{
  getUserProxyPackagesData(1, proxyType.value)
})
</script>
    
<style scoped>
.active {
  color: #fff !important;
  background: var(--main-color) !important;
}
</style>