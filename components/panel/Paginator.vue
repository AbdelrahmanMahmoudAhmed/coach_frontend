<script setup>

const emit = defineEmits(['changePage']);
const props = defineProps({
  pagination:Object
})

import { ref } from "vue";
const { locale, locales, setLocale, t } = useI18n();

const onClickHandler = (page) => {
  emit('changePage' ,page)
  console.log(page);
};

const currentPage = ref(1);
</script>

<template>
  <div :dir="locale == 'ar' ? 'ltr' : 'rtl'" class="flex justify-center">
    <vue-awesome-paginate
      :total-items="pagination.totalCount"
      :items-per-page="pagination.perPage"
      :max-pages-shown="3"
      v-model="currentPage"
      @click="onClickHandler"
      dir="rtl"
      :locale="locale"
    >
    <template #prev-button>
    <span class=" p-2 block">
      <img :src=" locale == 'ar'  ? '/imgs/to-left.svg' : '/imgs/to-right.svg'"  height="25" />
    </span>
  </template>

  <template #next-button>
    <span class=" p-2 block">
      <img :src=" locale == 'ar' ? '/imgs/to-right.svg' :'/imgs/to-left.svg'"  height="25" />
    </span>
  </template>
</vue-awesome-paginate>
  </div>
</template>

<style>
.pagination-container {
  display: flex;

  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: var(--third-color);
  border: 1px solid var(--third-color)b;
  color: white;
}

.paginate-buttons:hover {
  background-color: #335269;

}

.active-page {
    background-color: var(--main-color);
  border: 1px solid var(--main-color);
  color: white;
   
}

.active-page:hover {
  background-color: #54ade9;
}
</style>
