<template>
  <div @click.self="closePopup" class="popup-holder popup">
    <!-- <div class=" flex justify-center items-center"> -->
    <form @submit.prevent="manageBlogFun" class="panel-form">
      <div
        @click="closePopup"
        :class="`${locale == 'ar' ? 'left-4' : 'right-4'} absolute top-4 cursor-pointer`"
      >
        <img
          class="w-[40px] cursor-pointer"
          :src="isDark == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'"
          alt=""
        />
      </div>
      <h3
        class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
      >
        {{ $t(`admin.actions.${type}_blog`) }}
      </h3>
      <div v-if="type != 'delete'" class="flex flex-col justify-center">
        <div class="add-edit-holder" v-if="state.link">
          <div class="rounded-lg overflow-hidden">
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
        <div class="panel-input-holder ">
          <div class="relative">
            <DropDownCompVue :currentVal="state.type" :placeholder="$t('auth.type')" :options="typeOptions"
              @changeVal="changeVal" mode="single" :locale="locale" :close="true" />
          </div>
          <p v-if="errors.type.state" class="panel-input-err ">
            {{ $t("auth.errors.add_type") }}
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
        <div class="panel-input-holder">
          <div class="relative">
            <input
              v-model="state.link"
              :placeholder="$t('auth.video_link')"
              class="panel-input"
              type="text"
              autocomplete="off"
            />
          </div>
          <p v-if="errors.link.state" class="panel-input-err">
            {{ $t(`auth.errors.${errors.link.message}`) }}
          </p>
        </div>
      </div>

      <div v-else-if="type == 'delete'">
        <div class="text-center font-[900]">
          {{
            $t(`admin.actions.delete_blog_msg`, {
              blog: locale == "ar" ? currentBlog?.titleAr : currentBlog?.titleEn,
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
const emit = defineEmits(["closePopup", "getBolgsData"]);

const props = defineProps({
  type: String,
  currentBlog: Object,
});
const isDark = useCookie("isDark");

import DropDownCompVue from "~/components/generic/DropDownComp.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, url, helpers } from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import showToast from "~/composables/useToast";

const { createBolg, editBolg, deleteBolg } = useRequest();
const { locale, t } = useI18n();

const state = reactive({
  type:"",
  titleAr: "",
  titleEn: "",
  contentAr: "",
  contentEn: "",
  link: "",
});

const errors = reactive({
  type: {
    state: false,
    message: "",
  },
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
  link: {
    state: false,
    message: "",
  },
});

const typeOptions = reactive([
  {name_ar:"مع اضافة رابط فيديو" , name_en:"with video link" , value:"video"},
  {name_ar:"مع اضافة صورة" , name_en:"with image" , value:"pic"},
  {name_ar:"مقال فقط" , name_en:"just text" , value:"text"},

])

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
    },
    contentEn: {
      required: helpers.withMessage("add_content_en", required),
      minLength: helpers.withMessage("at_least_seven", minLength(7)),
    },

    link: {
      required: helpers.withMessage("add_blog_link", required),
      url: helpers.withMessage("must_url", url),
    },
  };
});

const v$ = useVuelidate(rules, state);

const closePopup = () => {
  emit("closePopup");
};

const getBolgsData = () => {
  emit("getBolgsData");
};

const manageBlogFun = async () => {
  if (props.type != "delete") {
    errors.titleAr.state = false;
    errors.titleEn.state = false;
    errors.contentAr.state = false;
    errors.contentEn.state = false;
    errors.link.state = false;

    const payload = new FormData();

    const result = await v$.value.$validate();

    if (result) {
      state.titleAr && payload.append("titleAr", state.titleAr);
      state.titleEn && payload.append("titleEn", state.titleEn);
      state.contentAr && payload.append("contentAr", state.contentAr);
      state.contentEn && payload.append("contentEn", state.contentEn);
      state.link && payload.append("link", state.link);
      try {
        let res;
        if (props.type == "add") res = await createBolg(payload);
        if (props.type == "edit") res = await editBolg(props.currentBlog?.id, payload);

        if (res.data.success) {
          props.type == "add" && showToast({ message: t("toast.success_add_blog") });
          props.type == "edit" && showToast({ message: t("toast.success_edit_blog") });
          getBolgsData();
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
      const res = await deleteBolg(props.currentBlog?.id);

      if (res.data.success) {
        showToast({ message: t("toast.success_delete_blog") });
        getBolgsData();
      } else showToast({ type: "error", message: "err" });
    } catch (err) {
      console.error(err);
    } finally {
      closePopup();
    }
  }
};

// hooks
onBeforeMount(() => {
  if (props.type == "edit" && props.currentBlog) {
    state.titleAr = props.currentBlog?.titleAr;
    state.titleEn = props.currentBlog?.titleEn;
    state.contentAr = props.currentBlog?.contentAr;
    state.contentEn = props.currentBlog?.contentEn;
    state.link = props.currentBlog?.link;
    state.type = props.currentBlog?.type;
  }
});
</script>

<style></style>
