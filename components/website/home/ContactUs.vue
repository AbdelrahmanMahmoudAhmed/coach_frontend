<template>
  <div class="bg-[--main-card-color] pb-16">
    <div>
      <SectionTitle :title="$t('header.contact_us')" :isColord="false" />
    </div>
    <div class="app-container">
      <div
        class="flex flex-col-reverse justify-center items-center mt-[40px] gap-8 lg:mt-[70px] lg:flex-row lg:gap-16 xl:items-start"
      >
        <div class="w-full lg:w-[65%] 2xl:w-[45%]">
          <form class="w-full" @submit.prevent="sendMessageFun">
            <div class="flex flex-col md:gap-2 md:flex-row xl:gap-3">
              <div class="w-full mb-2 xl:mb-3">
                <input
                  v-model="state.name"
                  class="w-full placeholder:text-[#ffffff82] px-[20px] py-[12px] text-[#fff] outline-none bg-[--secondary-card-color] rounded-md border-[2px] border-transparent text-[16px] sm:text-[18px] md:text-[20px] focus:border-[--main-color]"
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
                  v-model="state.email"
                  class="w-full placeholder:text-[#ffffff82] px-[20px] py-[12px] text-[#fff] outline-none bg-[--secondary-card-color] rounded-md border-[2px] border-transparent text-[16px] sm:text-[18px] md:text-[20px] focus:border-[--main-color]"
                  type="email"
                  :placeholder="$t('auth.email')"
                  autocomplete="off" 
                />
                <p
                  v-if="errors.email.state"
                  class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
                >
                  {{ $t("auth.errors.add_email") }}
                </p>
              </div>
            </div>
            <div class="mb-2 xl:mb-3">
              <input
                v-model="state.title"
                class="placeholder:text-[#ffffff82] w-full px-[20px] py-[12px] text-[#fff] outline-none bg-[--secondary-card-color] rounded-md border-[2px] border-transparent text-[16px] sm:text-[18px] md:text-[20px] focus:border-[--main-color]"
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
                class="placeholder:text-[#ffffff82] min-h-[240px] w-full px-[20px] py-[12px] text-[#fff] outline-none bg-[--secondary-card-color] rounded-md border-[2px] border-transparent text-[16px] sm:text-[18px] md:text-[20px] focus:border-[--main-color]"
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
        <div>
          <img src="../../../assets/imgs/Mail-rafiki.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionTitle from "../home/SectionTitle.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength, minLength } from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
const { locale, locales, setLocale , t } = useI18n();

const { contact } = useRequest();

const state = reactive({
  name: "",
  email: "",
  title: "",
  message: "",
});
const errors = reactive({
  name: {
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
    email: { required, email },
    title: { required },
    message: { required },
  };
});
const v$ = useVuelidate(rules, state);

const sendMessageFun = async () => {
  errors.name.state = false;
  errors.email.state = false;
  errors.title.state = false;
  errors.message.state = false;

  const result = await v$.value.$validate();

  if (result) {
    const payload = {
      fullName: state.name,
      email: state.email,
      title: state.title,
      message: state.message,
    };
    contact(payload)
      .then((res) => {

      })
      .catch((err) => {})
      .finally(() => {
        state.name = "";
        state.email = "";
        state.title = "";
        state.message = "";
      });
  } else {
    errors.name.state = v$.value.name.$error;
    errors.email.state = v$.value.email.$error;
    errors.title.state = v$.value.title.$error;
    errors.message.state = v$.value.message.$error;
  }
};
</script>

<style>
</style>~/composables/useRequest