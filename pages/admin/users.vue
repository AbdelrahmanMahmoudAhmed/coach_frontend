<template>
  <div class="pb-10">
    <div v-if="popup">
<ManageClients :currentClient="currentClient" :type="type" @closePopup="closePopup" @getAdminsData="getAdminsData" />
    </div>
    <div v-if="detailsPopup">
      <UsersDetails  :currentClient="currentClient" @closePopup="closeDetailsPopup" />
    </div>


    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-clients"
        :withSearch=" true"
        :withAdd=" global.user?.role == 'superAdmin'"
        :searchPlaceholder="$t(`admin.actions.search_client`)"
        :addButtonTitle="t(`admin.actions.add_client`)"
        @changeQuery="changeQuery"
        @openPopup="openPopup"
      >
        <template v-if=" global.user?.role == 'superAdmin'" #actions="{rowData}">
          
          <button
            @click="() => openPopup('edit', rowData?.currentItem)"
            class="panel-table-action"
          >
            {{ t(`table.headers.edit`) }}
          </button>

          <button
            @click="() => openPopup('delete', rowData?.currentItem)"
            class="panel-table-delete"
          >
            {{ $t(`table.headers.delete`) }}
          </button>
        </template>

        <template  #product="{rowData}">
          
          <button
          v-if="global.user"
            @click="() => openDetailsPopup(rowData?.currentItem)"
            class="panel-table-action"
          >
            {{ t(`table.headers.client_product`) }}
          </button>


        </template>
        <template  #package="{rowData}">
          
          <button
          v-if="global.user"
            @click="() => openDetailsPopup(rowData?.currentItem)"
            class="panel-table-action"
          >
            {{ t(`table.headers.client_package`) }}
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
import ManageClients from "~/components/panel/popups/ManageClients"
import UsersDetails from "~/components/panel/popups/UsersDetails"

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
const popup = ref(false);
const { getAllClients } = useRequest();
const headers = ref(["name", "phone", "img", "details", "client_product", "client_package"]);
global.user.role == 'superAdmin' && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
const totalRecords = ref(100);
const detailsPopup = ref(false);
const currentClient =ref({})

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (operationType, client) => {
  currentClient.value = client;
  type.value = operationType;
  popup.value = true;
};
const openDetailsPopup = ( client) => {
  currentClient.value = client;
  detailsPopup.value = true;
};
const closeDetailsPopup = ( ) => {
  detailsPopup.value = false;
};

const changeQuery = (type, val) => {
  const types = ["page", "search"];

  if (typeof type == "string" && types.includes(type)) query[type] = val;
};
const getAdminsData = async () => {
  dataFetched.value = false;

  try {
    const res = await getAllClients(query);
    totalRecords.value = res.data?.data?.count;

    query.page = res.data.pagination?.currentPage;

    pagination.totalCount = res.data.pagination?.totalCount;
    pagination.perPage = res.data.pagination?.perPage;

    const allClients = res.data?.data;
    const handeldAdmins = allClients.map((item) => {
      return [
        {
          id: item?.id,
          item: item?.name,
        },
        {
          id: item?.id,
          item: item?.phone,
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
          slotName:"details",
          currentItem: {
            id: item?.id,
            name: item?.name,
            email: item?.email,
            phone: item?.phone,
            image:item.image,
            tall: item?.tall,
            weight:item.weight,
            goal:item.goal,
            createdAt:item.createdAt,
          }
        },
        {
          id: item?.id,
          item: null,
          isSlot: true,
          slotName:"product",
          currentItem: {
            id: item?.id,
          }
        },
        {
          id: item?.id,
          item: null,
          isSlot: true,
          slotName:"package",
          currentItem: {
            id: item?.id,
          }
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
            tall: item?.tall,
            weight:item.weight,
            goal:item.goal,
            createdAt:item.createdAt,
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
