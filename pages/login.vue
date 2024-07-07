<template>
  <div class="app-container min-h-[50vh] bg-[--trans-color] p-[40px] lg:pt-[110px] lg:pb-[120px] dark:bg-[unset]">
    <div>
      <div>
        <h1
          class="text-center pb-[18px] font-bold text-[20px] xs:text-[26px] md:text-[36px] lg:text-[42px] xl:text-[50px]">
          {{ $t("auth.login") }}
        </h1>

        <form @submit.prevent="loginFun" class="flex flex-col justify-center">
          <div class="panel-input-holder ">
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
          <div class="panel-input-holder ">
            <div class="relative">
              <img v-if="errors.password.icon" :class="`${locale == 'ar'
            ? 'right-[18px] sm:right-[32px]'
            : 'left-[18px] sm:left-[32px]'
            } absolute z-10 top-[17px] w-[18px] h-[18px]`" src="../assets/imgs/auth/locked.svg" alt="" />
              <img v-else :class="`${locale == 'ar'
            ? 'right-[18px] sm:right-[32px]'
            : 'left-[18px] sm:left-[32px]'
            } absolute z-10 top-[17px] w-[18px] h-[18px]`" src="../assets/imgs/auth/lockedDisabled.svg" alt="" />

              <div @click="() => changeInputType('password')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'
            } cursor-pointer absolute top-[15px] `">
                <img v-if="errors.password.isVisible" src="../assets/imgs/hide.svg" alt="" />
                <img v-else src="../assets/imgs/unhide.svg" alt="" />
              </div>
              <input @blur="() => disabledIconFun('password')" @focus="() => focusedIconFun('password')"
                v-model="state.password" :placeholder="$t('auth.password')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[45px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px] sm:px-[60px]"
                :type="errors.password.isVisible ? 'text' : 'password'" autocomplete="off" />
            </div>
            <p v-if="errors.password.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_password") }}
            </p>
          </div>

          <button
            class="mt-[15px] max-w-[440px] mx-auto bg-[--main-color] text-[#fff] w-full h-[50px] flex justify-center items-center uppercase font-bold rounded-[46px] text-[12px] xs:text-[14px] sm:text-[16px] md:text[21px]"
            type="submit">
            {{ $t("auth.login") }}
          </button>
        </form>
        <div class="pt-[20px] lg:pt-[30px]">
          <span
            class="block text-center font-bold uppercase text-[--main-color] text-[16px] xs:text-[18px] sm:text-[20px]">
            <NuxtLink to="/forget-password">
              {{ $t("auth.forget_password") }}{{ locale == "ar" ? "؟" : "?" }}</NuxtLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-pages-guard",
});
import { useGlobalStore } from "../stores/global";
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength, minLength } from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import showToast from "~/composables/useToast";
import { saveUserData } from "~/composables/useAuth";
import { storeToRefs } from 'pinia'


const router = useRouter();
const global = useGlobalStore();
const globalRef = storeToRefs(global)
const { locale, locales, setLocale, t } = useI18n();
const { login } = useRequest();
const { token } = useGlobalStore()



const state = reactive({
  email: "",
  password: "",
});
const errors = reactive({
  email: {
    state: false,
    icon: false,
  },

  password: {
    state: false,
    icon: false,
    isVisible: false,
  },
});

const changeInputType = (type) => {
  errors[type].isVisible = !errors[type].isVisible;
};
const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, maxLength: maxLength(50), minLength: minLength(6) },
  };
});
const v$ = useVuelidate(rules, state);

const loginFun = async () => {
  errors.email.state = false;
  errors.password.state = false;

  const result = await v$.value.$validate();
  if (result) {

    const payload = {
      email: state.email,
      password: state.password,
    };

    try {
      const res = await login(payload)
      const userData = {
        type: 'client',
        role: 'client',
        userInfo: res.data.data,
        token: res.data.token,
      }

      saveUserData(userData); // saving data on the cookies and state management
      showToast({ message: t('toast.login') });
      router.push("/");
    } catch (err) {
      console.error("err", err);
    }

  } else {
    errors.email.state = v$.value.email.$error;
    errors.password.state = v$.value.password.$error;
  }
};

const focusedIconFun = (name) => {
  errors[name].icon = true;
};
const disabledIconFun = (name) => {
  errors[name].icon = false;
};
</script>

<style></style>
~/composables/useRequest