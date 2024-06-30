<template>
  <div>

    <button
      @click="() => toggleDropdown(item?.id)"
      class="bg-[--third-color] rounded-md px-4 py-2 lg:px-6 hover:bg-[#265b87]"
    >
      {{ $t(`table.headers.actions`) }}
      <img src="" alt="" />
    </button>
    <div
      v-if="dropDownMenu"
      :id="`drop-${item?.id}`"
      class="drop-down-menu p-2 border border-[--main-color] absolute w-full min-w-[fit] h-[165px] bg-[--third-color] bottom-[-170px] z-10 rounded-md left-0"
    >
      <div class="flex justify-center mb-1">
        <span
        @click="()=>openPopup('edit')"
          class=" whitespace-nowrap text-[#6fb7eb] text-center cursor-pointer hover:text-[#a5d3f4]"
        >
          {{ t(`table.headers.edit`) }}
        </span>
      </div>
      <div class="flex justify-center mb-1">
        <span
        @click="()=>openPopup('delete')"
          class="whitespace-nowrap text-red-800 text-center cursor-pointer hover:text-red-600"
        >
          {{ t(`table.headers.delete`) }}
        </span>
      </div>
      <div class="flex justify-center mb-1">
        <span
        @click="()=>openPopup('credit')"
          class=" whitespace-nowrap text-green-700 text-center cursor-pointer hover:text-green-600"
        >
          {{ t(`table.headers.edit_the_credit`) }}
        </span>
      </div>
      <div class="flex justify-center mb-1">
        <NuxtLink
        :to="`/admin/user-management/packages/${item?.id}`"
          class=" whitespace-nowrap text-yellow-700 text-center cursor-pointer hover:text-yellow-500"
        >
          {{ t(`table.headers.to_packages`) }}
        </NuxtLink>
      </div>
      <div class="flex justify-center">
        <NuxtLink
          :to="`/admin/user-management/invoices/${item?.id}`"
          class=" whitespace-nowrap text-orange-700 text-center cursor-pointer hover:text-orange-500"
        >
          {{ t(`table.headers.to_invoices`) }}
        </NuxtLink>
      </div>
      <!-- <div class="flex justify-center">
        <span
         
          class=" whitespace-nowrap text-[#cdcdcd] text-center cursor-pointer hover:text-white"
        >
          {{ t(`table.headers.download`) }}
        </span>
      </div> -->
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["openPopup" ]);

const props = defineProps({
  item: Object,
  toggleActions: Boolean,
});


const { locale, locales, setLocale, t } = useI18n();
const dropDownMenu = ref(false);

const toggleDropdown = () => {

setTimeout(()=>{
    dropDownMenu.value = !dropDownMenu.value;

} ,10)
};



const openPopup = (type) => {
  emit("openPopup", type, props.item?.currentItem);
  dropDownMenu.value =false
};

watch(
  () => props.toggleActions,
  (newValue, oldValue) => {
    if (dropDownMenu.value) {
      dropDownMenu.value = false;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style>
</style>