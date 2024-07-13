<template>
  <div class="pb-10">
    <div v-if="popup">
<ManageTransformations  :currentTransformation="currentTransformation" :type="type" @closePopup="closePopup" @getTransformationsData="getTransformationsData" />
    </div>
    <div v-if="detailsPopup">
      <WebsiteDetails :withImg="true" page="transformation" :currentDetails="currentTransformation" @closePopup="closeDetailsPopup" />
    </div>

    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-transformation"
        :withSearch="fasle"
        :withAdd="global.user.websiteManagement"
        :addButtonTitle="t(`admin.actions.add_transformation`)"
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
import ManageTransformations from "~/components/panel/popups/ManageTransformations";
import WebsiteDetails from "~/components/panel/popups/WebsiteDetails.vue";


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
const currentTransformation = ref("");
const popup = ref(false);
const { getAllTransformations } = useRequest();
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
  currentTransformation.value = video;
  type.value = operationType;
  popup.value = true;
};
const openDetailsPopup = ( progPackage) => {
  currentTransformation.value = progPackage;
  detailsPopup.value = true;
};
const closeDetailsPopup = ( ) => {
  detailsPopup.value = false;
};

const changeQuery = (type, val) => {
  const types = ["page", "search"];

  if (typeof type == "string" && types.includes(type)) query[type] = val;
};

const getTransformationsData = async () => {
  dataFetched.value = false;
  try {
    const res = await getAllTransformations(query);
    totalRecords.value = res.data?.data?.count;

    pagination.totalCount = res.data.pagination?.totalCount;
    pagination.perPage = res.data.pagination?.perPage;

    const allTransformations = res.data?.data;
    const handledTransformation = allTransformations.map((item) => {
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
    rows.value = handledTransformation;
  } catch (err) {
    console.error(err);
  } finally {
    dataFetched.value = true;
  }
};

// hooks
onBeforeMount(() => {
  getTransformationsData();
});



</script>

<style></style>
