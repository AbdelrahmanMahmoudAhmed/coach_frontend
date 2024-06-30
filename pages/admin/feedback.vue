<template>
  <div class=" pb-10">
    <div v-if="popup">
      <!-- <ManageFeedback :type="type" :currentFeedback="currentFeedback" @getFeedbacksData="getFeedbacksData" @closePopup="closePopup" /> -->
    </div>
    <div class="px-0  flex justify-between flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4">
      <button  @click="()=>openPopup('add')"         class="rounded-md px-6 font-[700] py-2 border border-[#6fb7eb] dark:bg-[--rows-color]  hover:bg-[#c6e3f7]  hover:dark:bg-[#3b74a3] lg:px-8"
>{{ t(`admin.actions.add_feedback`) }}</button>

    </div>
    <div class="min-h-[60vh] overflow-x-auto ">
      <RegularDataTable :dataFetched="dataFetched" :headers="headers" :rows="rows" page="manage-feedbacks" @openPopup="openPopup" />
    </div>

  
  </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "panel",
    middleware: "admin-guard",
  });
  
  import RegularDataTable from "~/components/panel/DataTable.vue";
  import useRequest from "~/composables/useRequest";
  import { useGlobalStore } from "~/stores/global";


const global = useGlobalStore();
  const { locale, locales, setLocale, t } = useI18n();
  const type = ref('');
  const currentFeedback = ref('');
  const dataFetched = ref(false)

  const popup = ref(false)
  const { getAllFeedback } = useRequest();
  const headers = ref(["name","img" ,"actions"]);
  const rows = ref([]);
  // const searchInput = ref('')
  
  const closePopup = ( ) => {
    popup.value = false
    global.changePopupState(false)
  }
  const openPopup = ( operationType , feedback ) => {
    currentFeedback.value = feedback
 
    type.value = operationType
    global.changePopupState(true)
    popup.value = true
  }
  
  const getFeedbacksData = ( ) => {
    getAllFeedback().then((res) => {
      const allFeedbacks = res.data?.data;
      const handeldFeedbacks = allFeedbacks.map((item) => {
        return [
          {
            id: item?.id,
            item: item?.name,
            isImg:false,
            actions: true
          },


          {
            id: item?.id,
            item: item?.image,
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
              name: item?.name,
              jobTitle: item?.jobTitle,
              content:item?.content,
              contentAr:item?.contentAr,
              image: item?.image,
            },
          },
        ];
      });
      rows.value = handeldFeedbacks
    }).catch(console.error).finally(()=>{
    dataFetched.value = true
  });
  
  
  }
  
  const handlePageChange = (e) =>{
      const page = e?.page + 1 || 1
      getFeedbacksData(page)
  
    }
  
  //hooks
  onBeforeMount(() => {
    getFeedbacksData()
  });
  
  </script>
  
  <style>
  </style>