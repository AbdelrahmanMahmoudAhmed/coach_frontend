<template>
  <div class="pb-10" @click="closeDropdown">
    <div v-if="popup">
      <ManageUsers
        :type="type"
        :currentUser="currentUser"
        :allCountries="allCountries"
        @getUsersData="getUsersData"
        @closePopup="closePopup"
      />
    </div>
    <div
      class="px-0 flex justify-between flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4"
    >
<div class="flex gap-2"> 
  <button
        @click="() => openPopup('add')"
        class="rounded-md px-6 font-[700] py-2 border border-[#6fb7eb] dark:bg-[#0F426B]  hover:bg-[#c6e3f7]  hover:dark:bg-[#3b74a3] lg:px-8"
      >
        {{ t(`admin.actions.add_user`) }}
      </button>
      <button
        @click="downloadAllUsersData"
        class="rounded-md px-6 font-[700] py-2 border border-[#6fb7eb] dark:bg-[#0F426B]  hover:bg-[#c6e3f7]  hover:dark:bg-[#3b74a3] lg:px-8"
      >
        {{ t(`admin.actions.download_users`) }}
      </button>
</div>
      <form
        @submit.prevent="getUsersData"
        class="flex gap-2 flex-row-reverse"
        action=""
      >
        <input
          v-model="searchInput"
          :placeholder="$t(`admin.actions.search_user`)"
          class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-md px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
          type="text"
        />
        <button
        class="rounded-md px-6 py-2 font-[700] h-[50px] border border-[#6fb7eb] dark:bg-[#0F426B] hover:bg-[#c6e3f7] hover:dark:bg-[#3b74a3] lg:px-8"
          type="submit"
        >
          {{ $t(`admin.actions.search`) }}
        </button>
      </form>
    </div>
    <div class="min-h-[60vh] overflow-x-auto">
      <RegularDataTable
        :headers="headers"
        :rows="rows"
        page="manage-users"
        @openPopup="openPopup"
        :toggleActions="actions"
        :loadingData="loadingData" 
      />
    </div>

    <div     v-if="totalRecords > 10" dir="ltr" class="">
      <Paginator
        v-model:first="currentPage"
        @page="handlePageChange"
        :rows="10"
        :totalRecords="totalRecords"
      ></Paginator>
    </div>
  </div>
</template>
  
  <script setup>
definePageMeta({
  layout: "panel",
  middleware: "admin-guard",
});

import RegularDataTable from "~/components/panel/RegularDataTable.vue";
import ManageUsers from "~/components/panel/popups/ManageUsers.vue";
import useRequest from "~/composables/useRequest";
import useServerRequest from "~/composables/useServerRequist";
import { useGlobalStore } from "~/stores/global";


const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const type = ref("");
const currentUser = ref("");
const actions = ref(false);
const loadingData = ref(false)
const popup = ref(false);
const { getAllUsers, downloadAllUsers } = useRequest();
const headers = ref([
  "name",
  "email",
  "current_credit",
  "spent_credit",
  "actions",
]);
const rows = ref([]);
const currentPage = ref(2);
const totalRecords = ref(1);
const searchInput = ref("");
const allCountries = ref([]);

const { countries } = useServerRequest();

//server requist to get all countries for popup
const { data, error } = await countries();
allCountries.value = data?.value?.data;

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false)

};
const openPopup = (operationType, user) => {
  currentUser.value = user;
  type.value = operationType;
  popup.value = true;
  global.changePopupState(true)

};

const getUsersData = (page = 1) => {
  getAllUsers(page, searchInput.value).then((res) => {
    totalRecords.value = res.data?.data?.count;
    const allUsers = res.data?.data?.users;
    const handeldUsers = allUsers.map((item) => {
      return [
        {
          id: item?.id,
          item: item?.name,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.email,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.credit,
          actions: true,
        },
        {
          id: item?.id,
          item: item?.spendCredit,
          actions: true,
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          currentItem: {
            id: item?.id,
            name: item?.name,
            email: item?.email,
            credit: item?.credit,
            spendCredit: item?.spendCredit,
            country: item?.country,
          },
          role: item?.role,
        },
      ];
    });
    rows.value = handeldUsers;
  }).catch(console.error).finally(()=>{
    loadingData.value = true
  });
};
const downloadAllUsersData = () => {
  downloadAllUsers()
    .then((res) => {
      // if (res.statusText == "OK") {
        const csv = res.data;
        const anchor = document.createElement("a");
        anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        anchor.target = "_blank";
        anchor.download = "all-users-data.csv";
        anchor.click();

      // }
    })
    .catch((err) => {
      console.error(err)

    });
};
const handlePageChange = (e) => {
  const page = e?.page + 1 || 1;
  getUsersData(page);
};

const closeDropdown = (e) => {
  if (!e.target.closest(".drop-down-menu") && actions.value) {
    actions.value = false;
  } else if (!e.target.closest(".drop-down-menu") && !actions.value) {
    actions.value = true;
  }
};

//hooks
onBeforeMount(() => {
  getUsersData();
});
</script>
  
  <style>
</style>