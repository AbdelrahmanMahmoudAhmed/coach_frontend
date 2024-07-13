<template>
  <div class="pb-10">
    <div v-if="popup">
<ManageCertifications :currentCertifications="currentCertifications" :type="type" @closePopup="closePopup" @getCertificationData="getCertificationData" />
    </div>
    <div v-if="detailsPopup">
      <WebsiteDetails :withImg="true" page="certification" :currentDetails="currentCertifications" @closePopup="closeDetailsPopup" />
    </div>

    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-certification"
        :withSearch=" false"
        :withAdd="global.user.websiteManagement"
        :addButtonTitle="t(`admin.actions.add_certification`)"
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
import ManageCertifications from "~/components/panel/popups/ManageCertifications";
import WebsiteDetails from "~/components/panel/popups/WebsiteDetails.vue";


const pagination = reactive({
  perPage: "",
  totalCount: "",
});
const type = ref("");
const detailsPopup = ref(false);
const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const currentCertifications = ref("");
const popup = ref(false);
const { getAllCertifications } = useRequest();
const headers = ref(["title_ar", "title_en","img", "details"]);
(global.user.websiteManagement  ) && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
const totalRecords = ref(100);

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (operationType, video) => {
  currentCertifications.value = video;
  type.value = operationType;
  popup.value = true;
};
const openDetailsPopup = ( progPackage) => {
  currentCertifications.value = progPackage;
  detailsPopup.value = true;
};
const closeDetailsPopup = ( ) => {
  detailsPopup.value = false;
};



const getCertificationData = async () => {
  dataFetched.value = false;

  try {
    const res = await getAllCertifications();
    totalRecords.value = res.data?.data?.count;



    pagination.totalCount = res.data.pagination?.totalCount;
    pagination.perPage = res.data.pagination?.perPage;

    const allCertification = res.data?.data;
    const handledCertification = allCertification.map((item) => {
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
            titleAr: item?.titleAr,
            titleEn: item?.titleEn,
            contentAr: item?.contentAr,
            contentEn: item?.contentEn,
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
            titleAr: item?.titleAr,
            titleEn: item?.titleEn,
            contentAr: item?.contentAr,
            contentEn: item?.contentEn,
            image: item?.image,
          }
        },
      ];
    });
    rows.value = handledCertification;
  } catch (err) {
    console.error(err);
  } finally {
    dataFetched.value = true;
  }
};

// hooks
onBeforeMount(() => {
  getCertificationData();
});



</script>

<style></style>
