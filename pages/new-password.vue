<template>
  <div
    class="app-container min-h-[50vh] bg-[--trans-color] p-[40px] lg:pt-[110px] lg:pb-[120px] dark:bg-[unset]"
  >
    <div class="flex flex-col items-center lg:flex-row justify-center gap-12">
      <div>
        <h1
          class="text-center pb-[18px] font-bold text-[20px] xs:text-[26px] md:text-[36px] lg:text-[42px] xl:text-[50px]"
        >
          {{ $t("auth.new_password") }}!
        </h1>
        <p
          class="pb-[20px] text-[#677A8A] text-center text-[12px] max-w-[480px] xs:text-[15px] dark:text-[#FFFFFFC2]"
        >
        {{ $t('global.reset_password_p') }}
        </p>
        <form
        :autocomplete="'off'"
          @submit.prevent="sendForgetPasswordFun"
          class="flex flex-col justify-center"
        >
          <div class="w-full flex flex-col justify-center max-w-[440px] m-auto mb-[8px]">
            <div class="relative">
              <div @click="()=>changeInputType('password')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'} cursor-pointer absolute top-[15px] `">
    <img v-if="errors.password.isVisible" src="../assets/imgs/hide.svg" alt="">
    <img v-else src="../assets/imgs/unhide.svg" alt="">

  </div>
              <input
              autocomplete="off" 
                v-model="state.password"
                :placeholder="$t('auth.password')"
                :class="` ${ locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'} text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
                :type="errors.password.isVisible ? 'text':'password'"
                
              />
            </div>
            <p
              v-if="errors.password.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
            >
              {{ $t("auth.errors.add_password") }}
            </p>
          </div>
          <div class="w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <div @click="()=>changeInputType('passwordConfirmation')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'} cursor-pointer absolute top-[15px] `">
    <img v-if="errors.passwordConfirmation.isVisible" src="../assets/imgs/hide.svg" alt="">
    <img v-else src="../assets/imgs/unhide.svg" alt="">

  </div>
              <input
          
                v-model="state.passwordConfirmation"
                :placeholder="$t('auth.confirm_password')"
                :class="` ${ locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'} text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
                :type="errors.passwordConfirmation.isVisible ? 'text':'password'"
                autocomplete="off" 
                
              />
            </div>
            <p
              v-if="errors.passwordConfirmation.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
            >
              {{ $t("auth.errors.add_password_confirmation") }}
            </p>
          </div>

          <button
            class="mt-[15px] max-w-[440px] mx-auto bg-[--main-color] text-[#fff] w-full h-[50px] flex justify-center items-center uppercase font-bold rounded-[46px] text-[12px] xs:text-[14px] sm:text-[16px] md:text[21px]"
            type="submit"
          >
            {{ $t("auth.new_password") }}
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
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength } from "@vuelidate/validators";
import useRequist from "~/composables/useRequist";


const route = useRoute();
const router = useRouter();
const  { forgetPassword } = useRequist()
const { locale, locales, setLocale , t } = useI18n();
const state = reactive({
  password: "",
  passwordConfirmation: "",
});
const errors = reactive({
  password: {
    state: false,
    isVisible:false

  },
  passwordConfirmation: {
    state: false,
    isVisible:false

  },
});
const rules = computed(() => {
  return {
    password: { required, maxLength: maxLength(50), minLength: minLength(6) },
    passwordConfirmation: {
      required,
      maxLength: maxLength(50),
      minLength: minLength(6),
    },
  };
});


const changeInputType =(type)=>{
  errors[type].isVisible = ! errors[type].isVisible 
}


const v$ = useVuelidate(rules, state);

const sendForgetPasswordFun = async () => {

  errors.password.state = false;
  errors.passwordConfirmation.state = false;

  const result = await v$.value.$validate();
  if (result) {
    const payload = {
      password: state.password,
      token: route.query?.token,
    };
    forgetPassword(payload)
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {})
      .finally(() => {
        state.password = "";
        state.passwordConfirmation = "";
      });



  } else {
    errors.password.state = v$.value.password.$error;
    errors.passwordConfirmation.state = v$.value.passwordConfirmation.$error;
  }


};


onMounted(()=>{

})
</script>

<style>
</style>