<template>
  <div @click.self="closePopup" class="popup-holder popup">
    <!-- <div class=" flex justify-center items-center"> -->
    <form @submit.prevent="manageCertificationFun" class="panel-form">
      <div
        @click="closePopup"
        :class="`${
          locale == 'ar' ? 'left-4' : 'right-4'
        } absolute top-4 cursor-pointer`"
      >
        <img
          class="w-[40px] cursor-pointer"
          :src="
            isDark == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'
          "
          alt=""
        />
      </div>
      <h3
        class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
      >
        {{ $t(`admin.actions.${type}_certification`) }}
      </h3>
      <div v-if="type != 'delete'" class="flex flex-col justify-center">
        <div class="add-edit-holder" v-if="imageDisplaying">
          <div class="max-w-[200px] rounded-lg overflow-hidden">
            <img :src="imageDisplaying" alt="certification image" />
          </div>
        </div>
        <div class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto">
          <div class="relative">
            <label class="px-[30px] mb-1" for="">{{ $t("auth.certification_img") }}</label>
            <input @change="onChangeImage"
              class="py-[9px] text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#c1abab] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
              type="file" />
          </div>
          <p v-if="errors.image.state" class="panel-input-err ">
            {{ $t("auth.errors.add_image") }}
          </p>
          <p v-if="errors.realImage.state" class="panel-input-err ">
            {{ $t("auth.errors.add_real_image") }}
          </p>
        </div>
        <div
          class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto"
        ></div>
        <div class="panel-input-holder">
          <div class="relative">
            <input
              v-model="state.titleAr"
              :placeholder="$t('auth.title_ar')"
              class="panel-input"
              type="text"
            />
          </div>
          <p v-if="errors.titleAr.state" class="panel-input-err">
            {{ $t(`auth.errors.${errors.titleAr.message}`) }}
          </p>
        </div>
        <div class="panel-input-holder">
          <div class="relative">
            <input
              v-model="state.titleEn"
              :placeholder="$t('auth.title_en')"
              class="panel-input"
              type="text"
            />
          </div>
          <p v-if="errors.titleEn.state" class="panel-input-err">
            {{ $t(`auth.errors.${errors.titleEn.message}`) }}
          </p>
        </div>
        <div class="panel-input-holder">
          <div class="relative">
            <textarea
              v-model="state.contentAr"
              :placeholder="$t('auth.content_ar')"
              class="panel-input h-[100px] px-6 py-2"
              type="text"
              autocomplete="off"
            ></textarea>
          </div>
          <p v-if="errors.contentAr.state" class="panel-input-err">
            {{ $t(`auth.errors.${errors.contentAr.message}`) }}
          </p>
        </div>
        <div class="panel-input-holder">
          <div class="relative">
            <textarea
              v-model="state.contentEn"
              :placeholder="$t('auth.content_en')"
              class="panel-input h-[100px] px-6 py-2"
              type="text"
              autocomplete="off"
            ></textarea>
          </div>
          <p v-if="errors.contentEn.state" class="panel-input-err">
            {{ $t(`auth.errors.${errors.contentEn.message}`) }}
          </p>
        </div>
  
      </div>

      <div v-else-if="type == 'delete'">
        <div class="text-center font-[900]">
          {{
            $t(`admin.actions.delete_certification_msg`, {
                certification:
                locale == "ar"
                  ? currentCertifications?.titleAr
                  : currentCertifications?.titleEn,
            })
          }}
        </div>
      </div>

      <div class="popup-actions-holder">
        <button @click="closePopup" type="button" class="panel-cancel-btn">
          {{ $t(`admin.actions.cancel`) }}
        </button>
        <button
          type="submit"
          :class="`${
            type == 'delete'
              ? ' bg-red-800 hover:bg-red-600'
              : 'bg-[#2FA3F7] hover:bg-[#62b4ef]'
          }  rounded-[21px] h-[40px] px-[23px] w-full sm:w-fit`"
        >
          {{ $t(`admin.actions.${type}`) }}
        </button>
      </div>
    </form>
  </div>
  <!-- </div> -->
</template>
  
  <script setup>
const emit = defineEmits(["closePopup", "getCertificationData"]);
const props = defineProps({
  type: String,
  currentCertifications: Object,
});
const isDark = useCookie("isDark");

import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, requiredIf, helpers } from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import showToast from "~/composables/useToast";

const config = useRuntimeConfig();
const BASE_URL = config.public.base_url;
const { createCertification, editCertification, deleteCertification } =
  useRequest();
const { locale, t } = useI18n();
const imageDisplaying = ref("");

const state = reactive({
  titleAr: "",
  titleEn: "",
  contentAr: "",
  contentEn: "",
  image: "",
});

const errors = reactive({
  titleAr: {
    state: false,
    message: "",
  },
  titleEn: {
    state: false,
    message: "",
  },
  contentAr: {
    state: false,
    message: "",
  },
  contentEn: {
    state: false,
    message: "",
  },
  image: {
    state: false,
    message: "",
  },
  realImage: {
    state: false,
    message: "",
  },
});

const rules = computed(() => {
  return {
    titleAr: {
      required: helpers.withMessage("add_title_ar", required),
      minLength: helpers.withMessage("at_least_three", minLength(3)),
    },
    titleEn: {
      required: helpers.withMessage("add_title_en", required),
      minLength: helpers.withMessage("at_least_three", minLength(3)),
    },
    contentAr: {
      required: helpers.withMessage("add_content_ar", required),
      minLength: helpers.withMessage("at_least_seven", minLength(7)),
      maxLength: helpers.withMessage("max_length", maxLength(255)), 
    },
    contentEn: {
      required: helpers.withMessage("add_content_en", required),
      minLength: helpers.withMessage("at_least_seven", minLength(7)),
      maxLength: helpers.withMessage("max_length", maxLength(255)), 
    },

    required: requiredIf(function (nestedModel) {
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']; // Add more MIME types as needed
      if (!state.image && props.type == 'edit') {
        errors.image.state = false
        errors.realImage.state = false;
        return false
      }
      if (!state.image) {
        errors.image.state = true
        errors.realImage.state = false;
        return true
      }
      else if (allowedMimeTypes.includes(nestedModel.image.type)) {
        errors.image.state = false
        errors.realImage.state = false;
        // Accept the file
        return false
      } else {
        // Reject the file
        errors.realImage.state = true;
        errors.image.state = false
        return true
      }
    }),

  };
});

const v$ = useVuelidate(rules, state);

const closePopup = () => {
  emit("closePopup");
};

const getCertificationData = () => {
  emit("getCertificationData");
};

const manageCertificationFun = async () => {
  if (props.type != "delete") {
    errors.titleAr.state = false;
    errors.titleEn.state = false;
    errors.contentAr.state = false;
    errors.contentEn.state = false;
    errors.image.state = false;

    const payload = new FormData();

    const result = await v$.value.$validate();

    if (result ) {
      if(props.type == "add" && state.image) return

      state.titleAr && payload.append("titleAr", state.titleAr);
      state.titleEn && payload.append("titleEn", state.titleEn);
      state.contentAr && payload.append("contentAr", state.contentAr);
      state.contentEn && payload.append("contentEn", state.contentEn);
      state.image && payload.append("image", state.image);
      try {
        let res;
        if (props.type == "add") res = await createCertification(payload);
        if (props.type == "edit")
          res = await editCertification(
            props.currentCertifications?.id,
            payload
          );

        if (res.data.success) {
          props.type == "add" &&
            showToast({ message: t("toast.success_add_certification") });
          props.type == "edit" &&
            showToast({ message: t("toast.success_edit_certification") });
          getCertificationData();
          closePopup();
        } else showToast({ type: "error", message: "err" });
      } catch (err) {
        console.error(err);
      }
    } else {
      v$.value.$errors.forEach((err) => {
        errors[err.$property].state = true;
        errors[err.$property].message = err.$message;
      });
    }
  } else {
    try {
      const res = await deleteCertification(props.currentCertifications?.id);

      if (res.data.success) {
        showToast({ message: t("toast.success_delete_certification") });
        getCertificationData();
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

// hooks
onBeforeMount(() => {
  if (props.type == "edit" && props.currentCertifications) {
    state.titleAr = props.currentCertifications?.titleAr;
    state.titleEn = props.currentCertifications?.titleEn;
    state.contentAr = props.currentCertifications?.contentAr;
    state.contentEn = props.currentCertifications?.contentEn;
    imageDisplaying.value = `${BASE_URL}${props.currentCertifications?.image}`;  
}
});
</script>
  
  <style></style>
  