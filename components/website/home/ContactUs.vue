<template>
  <div class="bg-[--third-color] pb-16 relative h-fit ">
    <div class=" absolute top-0 left-0 h-full w-full z-10">
      <img class="block h-full w-full object-cover" src="/imgs/contact.jpg" alt="">
    </div>
    <div class=" absolute top-0 left-0 h-full w-full bg-[--third-color-opacity] z-20"></div>
<div class="relative z-20">
  <div>
      <SectionTitle :title="$t('header.contact_us')" :isColored="false" />
    </div>
    <div class="app-container">
      <div
        class="flex flex-col-reverse justify-center items-center mt-[40px] gap-8 lg:mt-[70px] lg:flex-row lg:gap-16 xl:items-start"
      >
        <div class="w-full lg:w-[75%] ">
          <form class="w-full" @submit.prevent="sendMessageFun">
            <div class="flex flex-col md:gap-2 md:flex-row xl:gap-3">
              <div class="w-full mb-2 xl:mb-3">
                <input
                  v-model="state.name"
                  class="w-full placeholder:text-[#ffffff82] px-[20px] py-[12px] text-[#fff] outline-none bg-[--secondary-color] rounded-md border border-[--main-color] text-[16px] sm:text-[18px] md:text-[20px] focus:border-[3px] "
                  type="text"
                  :placeholder="$t('auth.name')"
                />
                <p
                  v-if="errors.name.state"
                  class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
                >
                  {{ $t("auth.errors.add_name") }}
                </p>
              </div>
              <div class="w-full mb-2 xl:mb-3">
                <input
                  v-model="state.phone"
                  class="w-full placeholder:text-[#ffffff82] px-[20px] py-[12px] text-[#fff] outline-none bg-[--secondary-color] rounded-md border border-[--main-color] text-[16px] sm:text-[18px] md:text-[20px] focus:border-[3px] "                  type="text"
                  :placeholder="$t('auth.phone')"
                  autocomplete="off" 
                />
                <p
                  v-if="errors.phone.state"
                  class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
                >
                  {{ $t("auth.errors.add_phone") }}
                </p>
              </div>
            </div>
            <div class="mb-2 xl:mb-3">
              <input
                v-model="state.email"
                class="w-full placeholder:text-[#ffffff82] px-[20px] py-[12px] text-[#fff] outline-none bg-[--secondary-color] rounded-md border border-[--main-color] text-[16px] sm:text-[18px] md:text-[20px] focus:border-[3px] " 
                type="email"
                :placeholder="$t('auth.email')"
              />
              <p
                v-if="errors.email.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.add_email") }}
              </p>
            </div>
            <div class="mb-2 xl:mb-3">
              <input
                v-model="state.title"
                class="w-full placeholder:text-[#ffffff82] px-[20px] py-[12px] text-[#fff] outline-none bg-[--secondary-color] rounded-md border border-[--main-color] text-[16px] sm:text-[18px] md:text-[20px] focus:border-[3px] " 
                type="text"
                :placeholder="$t('auth.title')"
              />
              <p
                v-if="errors.title.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.add_title") }}
              </p>
            </div>
            <div class="mb-2 xl:mb-3">
              <textarea
                v-model="state.message"
                class="placeholder:text-[#ffffff82] min-h-[240px] w-full px-[20px] py-[12px] text-[#fff] outline-none bg-[--secondary-color] rounded-md border border-[--main-color] text-[16px] sm:text-[18px] md:text-[20px] focus:border-[3px] "
                type="text"
                :placeholder="$t('auth.message')"
              ></textarea>
              <p
                v-if="errors.message.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.add_message") }}
              </p>
            </div>
            <div>
              <button
                type="submit"
                class="bg-[--main-color] text-[#fff] uppercase rounded-lg block py-2 px-6 m-auto font-[600] text-[18px] sm:text-[20px] lg:m-[unset] 2xl:text-[26px] 2xl:py-3 2xl:px-12"
              >
                {{ $t("auth.send") }}
              </button>
            </div>
          </form>
        </div>
   
      </div>
    </div>
</div>
  </div>
</template>

<script setup>
import SectionTitle from "../home/SectionTitle.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength, minLength , numeric} from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";
import showToast from "~/composables/useToast";

const { locale, locales, setLocale , t } = useI18n();
const global = useGlobalStore()
const { contactUs } = useRequest();

const state = reactive({
  name: "",
  email: "",
  phone:"",
  title: "",
  message: "",
});
const errors = reactive({
  name: {
    state: false,
  },
  phone: {
    state: false,
  },
  email: {
    state: false,
  },
  title: {
    state: false,
  },
  message: {
    state: false,
  },
});
const rules = computed(() => {
  return {
    name: { required },
    phone: { required , numeric , minLength:minLength(7) },
    email: { required, email },
    title: { required },
    message: { required },
  };
});
const v$ = useVuelidate(rules, state);

const sendMessageFun = async () => {



  errors.name.state = false;
  errors.phone.state = false;
  errors.email.state = false;
  errors.title.state = false;
  errors.message.state = false;

  const result = await v$.value.$validate();

  if (result) {
  global.turnLoaderOn();

    const payload = {
      name: state.name,
      phone: state.phone,
      email: state.email,
      title: state.title,
      message: state.message,
    };
    contactUs(payload)
      .then((res) => {
        if(res.data.success){
          showToast({ message: t("toast.success_contact") })

        }else{
        showToast({ type: "error", message: t("toast.something_wrong") });

        }
      })
      .catch((err) => {
        console.error(err)
        showToast({ type: "error", message: t("toast.something_wrong") });
      })
      .finally(() => {
        global.turnLoaderOff();

        state.name = "";
        state.phone = "";
        state.email = "";
        state.title = "";
        state.message = "";
      });
  } else {
    errors.name.state = v$.value.name.$error;
    errors.phone.state = v$.value.phone.$error;
    errors.email.state = v$.value.email.$error;
    errors.title.state = v$.value.title.$error;
    errors.message.state = v$.value.message.$error;
  }
};
</script>

<style>
</style>