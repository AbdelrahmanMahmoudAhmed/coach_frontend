<template>
  <div class="pb-10">
    <div v-if="popup">
<ManageBlogs :currentBlog="currentBlog" :type="type" @closePopup="closePopup" @getBolgsData="getBolgsData" />
    </div>
    <div v-if="detailsPopup">
      <WebsiteDetails page="blog" :withImg="true" :currentDetails="currentBlog" @closePopup="closeDetailsPopup" />
    </div>

    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-blogs"
        :withSearch="false"
        :withAdd="global.user.websiteManagement"
        :searchPlaceholder="$t(`admin.actions.search_blog`)"
        :addButtonTitle="t(`admin.actions.add_blog`)"
        @changeQuery="changeQuery"
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
import ManageBlogs from "~/components/panel/popups/ManageBlogs";
import WebsiteDetails from "~/components/panel/popups/WebsiteDetails.vue";

const query = reactive({
  page: 1,
  search: "",
});
const pagination = reactive({
  perPage: "",
  totalCount: "",
});
const type = ref("");
const detailsPopup = ref(false);
const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const currentBlog = ref("");
const popup = ref(false);
const { getAllBolgs } = useRequest();
const headers = ref(["title_ar", "title_en","created_at", "details"]);
(global.user.websiteManagement  ) && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
const totalRecords = ref(100);

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (operationType, video) => {
  currentBlog.value = video;
  type.value = operationType;
  popup.value = true;
};
const openDetailsPopup = ( progPackage) => {
  currentBlog.value = progPackage;
  detailsPopup.value = true;
};
const closeDetailsPopup = ( ) => {
  detailsPopup.value = false;
};



const changeQuery = (type, val) => {
  const types = ["page", "search"];

  if (typeof type == "string" && types.includes(type)) query[type] = val;
};
const getBolgsData = async () => {
  dataFetched.value = false;

  try {
    const res = await getAllBolgs(query);
    totalRecords.value = res.data?.data?.count;

    query.page = res.data.pagination?.currentPage;

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
          item: item?.createdAt,
          isDate:true
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
            link: item?.link,
            image:item?.image,
            contentAr:item?.contentAr,
            contentEn:item?.contentEn,
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
            contentAr:item?.contentAr,
            contentEn:item?.contentEn,
            link: item?.link,
            image:item?.image,
            type:item?.type,
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
  getBolgsData();
});

watch(
  () => query.page,
  () => {
    getBolgsData(query);
  }
);
watch(
  () => query.search,
  () => {
    getBolgsData(query);
  }
);
</script>

<style></style>
