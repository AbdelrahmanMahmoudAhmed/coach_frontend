<template>
  <div class="app-container min-h-[50vh] bg-[--trans-color] p-[40px] lg:pt-[110px] lg:pb-[120px] dark:bg-[unset]">
    <div class="flex flex-col items-center lg:flex-row justify-center gap-12">
      <div>
        <h1
          class="text-center pb-[18px] font-bold text-[20px] xs:text-[26px] md:text-[36px] lg:text-[42px] xl:text-[50px]">
          {{ $t("auth.forget_password") }}!
        </h1>
        <p class="pb-[20px] text-[#677A8A] text-center text-[12px] max-w-[480px] xs:text-[15px] dark:text-[#FFFFFFC2]">
          {{ $t('global.forget_password_p') }}
        </p>
        <form @submit.prevent="sendForgetPasswordFun" class="flex flex-col justify-center">
          <div class="w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <img v-if="errors.email.icon" :class="`${locale == 'ar'
              ? 'right-[18px] sm:right-[32px]'
              : 'left-[18px] sm:left-[32px]'
            } absolute z-10 top-[17px] w-[18px] h-[18px]`" src="../assets/imgs/auth/email.png" alt="" />
              <img v-else :class="`${locale == 'ar'
              ? 'right-[18px] sm:right-[32px]'
              : 'left-[18px] sm:left-[32px]'
            } absolute z-10 top-[17px] w-[18px] h-[18px]`" src="../assets/imgs/auth/emailDisable.png" alt="" />

              <input @blur="() => disabledIconFun('email')" @focus="() => focusedIconFun('email')" v-model="state.email"
                :placeholder="$t('auth.email')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[45px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px] sm:px-[60px]"
                type="email" autocomplete="off" />
            </div>
            <p v-if="errors.email.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_email") }}
            </p>
          </div>

          <button
            class="mt-[15px] max-w-[440px] mx-auto bg-[--main-color] text-[#fff] w-full h-[50px] flex justify-center items-center uppercase font-bold rounded-[46px] text-[12px] xs:text-[14px] sm:text-[16px] md:text[21px]"
            type="submit">
            {{ $t("auth.reset_password") }}
          </button>
        </form>
      </div>
      <div class="max-w-[540px]">
        <img src="../assets/imgs/auth/reset_password.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-pages-guard",
});
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength, minLength } from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import showToast from '~/composables/useToast'

const { locale, locales, setLocale, t } = useI18n();
const { sendForgetPassword } = useRequest()
const router = useRouter();
const route = useRoute()

const state = reactive({
  email: "",
});

const errors = reactive({
  email: {
    state: false,
    icon: false,
  },
});
const rules = computed(() => {
  return {
    email: { required, email },
  };
});
const v$ = useVuelidate(rules, state);

const focusedIconFun = (name) => {
  errors[name].icon = true;
};
const disabledIconFun = (name) => {
  errors[name].icon = false;
};

const sendForgetPasswordFun = async () => {

  errors.email.state = false;

  const result = await v$.value.$validate();
  if (result) {
    const payload = {
      email: state.email,
    };
    try {
      const res = await sendForgetPassword(payload)
      showToast({ message: t('toast.success_forget') });

    } catch (err) {
      console.error(err)
    } finally {
      state.email = ''
    }
  } else {
    errors.email.state = v$.value.email.$error;
  }


};
</script>

<style></style>~/composables/useRequest