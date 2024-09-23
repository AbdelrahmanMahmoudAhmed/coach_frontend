<template>
  <div class="pb-10">
    <div v-if="popup">
<ManageContactUs :currentMessage="currentMessage"  @closePopup="closePopup" @getMessagesData="getMessagesData" />
    </div>
    <div v-if="detailsPopup">
      <MessageDetails  :currentDetails="currentMessage" @closePopup="closeDetailsPopup" />
    </div>
    <Title title="contact" />

    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-contact"
        :withSearch="true"
        :withAdd="false"
        :searchPlaceholder="$t(`admin.actions.search_message`)"
        @changeQuery="changeQuery"

      >
        <template v-if=" global.user.websiteManagement" #actions="{rowData}">
          
       
 

          <button
          v-if="global.user.websiteManagement"
            @click="() => openPopup( rowData?.currentItem)"
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
import ManageContactUs from "~/components/panel/popups/ManageContactUs";
import MessageDetails from "~/components/panel/popups/MessageDetails.vue";
import Title from "~/components/panel/Title.vue"

const query = reactive({
  page: 1,
  search: "",
});
const pagination = reactive({
  perPage: "",
  totalCount: "",
});
const detailsPopup = ref(false);
const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const currentMessage = ref("");
const popup = ref(false);
const { getAllMessages } = useRequest();
const headers = ref(["name", "email","title", "phone" , "created_at" , "details"]);
(global.user.websiteManagement  ) && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
const totalRecords = ref(100);

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (video) => {
  currentMessage.value = video;
  popup.value = true;
};
const openDetailsPopup = ( progPackage) => {
  currentMessage.value = progPackage;
  detailsPopup.value = true;
};
const closeDetailsPopup = ( ) => {
  detailsPopup.value = false;
};

const changeQuery = (type, val) => {
  const types = ["page", "search"];

  if (typeof type == "string" && types.includes(type)) query[type] = val;
};

const getMessagesData = async () => {
  dataFetched.value = false;

  try {
    const res = await getAllMessages(query);
    totalRecords.value = res.data?.data?.count;

    query.page = res.data.pagination?.currentPage;

    pagination.totalCount = res.data.pagination?.totalCount;
    pagination.perPage = res.data.pagination?.perPage;

    const allMessages = res.data?.data;
    const handeldMessages = allMessages.map((item) => {
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
          item: item?.title,
        },
        {
          id: item?.id,
          item: item?.phone,
          isNum:true
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
            name: item?.name,
            email:item.email,
            phone:item.phone,
            title:item.title,
            message:item.message,
            createdAt:item.createdAt,
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
          }
        },
      ];
    });
    rows.value = handeldMessages;
  } catch (err) {
    console.error(err);
  } finally {
    dataFetched.value = true;
  }
};

// hooks
onBeforeMount(() => {
  getMessagesData();
});
watch(
  () => query.page,
  () => {
    getMessagesData(query);
  }
);
watch(
  () => query.search,
  () => {
    getMessagesData(query);
  }
);


</script>

<style></style>
