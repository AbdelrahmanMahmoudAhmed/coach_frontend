<template>
    <div @click.self="closePopup"
      class="popup-holder popup">
      <!-- <div class=" flex justify-center items-center"> -->
      <form @submit.prevent="manageVideoFun"
        class="panel-form ">
     <div @click="closePopup" :class="`${locale == 'ar' ? 'left-4' : 'right-4'} absolute top-4 cursor-pointer`">
      <img class="w-[40px] cursor-pointer" :src="isDark == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'" alt="">
     </div>
        <h3 class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold">
          {{ $t(`admin.actions.${type}_video`) }}
        </h3>
        <div v-if="type != 'delete'" class="flex flex-col justify-center">
          <div class="add-edit-holder"
            v-if="state.link">
            <div class=" rounded-lg overflow-hidden">
                <video
            class="rounded-xl mt-2"
            width="420"
            height="315"
            controls
            :src="state.link"
            :title="state.titleEn"
          >
            Your browser does not support the video tag.
          </video>
            </div>
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto">
      

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
              <input v-model="state.link" :placeholder="$t('auth.video_link')"
                class="panel-input"
                type="text" autocomplete="off" />
            </div>
            <p v-if="errors.link.state"
              class="panel-input-err ">
              {{ $t(`auth.errors.${errors.link.message}`) }}
            </p>
          </div>
        </div>
  
        <div v-else-if="type == 'delete'">
          <div class="text-center font-[900]">
            {{ $t(`admin.actions.delete_video_msg` , {video : locale == "ar" ? currentVideos?.titleAr : currentVideos?.titleEn }) }}
  
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
  const emit = defineEmits(["closePopup", "getVideoData"]);
  const props = defineProps({
    type: String,
    currentVideos: Object,
  });
  const isDark = useCookie("isDark");
  
  import useVuelidate from "@vuelidate/core";
  import {
    required,
    minLength,
    url,
    helpers
  } from "@vuelidate/validators";
  import useRequest from "~/composables/useRequest";
  import DropDownCompVue from "~/components/generic/DropDownComp.vue";
  import showToast from "~/composables/useToast";
  import { useGlobalStore } from "~/stores/global";
    
  const { createVideo, editVideo, deleteVideo } = useRequest();
  const { locale, t } = useI18n();
  const imageDisplaying = ref("");
  
  const state = reactive({
    titleAr:  "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    link:""
  });

  const errors = reactive({
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
    link: {
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
  
      link: { required: helpers.withMessage('add_video_link', required), url: helpers.withMessage('must_url', url) },
    };
  });
  
  const v$ = useVuelidate(rules, state);
  
  const closePopup = () => {
    emit("closePopup");
  };
  
  const getVideoData = () => {
    emit("getVideoData");
  };
  
  const manageVideoFun = async () => {
  
    if (props.type != "delete") {
      errors.titleAr.state = false;
      errors.titleEn.state = false;
      errors.descriptionAr.state = false;
      errors.descriptionEn.state = false;
      errors.link.state = false;
  
      const payload = new FormData();
  
      const result = await v$.value.$validate();
  
      if (result  ) {
        state.titleAr && payload.append("titleAr", state.titleAr);
        state.titleEn && payload.append("titleEn", state.titleEn);
        state.descriptionAr && payload.append("descriptionAr", state.descriptionAr);
        state.descriptionEn && payload.append("descriptionEn", state.descriptionEn);
        state.link && payload.append("link", state.link);
        try {
          let res;
          if (props.type == "add") res = await createVideo(payload);
          if (props.type == "edit")
            res = await editVideo(props.currentVideos?.id, payload);
  
          if (res.data.success) {
            props.type == "add" && showToast({ message: t("toast.success_add_video") });
            props.type == "edit" && showToast({ message: t("toast.success_edit_video") });
            getVideoData();
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
        const res = await deleteVideo(props.currentVideos?.id);
  
        if (res.data.success) {
          showToast({ message: t("toast.success_delete_video") });
          getVideoData();
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
    if (props.type == "edit" &&  props.currentVideos) {

    state.titleAr = props.currentVideos?.titleAr;
    state.titleEn = props.currentVideos?.titleEn;
    state.descriptionAr = props.currentVideos?.descriptionAr;
    state.descriptionEn = props.currentVideos?.descriptionEn;
    state.link = props.currentVideos?.link;
    }
  });
  </script>
  
  <style></style>
  