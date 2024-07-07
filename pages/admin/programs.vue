<template>
  <div class="pb-10">
    <di v-if="popup">
<ManagePackages :currentPackage="currentPackage" :type="type" @closePopup="closePopup" @getPackagesData="getPackagesData" />
    </di>
    <div v-if="detailsPopup">
      <DisplayPackageDetails page="package" :currentPackage="currentPackage" @closePopup="closeDetailsPopup" />
    </div>

    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-admins"
        :withSearch=" true"
        :withAdd="global.user.allowEdit"
        :searchPlaceholder="$t(`admin.actions.search_package`)"
        :addButtonTitle="t(`admin.actions.add_package`)"
        @changeQuery="changeQuery"
        @openPopup="openPopup"
      >
        <template v-if=" global.user.allowEdit" #actions="{rowData}">
          
          <button
          v-if="global.user.allowEdit"
            @click="() => openPopup('edit', rowData?.currentItem)"
            class="panel-table-action"
          >
            {{ t(`table.headers.edit`) }}
          </button>

          <button
          v-if="global.user.allowDelete"
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
import ManagePackages from "~/components/panel/popups/ManagePackages";
import DisplayPackageDetails from "~/components/panel/popups/DisplayDetails.vue";

const query = reactive({
  page: 1,
  search: "",
});
const pagination = reactive({
  perPage: "",
  totalCount: "",
});
const type = ref("");

const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const currentPackage = ref("");
const popup = ref(false);
const detailsPopup = ref(false);
const { getAllPackages } = useRequest();
const headers = ref(["title_ar", "title_en","img" , "price", "discountPercentage","details"]);
(global.user.allowDelete || global.user.allowEdit ) && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
const totalRecords = ref(100);

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (operationType, progPackage) => {
  currentPackage.value = progPackage;
  type.value = operationType;
  popup.value = true;
};

const openDetailsPopup = ( progPackage) => {
  currentPackage.value = progPackage;
  detailsPopup.value = true;
};
const closeDetailsPopup = ( ) => {
  detailsPopup.value = false;
};

const changeQuery = (type, val) => {
  const types = ["page", "search"];

  if (typeof type == "string" && types.includes(type)) query[type] = val;
};
const getPackagesData = async () => {
  dataFetched.value = false;

  try {
    const res = await getAllPackages(query);
    totalRecords.value = res.data?.data?.count;

    query.page = res.data.pagination?.currentPage;

    pagination.totalCount = res.data.pagination?.totalCount;
    pagination.perPage = res.data.pagination?.perPage;

    const allPrograms = res.data?.data;
    const handeldAdmins = allPrograms.map((item) => {
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
          isImg: true,
        },
 
        {
          id: item?.id,
          item: item.price,
        },
        {
          id: item?.id,
          item: `${item?.discountPercentage}%`,
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
            period: item?.period,
            discountPercentage: item?.discountPercentage,
            image:item.image,
            price: item?.price,
            PackageFeatures:item.PackageFeatures
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
            discountPercentage: item?.discountPercentage,
            image:item.image,
            price: item?.price,
            period: item?.period,
            descriptionAr: item?.descriptionAr,
            descriptionEn: item?.descriptionEn,
            PackageFeatures:item.PackageFeatures

          }
        },
        
    
      ];
    });
    rows.value = handeldAdmins;
  } catch (err) {
    console.error(err);
  } finally {
    dataFetched.value = true;
  }
};

// hooks
onBeforeMount(() => {
  getPackagesData();
});

watch(
  () => query.page,
  () => {
    getPackagesData(query);
  }
);
watch(
  () => query.search,
  () => {
    getPackagesData(query);
  }
);
</script>

<style></style>
