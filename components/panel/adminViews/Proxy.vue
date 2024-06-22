<template>
  <div class="pb-10 ">
    <div v-if="popup">

    </div>
    <div class=" mb-[30px] dark:text-[#fff] 2xl:px-[299px]">
        <div id="continents-holder" class="  overflow-hidden h-[41px] rounded-[50px] flex items-center border border-[#8ACBFA] dark:border-none dark:bg-[#0F426B]">
            <span   @click="()=>toggleProxyType('ipv4')" :class="`${global.currentProxy == 'ipv4' && 'active'} continent transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
                IPv4
            </span>
            <span   @click="()=>toggleProxyType('ipv6')" :class="`${global.currentProxy == 'ipv6' && 'active'} continent transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
              IPv6
            </span>
            <span   @click="()=>toggleProxyType('mix')" :class="`${global.currentProxy == 'mix' && 'active'} continent transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
                MIX
            </span >
            <span   @click="()=>toggleProxyType('isp')" :class="`${global.currentProxy == 'isp' && 'active'} continent transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
               ISP
            </span>
            <!-- <span   @click="()=>toggleProxyType('mobile')" :class="`${global.currentProxy == 'mobile' && 'active'} continent transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
                Mobile
            </span> -->
            <span   @click="()=>toggleProxyType('residential')" :class="`${global.currentProxy =='residential' && 'active'} continent transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
              Residential
            </span>
        </div>
    </div>
    <div
      class="px-0 flex justify-between flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4"
    >
      <!-- <button
        @click="() => openPopup('add')"
        class="rounded-md px-6 py-2 text-white bg-[#6fb7eb] dark:bg-[#0F426B] hover:bg-[#8ACBFA] hover:dark:bg-[#3b74a3] lg:px-8"
      >
        {{ t(`admin.actions.add_package`) }}
      </button> -->
      <!-- <form
        @submit.prevent="getUserProxyPackagesData"
        class="flex gap-2 flex-row-reverse"
        action=""
      >
        <input
          v-model="searchInput"
          :placeholder="$t(`admin.actions.search_package`)"
          class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-md px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
          type="text"
        />
        <button
          class="rounded-md px-6 py-2 text-white h-[50px] bg-[#6fb7eb] dark:bg-[#0F426B] hover:bg-[#8ACBFA] hover:dark:bg-[#3b74a3] lg:px-8"
          type="submit"
        >
          {{ $t(`admin.actions.search`) }}
        </button>
      </form> -->
    </div>
    <div class="min-h-[60vh] overflow-x-auto">
      <RegularDataTable
        :headers="headers"
        :rows="rows"
        page="manage-user-proxy-packages"
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
import RegularDataTable from "~/components/panel/RegularDataTable.vue";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";


const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const type = ref("");
const currentProxyPackage = ref("");
const popup = ref(false);
const { getUserProxyPackages } = useRequest();
const headers = ref([
  "package_name",
  "actions",
]);
const rows = ref([]);
const loadingData = ref(false)
const currentPage = ref(2);
const totalRecords = ref(1);
const searchInput = ref("");
const route = useRoute();
// const proxyType =ref('ipv4')


const toggleProxyType = ( type ) => {
  global.toggleProxyType(type)
}

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false)
};
const openPopup = (operationType, proxy) => {
  currentProxyPackage.value = proxy;
  type.value = operationType;
  global.changePopupState(true)
  popup.value = true;
};

const getUserProxyPackagesData = (page = 1) => {
  getUserProxyPackages(route.params.userId, global.currentProxy  , page, searchInput.value)
  .then(
    (res) => {
      totalRecords.value = res.data?.data?.count;
      const allProxyPackages = res.data?.data?.pakages;
      const handledProxyPackages = allProxyPackages.map((item) => {
        const dateString = item?.expirationsDate;
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
          .padStart(2, "0")}  ,  ${date
          .getDate()
          .toString()
          .padStart(2, "0")}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
        return [
          {
            id: item?.id,
            item: item?.package?.name,
            actions: true,
          },
          {
            id: item?.id,
            item: "action",
            actions: true,
            currentItem: {
              id: item?.id,
              name: item?.package?.name,
              type: item?.type,
            },
          },
        ];
      });
      rows.value = handledProxyPackages;
    }
  )
  .catch(console.error).finally(()=>{
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

watch(()=> global.currentProxy  , ()=>{
  getUserProxyPackagesData(1, global.currentProxy )
})
</script>
    
<style scoped>
.dark .active {
  color: #fff !important;
  background: var(--main-color) !important;
}
.light .active {
  color: #fff !important;
  background: #7ac1f4 !important;
}
</style>~/composables/useRequest