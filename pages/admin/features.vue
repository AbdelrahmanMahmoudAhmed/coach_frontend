<template>
  <div class=" pb-10">
    <div v-if="popup">
      <!-- <ManageFeatures :type="type" :currentFeature="currentFeature" @getFeaturesData="getFeaturesData" @closePopup="closePopup" /> -->
    </div>
    <div class="px-0  flex justify-between flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4">
      <button  @click="()=>openPopup('add')"         class="rounded-md px-6 font-[700] py-2 border border-[#6fb7eb] dark:bg-[#0F426B]  hover:bg-[#c6e3f7]  hover:dark:bg-[#3b74a3] lg:px-8"
>{{ t(`admin.actions.add_feature`) }}</button>

    </div>
    <div class="min-h-[60vh] overflow-x-auto ">
      <RegularDataTable :loadingData="loadingData" :headers="headers" :rows="rows" page="manage-features" @openPopup="openPopup" />
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
  const currentFeature = ref('');
  const loadingData = ref(false)

  const popup = ref(false)
  const { getAllFeatures } = useRequest();
  const headers = ref(["title_en", "title_ar", "icon","actions"]);
  const rows = ref([]);
  // const searchInput = ref('')
  
  const closePopup = ( ) => {
    popup.value = false
    global.changePopupState(false)
  }
  const openPopup = ( operationType , feature ) => {
    currentFeature.value = feature
    
 
    type.value = operationType
    global.changePopupState(true)
    popup.value = true
  }
  
  const getFeaturesData = ( ) => {
    getAllFeatures().then((res) => {
      const allFeatures = res.data?.data;
      const handeldFeatures = allFeatures.map((item) => {
        return [
          {
            id: item?.id,
            item: item?.title,
            isImg:false,
            actions: true
          },
          {
            id: item?.id,
            item: item?.titleAr,
            isImg:false,
            actions: true
  
          },
          {
            id: item?.id,
            item: item?.icon,
            isImg:true,
            actions: true
  
          },
          {
            id: item?.id,
            item: 'action',
            isImg:false,
            actions: true,
            currentItem:{
              id:item?.id,
              title: item?.title,
              titleAr: item?.titleAr,
              content:item?.content,
              contentAr:item?.contentAr,
              icon: item?.icon,
             
            },
         
  
          },
        ];
      });
      rows.value = handeldFeatures
    }).catch(console.error).finally(()=>{
    loadingData.value = true
  });
  
  
  }
  
  const handlePageChange = (e) =>{
      const page = e?.page + 1 || 1
      getFeaturesData(page)
  
    }
  
  //hooks
  onBeforeMount(() => {
    getFeaturesData()
  });
  
  </script>
  
  <style>
  </style>