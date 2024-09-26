<template>
    <div @click.self="closePopup" class="popup-holder popup">
      <!-- <div class=" flex justify-center items-center"> -->
      <form @submit.prevent="manageTestimonialsFun" class="panel-form">
        <div @click="closePopup" :class="`${locale == 'ar' ? 'left-4' : 'right-4'
      } absolute top-4 cursor-pointer`">
          <img class="w-[40px] cursor-pointer" :src="isDark == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'
      " alt="" />
        </div>
        <h3 class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold">
          {{ $t(`admin.actions.${type}_testimonial`) }}
        </h3>
        <div v-if="type != 'delete'" class="flex flex-col justify-center">
          <div class="add-edit-holder" v-if="imageDisplaying">
            <div class="max-w-[200px] rounded-lg overflow-hidden">
              <img :src="imageDisplaying" alt="testimonial image" />
            </div>
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto">
            <div class="relative">
              <label class="px-[30px] mb-1" for="">{{ $t("auth.testimonial_img") }}</label>
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
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto"></div>
  
  
          <div class="panel-input-holder">
            <div class="relative">
              <textarea v-model="state.descriptionAr" :placeholder="$t('auth.description_ar')"
                class="panel-input h-[100px] px-6 py-2" type="text" autocomplete="off"></textarea>
            </div>
            <p v-if="errors.descriptionAr.state" class="panel-input-err">
              {{ $t(`auth.errors.${errors.descriptionAr.message}`) }}
            </p>
          </div>
          <div class="panel-input-holder">
            <div class="relative">
              <textarea v-model="state.descriptionEn" :placeholder="$t('auth.description_en')"
                class="panel-input h-[100px] px-6 py-2" type="text" autocomplete="off"></textarea>
            </div>
            <p v-if="errors.descriptionEn.state" class="panel-input-err">
              {{ $t(`auth.errors.${errors.descriptionEn.message}`) }}
            </p>
          </div>
  
        </div>
  
        <div v-else-if="type == 'delete'">
          <div class="text-center font-[900]">
            {{
      $t(`admin.actions.delete_testimonial_msg`, { testimonial: currentTestimonila?.id })
    }}
          </div>
        </div>
  
        <div class="popup-actions-holder">
          <button @click="closePopup" type="button" class="panel-cancel-btn">
            {{ $t(`admin.actions.cancel`) }}
          </button>
          <button type="submit" :class="`${type == 'delete'
        ? ' bg-red-800 hover:bg-red-600'
        : 'bg-[#2FA3F7] hover:bg-[#62b4ef]'
      }  rounded-[21px] h-[40px] px-[23px] w-full sm:w-fit`">
            {{ $t(`admin.actions.${type}`) }}
          </button>
        </div>
      </form>
    </div>
    <!-- </div> -->
  </template>
  
  <script setup>
  const emit = defineEmits(["closePopup", "getTestimonialsData"]);
  const props = defineProps({
    type: String,
    currentTestimonila: Object,
  });
  const isDark = useCookie("isDark");
  
  import useVuelidate from "@vuelidate/core";
  import { required, maxLength, minLength, requiredIf, helpers } from "@vuelidate/validators";
  import useRequest from "~/composables/useRequest";
  import showToast from "~/composables/useToast";
  
  const config = useRuntimeConfig();
  const BASE_URL = config.public.base_url;
  const { createTestimonial, editTestimonial, deleteTestimonial } =
    useRequest();
  const { locale, t } = useI18n();
  const imageDisplaying = ref("");
  
  const state = reactive({
  
    descriptionAr: "",
    descriptionEn: "",
    image: "",
  });
  
  const errors = reactive({
  
    descriptionAr: {
      state: false,
      message: "",
    },
    descriptionEn: {
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
      descriptionAr: {
        required: helpers.withMessage("required", required),
        minLength: helpers.withMessage("at_least_seven", minLength(7)),
        maxLength: helpers.withMessage("max_length", maxLength(255)),
      },
      descriptionEn: {
        required: helpers.withMessage("required", required),
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
  
  const getTestimonialsData = () => {
    emit("getTestimonialsData");
  };
  
  const manageTestimonialsFun = async () => {
    if (props.type != "delete") {
  
      errors.descriptionAr.state = false;
      errors.descriptionEn.state = false;
      errors.image.state = false;
  
      const payload = new FormData();
  
      const result = await v$.value.$validate();
  
      if (result) {
  
        // if (props.type == "add" && state.image) return
  
        state.descriptionAr && payload.append("descriptionAr", state.descriptionAr);
        state.descriptionEn && payload.append("descriptionEn", state.descriptionEn);
        state.image && payload.append("image", state.image);
        try {
          let res;
          if (props.type == "add") res = await createTestimonial(payload);
          if (props.type == "edit")
            res = await editTestimonial(
              props.currentTestimonila?.id,
              payload
            );
  
          if (res.data.success) {
            props.type == "add" &&
              showToast({ message: t("toast.success_add_testimonial") });
            props.type == "edit" &&
              showToast({ message: t("toast.success_edit_testimonial") });
            getTestimonialsData();
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
        const res = await deleteTestimonial(props.currentTestimonila?.id);
  
        if (res.data.success) {
          showToast({ message: t("toast.success_delete_testimonial") });
          getTestimonialsData();
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
    if (props.type == "edit" && props.currentTestimonila) {
  
      state.descriptionAr = props.currentTestimonila?.descriptionAr;
      state.descriptionEn = props.currentTestimonila?.descriptionEn;
      imageDisplaying.value = `${BASE_URL}${props.currentTestimonila?.image}`;
    }
  });
  </script>
  
  <style></style>