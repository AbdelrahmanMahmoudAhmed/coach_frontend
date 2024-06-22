<template>
  
  <div>
    <div class="relative mb-[60px] mt-[20px] pb-[50px] px-0 md:px-2 lg:px-4">
      <table
        v-if="rows?.length"
        class="w-full border-separate border-spacing-y-3 text-[16px] sm:text-[18px]"
      >
        <thead class="text-white rounded-[20px] overflow-hidden w-full">
          <th
            v-for="(header, idx) in headers"
            :key="idx"
            :class="`pb-1 px-0 bg-[--main-card-color] font-[900] ${
              (locale == 'ar' && idx == 0) ||
              (locale == 'en' && idx == headers.length - 1)
                ? 'first-child'
                : (locale == 'en' && idx == 0) ||
                  (locale == 'ar' && idx == headers.length - 1)
                ? 'last-child'
                : ''
            }`"
          >
            <div class="w-full flex h-[50px] items-center justify-center px-6">
              {{ t(`table.headers.${header}`) }}
            </div>
          </th>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in props.rows" :key="idx" class="my-4">
            <td
              v-for="(td, i) in row"
              :key="i"
              :class="`px-6 py-6 border-b border-[#6fb7eb]  dark:bg-[#0F426B] dark:border-none ${
                (locale == 'ar' && i == 0) ||
                (locale == 'en' && i == headers.length - 1)
                  ? 'first-child'
                  : (locale == 'en' && i == 0) ||
                    (locale == 'ar' && i == headers.length - 1)
                  ? 'last-child'
                  : ''
              }`"
            >
              <div
                v-if="td?.item != 'action'"
                class="font-bold flex gap-2 justify-center items-center"
              >
                <img
                  class="w-[70px]"
                  v-if="td?.isImg"
                  :src="`${baseURL}u/${td?.item}`"
                  alt=""
                />
                <img
                  :class="`${td?.item == '/imgs/ubuntu.svg' ? 'w-[100px]' : 'w-[70px]'}`"
                  v-else-if="td?.withImg"
                  :src="`${td?.item}`"
                  alt=""
                />
                <span v-else-if="td?.isBoolean" class="relative flex h-3 w-3">
                  <span
                    :class="`animate-ping absolute inline-flex h-full w-full rounded-full ${
                      td?.item ? 'bg-green-500 ' : 'bg-red-500'
                    } opacity-75 `"
                  ></span>
                  <span
                    :class="`relative inline-flex rounded-full h-3 w-3 ${
                      td?.item ? 'bg-green-600 ' : 'bg-red-700'
                    }`"
                  ></span>
                </span>
                <span class="whitespace-nowrap" v-else-if="td.withTranslate">
                  {{ $t(td?.item) }}</span
                >
                <span class="whitespace-nowrap" v-else>
                  {{ td?.item ? td?.item : "_" }}
                  <Button
                    @click="() => copyText(td?.item)"
                    class="w-[22px] h-[22px] p-[2px] mx-2 hover:bg-[--main-card-color] !hover:border-[--main-card-color]"
                    v-if="td.copy"
                    v-tooltip="{
                      value: $t('global.copy'),
                      showDelay: 200,
                      hideDelay: 300,
                    }"
                  >
                    <img
                      class="w-[20px] h-[20px]"
                      src="../../assets/imgs/clipboard.svg"
                      alt=""
                    />
                  </Button>

                  <div class=" inline-block" v-if="td.toolTip">
                    <Tooltip  :tooltipData="td" />

                  </div>  

                </span>
              </div>
              <div v-if="td?.item == 'action' && td?.actions" class="">
                <div
                  v-if="
                  
                    page != 'manage-users' &&
                    page != 'show-details-proxy' &&
                    page != 'manage-paypal' &&
                    page != 'manage-user-vps' &&
                    page != 'user-residential'
                  "
                  class="font-bold flex gap-2 justify-center items-center"
                >
                  <button
                    v-if="
                      page != 'manage-user-proxy-packages' &&
                      page != 'user-proxy-packages'
                    "
                    @click="() => openPopup('edit', td?.currentItem)"
                    class="text-white bg-[--main-card-color] rounded-md px-4 py-2 lg:px-6 hover:bg-[#265b87]"
                  >
                    {{ t(`table.headers.edit`) }}
                  </button>

                  <NuxtLink
                    :to="`/admin/user-management/packages/${route.params.userId}/details/${td?.currentItem?.type}?id=${td?.currentItem?.id}`"
                    v-if="page == 'manage-user-proxy-packages'"
                    class="rounded-md px-6 py-2 border border-[#6fb7eb] dark:bg-[#0F426B] dark:bg-[--main-color] dark:border-none hover:bg-[#6fb7eb] hover:text-white hover:dark:bg-[#3b74a3] lg:px-8"
                  >
                    {{ t(`table.headers.details`) }}
                  </NuxtLink>
                  <NuxtLink
                    :to="`/user/packages/proxy/${td?.currentItem?.type}?id=${td?.currentItem?.id}&name=${td?.currentItem?.name}`"
                    v-if="page == 'user-proxy-packages'"
                    class="rounded-md px-6 py-2 border border-[#6fb7eb] dark:bg-[#0F426B] dark:bg-[--main-color] dark:border-none hover:bg-[#6fb7eb] hover:text-white hover:dark:bg-[#3b74a3] lg:px-8"
                  >
                    {{ t(`table.headers.details`) }}
                  </NuxtLink>

                  <button
                    v-if="page == 'user-proxy-packages'"
                    @click="() => openPopup(td?.currentItem)"
                    class="text-white bg-[--main-card-color] rounded-md px-4 py-2 lg:px-6 hover:bg-[#265b87]"
                  >
                    {{ t(`table.headers.renew`) }}
                  </button>

                  <button
                    v-if="page != 'user-proxy-packages'"
                    :disabled="td?.role == 'super-admin'"
                    @click="() => openPopup('delete', td?.currentItem)"
                    class="text-white bg-red-800 rounded-md px-4 py-2 hover:bg-red-600 disabled:bg-[#cc6c6c] lg:px-6"
                  >
                    {{ $t(`table.headers.delete`) }}
                  </button>
                </div>
                <div
                  id="manage-users"
                  v-if="page == 'manage-users'"
                  class="relative text-white font-bold flex gap-2 justify-center items-center"
                >
      
                </div>
                <div
                  v-if="page == 'manage-user-vps'"
                  class="font-bold flex gap-2 justify-center items-center"
                >
                  <button
                    @click="() => openPopup('edit', td?.currentItem)"
                    class="text-white bg-[--main-card-color] rounded-md px-4 py-2 lg:px-6 hover:bg-[#265b87]"
                  >
                    {{ t(`table.headers.renew`) }}
                  </button>
                </div>

                <div
                  v-if="page == 'manage-paypal'"
                  class="font-bold flex gap-2 justify-center items-center"
                >
                  <button
                    @click="() => openPopup('accept', td?.currentItem)"
                    class="text-white bg-[--main-card-color] rounded-md px-4 py-2 lg:px-6 hover:bg-[#265b87]"
                  >
                    {{ t(`table.headers.accept`) }}
                  </button>
                  <button
                    :disabled="td?.role == 'super-admin'"
                    @click="() => openPopup('reject', td?.currentItem)"
                    class="text-white bg-red-800 rounded-md px-4 py-2 hover:bg-red-600 disabled:bg-[#cc6c6c] lg:px-6"
                  >
                    {{ $t(`table.headers.reject`) }}
                  </button>
                </div>

                <div
                  v-if="page == 'user-residential'"
                  class="font-bold flex gap-2 justify-center items-center"
                >
                  <button
                    @click="() => openPopup(td?.currentItem)"
                    class="text-[#fff] bg-[--main-card-color] rounded-md px-4 py-2 lg:px-6 hover:bg-[#265b87]"
                  >
                    {{ t(`table.headers.generate`) }}
                  </button>
                  <!-- <button
                    :disabled="td?.role == 'super-admin'"
                    @click="() => openPopup('generate', td?.currentItem)"
                    class=" cursor-pointer bg-green-900 rounded-md px-4 py-2 lg:px-6 hover:bg-green-700 "
                  >
                    {{ $t(`table.headers.details`) }}
                  </button> -->
                  <NuxtLink
                    :to="`/user/packages/residential/${td?.currentItem?.id}?name=${td?.currentItem?.name}`"
                    class="rounded-md px-6 py-2 border border-[#6fb7eb] dark:bg-[#0F426B] dark:bg-[--main-color] dark:border-none hover:bg-[#6fb7eb] hover:text-white hover:dark:bg-[#3b74a3] lg:px-8"
                  >
                    {{ t(`table.headers.details`) }}
                  </NuxtLink>
                </div>


           
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="!rows.length && loadingData"
        class="min-h-[50vh] flex justify-center items-center text-[25px] md:[32px]"
      >
        {{ $t("global.no_data_available") }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  headers: Array,
  rows: Array,
  page: String,
  toggleActions: Boolean,
  loadingData: Boolean,
});
import Tooltip from "./Tooltip.vue";
const route = useRoute();


const config = useRuntimeConfig();
const buttonState = ref(false);
const emit = defineEmits(["openPopup"]);
const { locale, locales, setLocale, t } = useI18n();
const baseURL =
  process.env.NODE_ENV === "production"
    ? config.public.prod_base
    : config.public.dev_base;

const openPopup = (type, currentItem) => {
  emit("openPopup", type, currentItem);
};

function copyText(text) {
  navigator.clipboard.writeText(text);
}
</script>

 
<style>
.first-child,
.first-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  /* overflow: hidden; */
}
.last-child,
.last-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
/* input[type="number"] {
  -moz-appearance: textfield;
} */


</style>