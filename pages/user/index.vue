
<template>
  <div class="pb-10">
    <div v-if="popup">
      <!-- <ManageUserBilling :type="type" @closePopup="closePopup" /> -->
    </div>
    <div class=" flex gap-3 justify-center flex-col sm:flex-row mb-10">

      <Card class=" w-full  sm:min-w-[300px] sm:w-[40%] " >
          <template #title>
            <div class="text-center"> All Credit</div>
          </template>
          <template #content>
            <p class="m-0 text-center">
              {{ currentCredit + spendCredit || "_"  }}
            </p>
          </template>
        </Card>

      <Card class=" w-full  sm:min-w-[300px] sm:w-[40%] " >
          <template #title>
            <div class="text-center">Current Credit</div>
          </template>
          <template #content>
            <p class="m-0 text-center">
              {{ currentCredit || "_"  }}
            </p>
          </template>
        </Card>

      <Card class=" w-full  sm:min-w-[300px] sm:w-[40%] " >
          <template #title>
            <div class="text-center">{{ $t(`dashboard.spent_credit`)  }}</div>
          </template>
          <template #content>
            <p class="m-0 text-center">
              {{spendCredit || "_"  }}
            </p>
          </template>
        </Card>

    </div>

        
    <div
      class="px-0 flex justify-between flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4"
    >
      <button
        @click="() => openPopup('add')"
        class="rounded-md px-6 font-[700] py-2 border border-[#6fb7eb] dark:bg-[#0F426B]  hover:bg-[#c6e3f7]  hover:dark:bg-[#3b74a3] lg:px-8"
      >
        {{ t(`user.actions.add_billing`) }}
      </button>
      <!-- <form @submit.prevent="getBillingData" class="flex gap-2 flex-row-reverse" action="">
        <input
                v-model="searchInput"
                :placeholder=" $t(`admin.actions.search_admin`) "
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-md px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text"
              />
              <button class=" rounded-md px-6 py-2 text-white h-[50px] bg-[#6fb7eb] dark:bg-[#0F426B] hover:bg-[#8ACBFA] hover:dark:bg-[#3b74a3] lg:px-8" type="submit">
                {{ $t(`admin.actions.search`) }}
              </button>
      </form> -->
    </div>
    <div class="min-h-[60vh] overflow-x-auto">
      <RegularDataTable
        :headers="headers"
        :rows="rows"
        page="manage-billing"
        @openPopup="openPopup"
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
  middleware: "user-guard",
});
import RegularDataTable from "~/components/panel/RegularDataTable.vue";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";

const currentCredit = ref()
const spendCredit = ref()
const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const type = ref("");
const route = useRoute();
const router = useRouter();

const popup = ref(false);
const { getAllBilling , getUserData} = useRequest();
const headers = ref(["amount", "payment_method", "status", "date"]);
const rows = ref([]);
const currentPage = ref(2);
const totalRecords = ref(1);
const searchInput = ref("");
const loadingData = ref(false)

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false)
};
const openPopup = (operationType) => {
  type.value = operationType;
  global.changePopupState(true)
  popup.value = true;
};



const userData = ( ) => {
  getUserData().then((res)=>{
    console.log("res" , res.data?.data)

    currentCredit.value = res.data?.data?.credit
spendCredit.value = res.data?.data?.spendCredit
  })
}

const getBillingData = (page = 1) => {
  getAllBilling(page, searchInput.value)
    .then((res) => {
      totalRecords.value = res.data?.data?.count;

      const allBillings = res.data?.data?.billings;
      const handelBillings = allBillings.map((item) => {
        const dateString = item?.createdAt;
        const date = new Date(dateString);

        // Format the date as "YYYY-MM-DD HH:MM:SS"
        const formattedDate = `${(date.getHours()).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}  ,  ${(date.getDate()).toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        return [
          {
            id: item?.id,
            item: item?.amount,
            actions: false,
          },
          {
            id: item?.id,
            item: item?.paymentMethod,
            actions: false,
          },
          {
            id: item?.id,
            item: item?.status,
            actions: false,
          },
          {
            id: item?.id,
            item: formattedDate,
            actions: false,
          },
        ];
      });
      rows.value = handelBillings;
    })
    .catch(console.error).finally(()=>{
    loadingData.value = true
  });
};

const handlePageChange = (e) => {
  const page = e?.page + 1 || 1;
  getBillingData(page);
};

//hooks
onBeforeMount(() => {
  getBillingData();
  userData()
});

onMounted(() => {
  if (route.query?.payment) {
    setTimeout(() => {

    }, 1000);
  }
});
</script>
  
  <style>
</style>