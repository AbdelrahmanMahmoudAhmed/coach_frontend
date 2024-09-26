<template>
  <div>
    <Multiselect
      v-model="value"
      :options="props.options"
      :label="props.locale == 'ar' ? 'name_ar' : 'name_en'"
      :placeholder="props.placeholder"
      :mode="props.mode || 'single'"
      :close-on-select="props.close"
      :clear-on-select="false"
      @change="changeVal"
      :show-labels="true"
      :multiple="true"
      :hide-selected="false"
      :searchable="props.isSearchable"

      
    >
      <template v-if="props.inputType == 'withPic'" v-slot:option="{ option }">
        <div class="mx-2" v-if="isFlag">
        <country-flag :country="option?.value"  size='small' />
      </div>
        <img v-else class="character-option-icon w-12 p-2" :src="option?.value" />
        {{ props.locale == "ar" ? option.name_ar : option.name_en }}
      </template>
    </Multiselect>
  </div>
</template>

<script setup>
// import { ref, onBeforeMount } from 'vue';
import Multiselect from "@vueform/multiselect";
import CountryFlag from 'vue-country-flag-next';

const props = defineProps([
  "options",
  "inputType",
  "placeholder",
  "mode",
  "locale",
  "currentCity",
  "close",
  "currentVal",
  "isFlag",
  "isSearchable"
]);
const emit = defineEmits(["changeVal"]);

const value = ref(null);

// onBeforeMount(() => {
//     if (props.inputType === 'city') {
//         value.value = props.currentCity;
//     }
// });

const changeVal = (e) => {
  emit("changeVal", e, props.inputType);
};
onBeforeMount(() => {
  value.value = props.currentVal;
});

// watch(()=> props.currentVal  , ()=>{
//   value.value = props.currentVal
// })
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
