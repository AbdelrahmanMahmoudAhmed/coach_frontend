<template>
    <div>
        <Multiselect v-model="value" :options="props.options"
            :label="props.locale == 'ar' ? 'name_ar' : 'name_en'" :placeholder="props.placeholder" :mode="props.mode"
            :close-on-select="props.close" :clear-on-select="false" @change="changeVal" :show-labels="true" :multiple="true"
            :hide-selected="false">

            <template v-if="props.inputType == 'withPic'" v-slot:option="{ option }">
                <img class="character-option-icon w-12 p-2" :src="option?.images[0]" />
                {{ props.locale == 'ar' ? option.name_ar : option.name_en }}
            </template>
        </Multiselect>
    </div>
</template>

<script setup>
// import { ref, onBeforeMount } from 'vue';
import Multiselect from "@vueform/multiselect";

const props = defineProps(["options", "inputType", "placeholder", 'mode', 'locale', 'currentCity', "close"]);
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
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
