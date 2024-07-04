<template>
  <div class="pb-10">
    <div v-if="popup">
<ManagePackages :currentPackage="currentPackage" :type="type" @closePopup="closePopup" @getPackagesData="getPackagesData" />
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
            class="text-white bg-[--third-color] rounded-md px-4 py-2 lg:px-6 hover:bg-[#265b87] disabled:bg-[#419de9]"
          >
            {{ t(`table.headers.edit`) }}
          </button>

          <button
          v-if="global.user.allowDelete"
            @click="() => openPopup('delete', rowData?.currentItem)"
            class="text-white bg-red-800 rounded-md px-4 py-2 hover:bg-red-600 disabled:bg-[#cc6c6c] lg:px-6"
          >
            {{ $t(`table.headers.delete`) }}
          </button>
        </template>

        <template  #details="{rowData}">
          
          <button
          v-if="global.user"
            @click="() => openPopup('edit', rowData?.currentItem)"
            class="text-white bg-[--third-color] rounded-md px-4 py-2 lg:px-6 hover:bg-[#265b87] disabled:bg-[#419de9]"
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
import ManagePackages from "~/components/panel/popups/ManagePackages"

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
const { getAllPackages } = useRequest();
const headers = ref(["title_ar", "title_en","discountPercentage" , "price", "img","details"]);
(global.user.allowDelete || global.user.allowEdit ) && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
console.log("global.user" , global.user)
const currentPage = ref(2);
const totalRecords = ref(100);
const searchInput = ref("");

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (operationType, admin) => {
  currentPackage.value = admin;
  type.value = operationType;
  // global.changePopupState(true);
  popup.value = true;
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

    const allAdmins = res.data?.data;
    const handeldAdmins = allAdmins.map((item) => {
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
          item: `${item?.discountPercentage}%`,
        },
        {
          id: item?.id,
          item: item?.price,
        },
        {
          id: item?.id,
          item: item.image,
          isImg: true,
        },
        {
          id: item?.id,
          item: null,
          isSlot: true,
          slotName:"details"
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
