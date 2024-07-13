<template>
  <div class="pb-10">
    <div v-if="popup">
<ManageVideos :currentVideos="currentVideos" :type="type" @closePopup="closePopup" @getVideoData="getVideoData" />
    </div>
    <div v-if="detailsPopup">
      <WebsiteDetails page="video" :currentDetails="currentVideos" @closePopup="closeDetailsPopup" />
    </div>

    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-videos"
        :withSearch=" false"
        :withAdd="global.user.websiteManagement"
        :searchPlaceholder="$t(`admin.actions.search_video`)"
        :addButtonTitle="t(`admin.actions.add_video`)"
        @openPopup="openPopup"
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
import ManageVideos from "~/components/panel/popups/ManageVideos";
import WebsiteDetails from "~/components/panel/popups/WebsiteDetails.vue";


const pagination = reactive({
  perPage: "",
  totalCount: "",
});
const type = ref("");
const detailsPopup = ref(false);
const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const currentVideos = ref("");
const popup = ref(false);
const { getAllVideos } = useRequest();
const headers = ref(["title_ar", "title_en","link", "details"]);
(global.user.websiteManagement  ) && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
const totalRecords = ref(100);

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (operationType, video) => {
  currentVideos.value = video;
  type.value = operationType;
  popup.value = true;
};
const openDetailsPopup = ( progPackage) => {
  currentVideos.value = progPackage;
  detailsPopup.value = true;
};
const closeDetailsPopup = ( ) => {
  detailsPopup.value = false;
};



const getVideoData = async () => {
  dataFetched.value = false;

  try {
    const res = await getAllVideos();
    totalRecords.value = res.data?.data?.count;



    pagination.totalCount = res.data.pagination?.totalCount;
    pagination.perPage = res.data.pagination?.perPage;

    const allVideos = res.data?.data;
    const handeldVideos = allVideos.map((item) => {
      return [
        {
          id: item?.id,
          item: item?.titleAr,
        },
        {
          id: item?.id,
          item: item?.titleEn,
        },
 
        {
          id: item?.id,
          item: item?.link,
        },
        {
          id: item?.id,
          item: null,
          isSlot: true,
          slotName:"details",
          currentItem: {
            id: item?.id,
            titleAr: item?.titleAr,
            titleEn: item?.titleEn,
            descriptionAr: item?.descriptionAr,
            descriptionEn: item?.descriptionEn,
            link: item?.link,
          }
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          hideTd:global.user?.role == 'admin',
          currentItem: {
            id: item?.id,
            titleAr: item?.titleAr,
            titleEn: item?.titleEn,
            descriptionAr: item?.descriptionAr,
            descriptionEn: item?.descriptionEn,
            link: item?.link,
          }
        },
      ];
    });
    rows.value = handeldVideos;
  } catch (err) {
    console.error(err);
  } finally {
    dataFetched.value = true;
  }
};

// hooks
onBeforeMount(() => {
  getVideoData();
});



</script>

<style></style>
