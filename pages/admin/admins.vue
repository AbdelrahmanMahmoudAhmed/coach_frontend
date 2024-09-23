<template>
  <div class="pb-10">
    <div v-if="popup">
<ManageAdmins :currentAdmin="currentAdmin" :type="type" @closePopup="closePopup" @getAdminsData="getAdminsData" />
    </div>
    <Title title="admins_management" />

    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-admins"
        :withSearch=" true"
        :withAdd=" global.user?.role == 'superAdmin'"
        :searchPlaceholder="$t(`admin.actions.search_admin`)"
        :addButtonTitle="t(`admin.actions.add_admin`)"
        @changeQuery="changeQuery"
        @openPopup="openPopup"
      >
        <template v-if=" global.user?.role == 'superAdmin'" #actions="{rowData}">
          
          <button
            @click="() => openPopup('edit', rowData?.currentItem)"
            class="panel-table-action"
            :disabled="rowData?.currentItem.id == 1 || rowData?.currentItem.id == global.user?.id"
          >
            {{ t(`table.headers.edit`) }}
          </button>

          <button
          :disabled="rowData?.currentItem.id == 1 || rowData?.currentItem.id == global.user?.id"
            @click="() => openPopup('delete', rowData?.currentItem)"
            class="panel-table-delete"
          >
            {{ $t(`table.headers.delete`) }}
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
import ManageAdmins from "~/components/panel/popups/ManageAdmins"
import Title from "~/components/panel/Title.vue"

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
const currentAdmin = ref("");
const popup = ref(false);
const { getAllAdmins } = useRequest();
const headers = ref(["name", "email", "img", "role", "allow_edit", "allow_delete", "manage_website"]);
global.user.role == 'superAdmin' && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
const totalRecords = ref(100);

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (operationType, admin) => {
  currentAdmin.value = admin;
  type.value = operationType;
  popup.value = true;
};

const changeQuery = (type, val) => {
  const types = ["page", "search"];

  if (typeof type == "string" && types.includes(type)) query[type] = val;
};
const getAdminsData = async () => {
  dataFetched.value = false;

  try {
    const res = await getAllAdmins(query);
    totalRecords.value = res.data?.data?.count;

    query.page = res.data.pagination?.currentPage;

    pagination.totalCount = res.data.pagination?.totalCount;
    pagination.perPage = res.data.pagination?.perPage;

    const allAdmins = res.data?.data;
    const handeldAdmins = allAdmins.map((item) => {
      return [
        {
          id: item?.id,
          item: item?.name,
        },
        {
          id: item?.id,
          item: item?.email,
        },
        {
          id: item?.id,
          item: item.image,
          isImg: true,
        },
        {
          id: item?.id,
          item: item.role ,
          withTranslate:true
        },
        {
          id: item?.id,
          item: item.allowEdit,
          isBoolean: true,
        },
        {
          id: item?.id,
          item: item.allowDelete,
          isBoolean: true,
        },
        {
          id: item?.id,
          item: item.websiteManagement,
          isBoolean: true,
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          hideTd:global.user?.role == 'admin',
          currentItem: {
            id: item?.id,
            name: item?.name,
            email: item?.email,
            phone: item?.phone,
            image:item.image,
            role: item?.role,
            allowEdit:item.allowEdit,
            allowDelete:item.allowDelete,
            websiteManagement:item.websiteManagement,

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
  getAdminsData();
});

watch(
  () => query.page,
  () => {
    getAdminsData(query);
  }
);
watch(
  () => query.search,
  () => {
    getAdminsData(query);
  }
);
</script>

<style></style>
