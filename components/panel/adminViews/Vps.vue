<template>
  <div class="pb-10 ">
    <div v-if="popup">
      <ManageUserVps
        :type="type"
        :currentVpsPackage="currentVpsPackage"
        @getUserVpsPackagesData="getUserVpsPackagesData"
        @closePopup="closePopup"
      />
    </div>
    <div
      class="px-0 flex justify-between flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4"
    >
      <!-- <button
        @click="() => openPopup('add')"
        class="rounded-md px-6 py-2 text-white bg-[#6fb7eb] dark:bg-[--rows-color] hover:bg-[#8ACBFA] hover:dark:bg-[#3b74a3] lg:px-8"
      >
        {{ t(`admin.actions.add_user_packages_vps`) }}
      </button> -->
      <!-- <form
        @submit.prevent="getUserVpsPackagesData"
        class="flex gap-2 flex-row-reverse"
        action=""
      >
        <input
          v-model="searchInput"
          :placeholder="$t(`admin.actions.search_package`)"
          class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-md px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
          type="text"
        />
        <button
          class="rounded-md px-6 py-2 text-white h-[50px] bg-[#6fb7eb] dark:bg-[--rows-color] hover:bg-[#8ACBFA] hover:dark:bg-[#3b74a3] lg:px-8"
          type="submit"
        >
          {{ $t(`admin.actions.search`) }}
        </button>
      </form> -->
    </div>
    <div class="min-h-[60vh] overflow-x-auto">
      <RegularDataTable
        :headers="headers"
        :rows="rows"
        page="manage-user-vps-packages"
        @openPopup="openPopup"
        :dataFetched="dataFetched"
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
import RegularDataTable from "~/components/panel/DataTable.vue";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";


const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const type = ref("");
const currentVpsPackage = ref("");
const popup = ref(false);
const { getUserVpsPackages } = useRequest();
const headers = ref([
  "ip",
  "user_name",
  "password",
  "expiration_date",
  "port",
  "status",
  "actions",
]);
const rows = ref([]);
const dataFetched = ref(false)
const currentPage = ref(2);
const totalRecords = ref(1);
const searchInput = ref("");
const route = useRoute();

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false)

};
const openPopup = (operationType, vps) => {
  currentVpsPackage.value = vps;
  type.value = operationType;
  global.changePopupState(true)


  popup.value = true;
};

const getUserVpsPackagesData = (page = 1) => {
  getUserVpsPackages(route.params.userId, page, searchInput.value).then(
    (res) => {
      totalRecords.value = res.data?.data?.count;


      const allVpsPackages = res.data?.data?.packages;
      const handledVpsPackages = allVpsPackages.map((item) => {
        const dateString = item?.expirationsDate;
        const date = new Date(dateString);

        // Format the date as "YYYY-MM-DD HH:MM:SS"
        const formattedDate = `${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date
          .getSeconds()
          .toString()
          .padStart(2, "0")}  ,  ${date
          .getDate()
          .toString()
          .padStart(2, "0")}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
        return [
          {
            id: item?.id,
            item: item?.ip,
            actions: true,
          },
          {
            id: item?.id,
            item: item?.username,
            actions: true,
          },
          {
            id: item?.id,
            item: item?.password,
            actions: true,
          },
          {
            id: item?.id,
            item: formattedDate,
            actions: true,
          },
          {
            id: item?.id,
            item: item?.port,
            actions: true,
          },
          {
            id: item?.id,
            item: item?.status,
            actions: true,
          },
          {
            id: item?.id,
            item: "action",
            actions: true,
            currentItem: {
              id: item?.id,
              username: item?.username,
              password: item?.password,
              port:item?.port,
              ip:item?.ip,
              expirationsDate:item?.expirationsDate
            },
          },
        ];
      });
      rows.value = handledVpsPackages;

    }
  ).catch(console.error).finally(()=>{
    dataFetched.value = true
  });
};

const handlePageChange = (e) => {
  const page = e?.page + 1 || 1;
  getUserVpsPackagesData(page);
};

//hooks
onBeforeMount(() => {
  getUserVpsPackagesData();
});
</script>
    
    <style>
</style>~/composables/useRequest