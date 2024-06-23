<template>
  <div class="pb-10">
    <div v-if="popup">
      <ManageProxy
        :type="type"
        :currentProxy="currentProxy"
        :proxyType="proxyType"
        @getProxyData="getProxyData"
        @closePopup="closePopup"
        :currentPage=" currentPage"
      />
    </div>
    <div class=" mb-[30px] dark:text-[#fff] 2xl:px-[299px]">
      <div class="  overflow-hidden h-[41px] rounded-[50px] flex items-center border border-[#8ACBFA] dark:border-none dark:bg-[#0F426B]">
          <span   @click="()=>toggleProxyType('all')" :class="`${filteredType == 'all' && 'active'} transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
                {{ $t('global.all') }}
            </span>
            <span   @click="()=>toggleProxyType('ipv4')" :class="`${filteredType == 'ipv4' && 'active'} transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
                IPv4
            </span>
            <span   @click="()=>toggleProxyType('ipv6')" :class="`${filteredType == 'ipv6' && 'active'} transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
              IPv6
            </span>
            <span   @click="()=>toggleProxyType('mix')" :class="`${filteredType == 'mix' && 'active'} transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
                MIX
            </span >
            <span   @click="()=>toggleProxyType('isp')" :class="`${filteredType == 'isp' && 'active'} transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
               ISP
            </span>
            <!-- <span   @click="()=>toggleProxyType('mobile')" :class="`${filteredType == 'mobile' && 'active'} transition-all text-center h-full flex items-center justify-center flex-1 cursor-pointer text-[8px] xs:text-[12px] sm:text-[14px] md:text-[18px]`">
                Mobile
            </span> -->
            

        </div>
    </div>
    <div
      class="px-0 flex justify-between flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4"
    >
      <button
        @click="() => openPopup('add')"
        class="rounded-md px-6 font-[700] py-2 border border-[#6fb7eb] dark:bg-[#0F426B]  hover:bg-[#c6e3f7]  hover:dark:bg-[#3b74a3] lg:px-8"
      >
        {{ t(`admin.actions.add_proxy`) }}
      </button>
      <form
      @submit.prevent="getProxyData"
        class="flex gap-2 flex-row-reverse"
        action=""
      >
        <input
          v-model="searchInput"
          :placeholder="$t(`admin.actions.search_proxy`)"
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
        page="manage-proxy"
        @openPopup="openPopup"
        :loadingData="loadingData" 
      />
    </div>

    <div dir="ltr" class=""     v-if="totalRecords > 10 && resetPaginator && filteredType == 'all'">
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
import ManageProxy from "~/components/panel/popups/ManageProxy.vue";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";


const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const type = ref("");
const currentProxy = ref("");
const popup = ref(false);
const { getProxy } = useRequest();
const headers = ref(["package_name", "number_ips", "bandwidth", "type" , "actions"]);
const rows = ref([]);
const allData = ref();
const currentPage = ref(2);
const totalRecords = ref(1);
const searchInput = ref("");
const proxyType = ref('');
const filteredType = ref('all')
const loadingData = ref(false);
const resetPaginator =ref(true);

const toggleProxyType = ( type ) => {
  if(type != filteredType.value){
  filteredType.value = type
    resetPaginator.value = false
    getProxyData()

  }
}

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false)

};
const openPopup = (operationType, proxy) => {
  currentProxy.value = proxy;
  type.value = operationType;
  global.changePopupState(true)
  

  proxyType.value = currentProxy.value?.type;

  popup.value = true;
};

const getProxyData = (page =1 ) => {
  getProxy(page ,searchInput.value , filteredType.value == 'all' ? '' : filteredType.value).then((res) => {
    totalRecords.value = res.data?.data?.count
    const allProxies = res.data?.data?.packages ? res.data?.data?.packages : res.data?.data;
    allData.value = allProxies;
    resetPaginator.value = true;

    console.log("res.data?.data?" , res.data?.data)

    const handelProxies = allProxies.map((item) => {
      return [
        {
          id: item?.id,
          item: item?.name,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.ipsNumber,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.bandwidth,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.type,
          actions: true,
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          currentItem: {
            id: item?.id,
            name: item?.name,
            ipsNumber: item?.ipsNumber,
            bandwidth: item?.bandwidth,
            type: item?.type,
            features: item?.features,
          },
        },
      ];
    });


    

    rows.value = handelProxies;
  }).catch(console.error).finally(()=>{
    loadingData.value = true
  });
};

const handlePageChange = (e) => {
  const page = e?.page + 1 || 1;
  getProxyData(page);
};

//hooks
onBeforeMount(() => {
  getProxyData(1);
});
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
</style>