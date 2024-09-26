<template>
    <div class="pb-10">
      <div v-if="popup">
  <ManageTestimonilas  :currentTestimonila="currentTestimonila" :type="type" @closePopup="closePopup" @getTestimonialsData="getTestimonialsData" />
      </div>
      <div v-if="detailsPopup">
        <WebsiteDetails :withImg="true" page="testimonial" :currentDetails="currentTestimonila" @closePopup="closeDetailsPopup" />
      </div>
      <Title title="testimonial" />
  
      <div class="min-h-[60vh] overflow-x-auto">
        <DataTable
          :pagination="pagination"
          :dataFetched="dataFetched"
          :headers="headers"
          :rows="rows"
          page="manage-testimonial"
          :withSearch="fasle"
          :withAdd="global.user.websiteManagement"
          :addButtonTitle="t(`admin.actions.add_testimonial`)"
          @openPopup="openPopup"
          @changeQuery="changeQuery"
  
        >
          <template v-if=" global.user.websiteManagement" #actions="{rowData}">
            <button
            v-if="global.user.websiteManagement"
              @click="() => openPopup('edit', rowData?.currentItem)"
              class="panel-table-action"
            >
              {{ t(`table.headers.edit`) }}
            </button>
            <button
            v-if="global.user.websiteManagement"
              @click="() => openPopup('delete', rowData?.currentItem)"
              class="panel-table-delete"
            >
              {{ $t(`table.headers.delete`) }}
            </button>
          </template>
          <template  #details="{rowData}">
            
            <button
            v-if="global.user"
              @click="() => openDetailsPopup(rowData?.currentItem)"
              class="panel-table-action"
            >
              {{ t(`table.headers.details`) }}
            </button>
  
  
          </template>
        </DataTable>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "panel",
    middleware: "admin-guard",
  });
  
  import DataTable from "~/components/panel/DataTable.vue";
  import useRequest from "~/composables/useRequest";
  import { useGlobalStore } from "~/stores/global";
  import ManageTestimonilas from "~/components/panel/popups/ManageTestimonilas";
  import WebsiteDetails from "~/components/panel/popups/WebsiteDetails.vue";
  import Title from "~/components/panel/Title.vue"
  
  
  const pagination = reactive({
    perPage: "",
    totalCount: "",
  });
  const query = reactive({
    page: 1,
    search: "",
  });
  
  const type = ref("");
  const detailsPopup = ref(false);
  const global = useGlobalStore();
  const { locale, locales, setLocale, t } = useI18n();
  const currentTestimonila = ref("");
  const popup = ref(false);
  const { getAllTestimonials } = useRequest();
  const headers = ref(["id" , "img", "details"]);
  (global.user.websiteManagement  ) && (headers.value = ([...headers.value , "actions"  ]))
  const rows = ref([]);
  const dataFetched = ref(false);
  const totalRecords = ref(100);
  
  const closePopup = () => {
    popup.value = false;
    global.changePopupState(false);
  };
  const openPopup = (operationType, video) => {
    currentTestimonila.value = video;
    type.value = operationType;
    popup.value = true;
  };
  const openDetailsPopup = ( progPackage) => {
    currentTestimonila.value = progPackage;
    detailsPopup.value = true;
  };
  const closeDetailsPopup = ( ) => {
    detailsPopup.value = false;
  };
  
  const changeQuery = (type, val) => {
    const types = ["page", "search"];
  
    if (typeof type == "string" && types.includes(type)) query[type] = val;
  };
  
  const getTestimonialsData = async () => {
    dataFetched.value = false;
    try {
      const res = await getAllTestimonials(query);
      totalRecords.value = res.data?.data?.count;
  
      pagination.totalCount = res.data.pagination?.totalCount;
      pagination.perPage = res.data.pagination?.perPage;
  
      const allTestimonials = res.data?.data;
      const handledTestimonial = allTestimonials.map((item) => {
        return [
        {
            id: item?.id,
            item: item?.id,
          },
   
          {
            id: item?.id,
            item: item?.image,
            isImg:true
          },
          {
            id: item?.id,
            item: null,
            isSlot: true,
            slotName:"details",
            currentItem: {
              id: item?.id,
              descriptionAr: item?.descriptionAr,
              descriptionEn: item?.descriptionEn,
              image: item?.image,
            }
          },
          {
            id: item?.id,
            item: "action",
            actions: true,
            hideTd:global.user?.role == 'admin',
            currentItem: {
              id: item?.id,
              descriptionAr: item?.descriptionAr,
              descriptionEn: item?.descriptionEn,
              image: item?.image,
            }
          },
        ];
      });
      rows.value = handledTestimonial;
    } catch (err) {
      console.error(err);
    } finally {
      dataFetched.value = true;
    }
  };
  
  // hooks
  onBeforeMount(() => {
    getTestimonialsData();
  });
  
  
  
  </script>
  
  <style></style>
  