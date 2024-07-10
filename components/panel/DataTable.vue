<template>
  <div class="w-[100 overflow-hidden">
    <div
      class="px-0 flex justify-between flex-col-reverse gap-3 md:flex-row md:px-2 lg:px-4"
    >
      <button
        v-if="withAdd"
        @click="() => openPopup('add')"
        class="rounded-md px-6 font-[700] py-2 border border-[--main-color] dark:bg-[--rows-color] hover:bg-[#c6e3f7] hover:dark:bg-[#3b74a3] lg:px-8"
      >
        {{ addButtonTitle || t(`admin.actions.add`) }}
      </button>
      <form
        v-if="withSearch"
        @submit.prevent="chanageSearch"
        class="flex gap-2 flex-row-reverse"
        action=""
      >
        <input
          v-model="searchInput"
          :placeholder="searchPlaceholder || t(`admin.actions.search`)"
          class="text-[12px] py-2 outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-md px-[20px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] xs:text-[14px] sm:text-[16px] xl:text-[18px]"
          type="text"
        />
        <button
          class="rounded-md px-6 font-[700] py-2 border border-[--main-color] dark:bg-[--rows-color] hover:bg-[#c6e3f7] hover:dark:bg-[#3b74a3] lg:px-8"
          type="submit"
        >
          {{ $t(`admin.actions.search`) }}
        </button>
      </form>
    </div>

    <!-- <div class="w-[100vw]"> -->

    <div
      class="overflow-auto relative mb-[20px] mt-[20px] pb-[50px] px-0 md:px-2 lg:px-4"
    >
      <table
        v-if="rows?.length"
        class="w-full border-separate border-spacing-y-3 text-[16px] xs:text-[14px] sm:text-[16px] xl:text-[18px]"
      >
        <thead class="text-white rounded-[20px] overflow-hidden w-full">
          <th
            v-for="(header, idx) in headers"
            :key="idx"
            :class="`pb-1 px-0 bg-[--third-color] font-[900] ${
              (locale == 'ar' && idx == 0) ||
              (locale == 'en' && idx == headers.length - 1)
                ? 'first-child'
                : (locale == 'en' && idx == 0) ||
                  (locale == 'ar' && idx == headers.length - 1)
                ? 'last-child'
                : ''
            }`"
          >
            <div class="w-full flex min-h-[50px] items-center justify-center px-6">
              {{ t(`table.headers.${header}`) }}
            </div>
          </th>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in props.rows" :key="idx"  class="my-4">
            <td
              v-for="(td, i) in row"
              :key="i"
              :class="` px-6 py-6 border-b border-[--main-color] dark:bg-[--rows-color] dark:border-none ${
                (locale == 'ar' && i == 0) || (locale == 'en' && i == headers.length - 1)
                  ? 'first-child'
                  : (locale == 'en' && i == 0) ||
                    (locale == 'ar' && i == headers.length - 1)
                  ? 'last-child'
                  : ''
              } ${td?.hideTd ? 'hidden ' : ''}`"
             
            >
              <div
                v-if="td?.item != 'action'"
                class="font-bold flex gap-2 justify-center items-center"
              >
          <div  class="w-[100px] lg:w-[150px] " v-if="td?.isImg">
            <img
                  class="w-[100px] lg:w-[150px] block rounded-md"
                 
                  :src=" td?.item ? ` ${baseURL}${td?.item}` : '/imgs/nope-not-here.webp'"
                  @error="handleImageError"

                  alt=""
                />
          </div>

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
                  {{ t(`table.${td?.item == "admin" ? 'admin' : "super_admin"}`)}}</span
                >
                <span class="whitespace-nowrap" v-else-if="td.isDate">
                  {{  locale == 'ar' ?  useArabicDates(td?.item) : useEnglishDates(td?.item)}}</span
                >
                <span class="whitespace-nowrap" v-else-if="td.isNum">
                  {{  locale == 'ar' ?  useArabicNums(td?.item) : td?.item }}</span
                >
                <span class="" v-else-if="td.isSlot">
                  <slot :name="td.slotName" :rowData="td" />
                  </span>
                <span class=" max-w-[400px] break-words text-center " v-else>
                  {{ td?.item ? td?.item : "_" }}
                </span>
              </div>
              <div v-else-if="td?.item == 'action' && td?.actions" class="">
                <div class="font-bold flex gap-2 justify-center items-center">
                  <slot name="actions" :rowData="td" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div    v-if="!rows.length && dataFetched" class="flex flex-col items-center">
        <img
          class="block w-[200px] sm:w-[300px] lg:w-[400px]"
          src="/imgs/no-results.png"
          alt=""
        />

        <p class="font-bold text-[18px] sm:text-[22px] lg:text-[26px]">
          {{ $t("global.no_data_available") }}
        </p>
      </div>
    </div>
    <div  v-if="pagination.totalCount > pagination.perPage">
      <Paginator :pagination="pagination" @changePage="changePage" />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["openPopup", "changeQuery"]);
const props = defineProps({
  pagination: Object,
  headers: Array,
  rows: Array,
  page: String,
  toggleActions: Boolean,
  dataFetched: Boolean,
  searchPlaceholder: String,
  addButtonTitle: String,
  withSearch: Boolean,
  withAdd: Boolean,
});
import Paginator from "./Paginator.vue";
import useDateAndNums from "~/composables/useDateAndNums.js"


const { useArabicDates , useEnglishDates , useArabicNums } = useDateAndNums();




const route = useRoute();
const searchInput = ref("");
const config = useRuntimeConfig();
const buttonState = ref(false);
const { locale, locales, setLocale, t } = useI18n();
const baseURL = config.public.base_url;

const changePage = (page) => {
  emit("changeQuery", "page", page);
};
const chanageSearch = () => {
  emit("changeQuery", "page", 1);

  emit("changeQuery", "search", searchInput.value);
};
const openPopup = (type, currentItem) => {
  emit("openPopup", type, currentItem);
};

const handleImageError = (e) =>{
  e.target.src = '/imgs/nope-not-here.webp';
}

// function copyText(text) {
//   navigator.clipboard.writeText(text);
// }
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
