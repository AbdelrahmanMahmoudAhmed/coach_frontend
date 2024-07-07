<template>
  <div @click.self="closePopup"
    class="popup-holder popup">
    <!-- <div class=" flex justify-center items-center"> -->
    <form @submit.prevent="managePackageFun"
      class="panel-form ">
     
   <div @click="closePopup" :class="`${locale == 'ar' ? 'left-4' : 'right-4'} absolute top-4 cursor-pointer`">
    <img class="w-[40px] cursor-pointer" :src="isDark == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'" alt="">
   </div>
     
      <h3 class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold">
        {{ $t(`admin.actions.${type}_package`) }}
      </h3>

      <div v-if="type != 'delete'" class="flex flex-col justify-center">
        <div class="add-edit-holder"
          v-if="imageDisplaying">
          <div class="max-w-[200px] rounded-lg overflow-hidden">
            <img :src="imageDisplaying" alt="personal image" />
          </div>
        </div>
        <div class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto">
          <div class="relative">
            <label class="px-[30px] mb-1" for="">{{ $t("auth.package_image") }}</label>
            <input @change="onChangeImage"
              class="py-[9px] text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#c1abab] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
              type="file" />
          </div>
          <p v-if="errors.image.state"
            class="panel-input-err ">
            {{ $t("auth.errors.add_image") }}
          </p>
          <p v-if="errors.realImage.state"
            class="panel-input-err ">
            {{ $t("auth.errors.add_real_image") }}
          </p>
        </div>
        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.titleAr" :placeholder="$t('auth.title_ar')"
              class="panel-input"
              type="text" />
          </div>
          <p v-if="errors.titleAr.state"
            class="panel-input-err ">
            {{ $t(`auth.errors.${errors.titleAr.message}`) }}
          </p>
        </div>
        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.titleEn" :placeholder="$t('auth.title_en')"
              class="panel-input"
              type="text" />
          </div>
          <p v-if="errors.titleEn.state"
            class="panel-input-err ">
            {{ $t(`auth.errors.${errors.titleEn.message}`) }}
          </p>
        </div>

        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.descriptionAr" :placeholder="$t('auth.description_ar')"
              class="panel-input"
              type="text" autocomplete="off" />
          </div>
          <p v-if="errors.descriptionAr.state"
            class="panel-input-err ">
            {{ $t(`auth.errors.${errors.descriptionAr.message}`) }}
          </p>
        </div>
        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.descriptionEn" :placeholder="$t('auth.description_en')"
              class="panel-input"
              type="text" autocomplete="off" />
          </div>
          <p v-if="errors.descriptionEn.state"
            class="panel-input-err ">
            {{ $t(`auth.errors.${errors.descriptionEn.message}`) }}
          </p>
        </div>

        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.period" :placeholder="$t('auth.period')"
              class="panel-input"
              type="number" autocomplete="off" />
          </div>
          <p v-if="errors.period.state"
            class="panel-input-err ">
            {{ $t(`auth.errors.${errors.period.message}`) }}
          </p>
        </div>

        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.price" :placeholder="$t('auth.price')"
              class="panel-input"
              type="number" autocomplete="off" />
          </div>
          <p v-if="errors.price.state"
            class="panel-input-err ">
            {{ $t(`auth.errors.${errors.price.message}`) }}
          </p>
        </div>

        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.discountPercentage" :placeholder="$t('auth.discount_percentage')"
              class="panel-input"
              type="number" autocomplete="off" />
          </div>
          <p v-if="errors.discountPercentage.state"
            class="panel-input-err ">
            {{ $t(`auth.errors.${errors.discountPercentage.message}`) }}
          </p>
        </div>

        <div class="panel-input-holder ">
          <div class="flex justify-between mb-2">
            <span class="px-[30px] mb-1">{{ $t("auth.package_features") }}</span>
            <span class="px-[30px] mb-1" @click="addFeature">
              <img class="w-[25px] cursor-pointer" :src="isDark == 'light' ? '/imgs/add_dark.svg' : '/imgs/add_light.svg'" alt="">
            </span>
          </div>
          <div v-for="(feature, idx) in state.packageFeatures" :key="idx" :id="feature.id"
            class="relative px-3 pt-8 pb-3 rounded-lg border mb-2">
            <span @click="() => removeFeature(feature.id)" :class="` absolute top-1 cursor-pointer ${locale == 'ar' ? 'left-3' : 'right-3'
    } `">
    <img class="w-[25px] cursor-pointer" :src="isDark == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'" alt="">
</span>

            <input v-model="feature.featureAr" :placeholder="$t('auth.package_feature_ar')"
              class="panel-input"
              type="text" autocomplete="off" />
            <input v-model="feature.featureEn" :placeholder="$t('auth.package_feature_en')"
              class="panel-input"
              type="text" autocomplete="off" />
          </div>
          <p v-if="errors.packageFeatures.state"
            class="panel-input-err ">
            {{ $t("auth.errors.add_complete_feature") }}
          </p>
        </div>
      </div>

      <div v-else-if="type == 'delete'">
        <div class="text-center font-[900]">
          {{ $t(`admin.actions.delete_package_msg` , {package : locale == "ar" ? currentPackage?.titleAr : currentPackage?.titleEn }) }}

        </div>
      </div>

      <div class="popup-actions-holder">
        <button @click="closePopup" type="button"
          class="panel-cancel-btn ">
          {{ $t(`admin.actions.cancel`) }}
        </button>
        <button type="submit" :class="`${type == 'delete' ? ' bg-red-800 hover:bg-red-600' : 'bg-[#2FA3F7] hover:bg-[#62b4ef]'
    }  rounded-[21px] h-[40px] px-[23px] w-full sm:w-fit`">
          {{ $t(`admin.actions.${type}`) }}
        </button>
      </div>
    </form>
  </div>
  <!-- </div> -->
</template>

<script setup>
const emit = defineEmits(["closePopup", "getPackagesData"]);
const props = defineProps({
  type: String,
  currentPackage: Object,
});
const isDark = useCookie("isDark");

import useVuelidate from "@vuelidate/core";
import {
  required,
  maxValue,
  minLength,
  numeric,
  requiredIf,
  helpers
} from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import DropDownCompVue from "~/components/generic/DropDownComp.vue";
import showToast from "~/composables/useToast";
import { useGlobalStore } from "~/stores/global";

const config = useRuntimeConfig();
const BASE_URL = config.public.base_url;

const { createPackage, editPackage, deletePackage } = useRequest();
const { locale, t } = useI18n();
const imageDisplaying = ref("");

const state = reactive({
  image: "",
  titleAr:  "",
  titleEn: "",
  descriptionAr: "",
  descriptionEn: "",
  period: "",
  price: "",
  discountPercentage: "",
  packageFeatures: [{ id: "feature_1", featureAr: "", featureEn: "" }],
});
const errors = reactive({
  image: {
    state: false,
    message:"",
  },
  realImage: {
    state: false,
    message:"",
  },
  titleAr: {
    state: false,
    message:"",
  },
  titleEn: {
    state: false,
    message:"",
  },
  descriptionAr: {
    state: false,
    message:"",
  },
  descriptionEn: {
    state: false,
    message:"",
  },
  period: {
    state: false,
    message:"",
  },
  price: {
    state: false,
    message:"",
  },
  discountPercentage: {
    state: false,
    message:"",
  },
  packageFeatures: {
    state: false,
    message:"",
  },
});

const rules = computed(() => {
  return {
    titleAr: { required: helpers.withMessage('add_title_ar', required), minLength:  helpers.withMessage('at_least_three', minLength(3))  },
    titleEn: { required: helpers.withMessage('add_title_en', required), minLength:  helpers.withMessage('at_least_three', minLength(3))  },
   
    descriptionAr: { required: helpers.withMessage('add_description_ar', required), minLength:  helpers.withMessage('at_least_three', minLength(7))  },
    descriptionEn: { required: helpers.withMessage('add_description_en', required), minLength:  helpers.withMessage('at_least_seven', minLength(7))  },

    period: { required: helpers.withMessage('add_period', required), numeric: helpers.withMessage('must_be_number', numeric) },
    price: { required: helpers.withMessage('add_price', required), numeric: helpers.withMessage('must_be_number', numeric) },
    discountPercentage: { required: helpers.withMessage('add_discount_percentage', required), numeric: helpers.withMessage('must_be_number', numeric) , maxValue: helpers.withMessage('max_hundred', maxValue(100)) },
    
    packageFeatures: {
      required: requiredIf(function (nestedModel) {

        const completedFeatures = [];

        nestedModel.forEach((item) => {
          if (item.featureAr && item.featureEn) completedFeatures.push(item);
        });

        completedFeatures.length && (state.packageFeatures = completedFeatures);
        errors.packageFeatures.state = completedFeatures.length === 0;
        return completedFeatures.length === 0;
      }),
    },

    image: {
      required: requiredIf(function (nestedModel) {
        const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"]; // Add more MIME types as needed
        if (!state.image && props.type == "edit") {
          errors.image.state = false;
          errors.realImage.state = false;
          return false;
        }
        if (!state.image) {
          errors.image.state = true;
          errors.realImage.state = false;
          return true;
        } else if (allowedMimeTypes.includes(nestedModel.type)) {
          errors.image.state = false;
          errors.realImage.state = false;
          // Accept the file
          return false;
        } else {
          // Reject the file
          errors.realImage.state = true;
          errors.image.state = false;
          return true;
        }
      }),
    },
  };
});

const v$ = useVuelidate(rules, state);

const closePopup = () => {
  emit("closePopup");
};

const getPackagesData = () => {
  emit("getPackagesData");
};

const managePackageFun = async () => {
  const emailErrorMessage = computed(() => {
      const emailValidation = v$.value.titleAr;

      if (emailValidation.$pending) {
        return '';
      }

      if (!emailValidation.required) {
        return 'title is required.';
      }

      if (!emailValidation.minLength) {
        return 'Please enter a valid email address.';
      }

      return '';
    });

  if (props.type != "delete") {
    errors.titleAr.state = false;
    errors.titleEn.state = false;
    errors.descriptionAr.state = false;
    errors.descriptionEn.state = false;
    errors.period.state = false;
    errors.price.state = false;
    errors.discountPercentage.state = false;
    errors.packageFeatures.state = false;

    const payload = new FormData();

    const result = await v$.value.$validate();

    if (result && !errors.image.state && !errors.packageFeatures.state) {
      state.image && payload.append("image", state.image);
      state.titleAr && payload.append("titleAr", state.titleAr);
      state.titleEn && payload.append("titleEn", state.titleEn);
      state.descriptionAr && payload.append("descriptionAr", state.descriptionAr);
      state.descriptionEn && payload.append("descriptionEn", state.descriptionEn);
      state.price && payload.append("price", state.price);
      state.period && payload.append("period", state.period);
      state.discountPercentage &&
        payload.append("discountPercentage", state.discountPercentage);

      state.packageFeatures.forEach((item, idx) => {
        // packageFeatures[0][featureEn]
        payload.append(`packageFeatures[${idx}][featureEn]`, item.featureEn);
        payload.append(`packageFeatures[${idx}][featureAr]`, item.featureAr);
      });

      try {
        let res;
        if (props.type == "add") res = await createPackage(payload);
        if (props.type == "edit")
          res = await editPackage(props.currentPackage?.id, payload);

        if (res.data.success) {
          props.type == "add" && showToast({ message: t("toast.success_add_package") });
          props.type == "edit" && showToast({ message: t("toast.success_edit_package") });
          getPackagesData();
          closePopup();
        } else showToast({ type: "error", message: "err" });
      } catch (err) {
        console.error(err);
      }
    } else {
      v$.value.$errors.forEach((err)=>{
        errors[err.$property].state = true
        errors[err.$property].message =  err.$message
      })
    }
  } else {
    try {
      const res = await deletePackage(props.currentPackage?.id);

      if (res.data.success) {
        showToast({ message: t("toast.success_delete_package") });
        getPackagesData();
      } else showToast({ type: "error", message: "err" });
    } catch (err) {
      console.error(err);
    } finally {
      closePopup();
    }
  }
};
const onChangeImage = (e) => {
  const file = e.target.files[0];
  state.image = file;
  imageDisplaying.value = URL.createObjectURL(file);
};

const addFeature = () => {
  const id = `feature_${Date.now()}`;
  state.packageFeatures.push({
    id,
    featureAr: "",
    featureEn: "",
  });
};
const removeFeature = (id) => {
  if (state.packageFeatures.length < 2) return;
  const updatedFeatures = state.packageFeatures.filter((item) => item.id != id);
  state.packageFeatures = updatedFeatures;
};

// hooks
onBeforeMount(() => {
  if (props.type == "edit" &&  props.currentPackage) {


  // packageFeatures: [{ id: "feature_1", featureAr: "", featureEn: "" }],
  imageDisplaying.value = `${BASE_URL}${props.currentPackage?.image}`
  state.titleAr = props.currentPackage?.titleAr;
  state.titleEn = props.currentPackage?.titleEn;
  state.descriptionAr = props.currentPackage?.descriptionAr;
  state.descriptionEn = props.currentPackage?.descriptionEn;
  state.period = props.currentPackage?.period;
  state.price = props.currentPackage?.price;
  state.discountPercentage = props.currentPackage?.discountPercentage;
  state.packageFeatures = props.currentPackage?.PackageFeatures?.map((feature , i)=>{
      return { id: `feature_${i}`, featureAr: feature.featureAr, featureEn: feature.featureEn }
  })

  }
});
</script>

<style></style>
