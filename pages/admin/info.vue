<template>
  
  <div class="pb-16">
    <h1
      class="text-center font-bold text-[18px] mb-3 sm:text-[26px] lg:text-[32px]"
    >
      {{ $t("user.user_info") }}
    </h1>
    <div class="">
      <div
        class="flex flex-col justify-center items-center gap-8 lg:mt-[50px] lg:gap-16"
      >
        <div>
          <div
          v-if="adminName"
            class="text-[12px] flex gap-2 xs:text-[16px] sm:text-[22px] sm:gap-4"
          >
            <span class="text-[#0000007d] text-nowrap dark:text-[#ffffff82]">{{
              $t("auth.name")
            }}</span
            ><span  class="">{{ adminName }}</span>
          </div>

          <div
          v-if="adminEmail"
            class="text-[12px] flex gap-2 xs:text-[16px] sm:text-[22px] sm:gap-4"
          >
            <span class="text-[#0000007d] text-nowrap dark:text-[#ffffff82]">{{
              $t("auth.email")
            }}</span
            ><span class="">{{ adminEmail }}</span>
          </div>

    

        </div>
        <div class="w-full">
          <h1
            class="text-center font-bold text-[18px] mb-6 sm:text-[26px] lg:text-[32px]"
          >
            {{ $t("user.change_info") }}
          </h1>

          <form @submit.prevent="updateAdminData" class="w-full">
            <div
              class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto"
            >
              <div class="relative">
                <input
                  v-model="state.name"
                  :placeholder="$t('auth.name')"
                  class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                  type="text"
                />
              </div>
              <p
                v-if="errors.name.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.add_name") }}
              </p>
            </div>
            <div
              class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto"
            >
              <div class="relative">
                <input
                  v-model="state.email"
                  :placeholder="$t('auth.email')"
                  class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                  type="email"
                  autocomplete="off" 
                />
              </div>
              <p
                v-if="errors.email.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.add_email") }}
              </p>
            </div>
            <div
              class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto"
            >
              <div class="relative">
                <div @click="()=>changeInputType('password')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'} cursor-pointer absolute top-[15px] `">
    <img v-if="errors.password.isVisible" src="../../assets/imgs/hide.svg" alt="">
    <img v-else src="../../assets/imgs/unhide.svg" alt="">

  </div>
                <input
                  v-model="state.password"
                  :placeholder="$t('auth.new_password')"
                  :class=" `${ locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'} text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
                  :type="errors.password.isVisible ? 'text':'password'"
                  autocomplete="off" 
                />
              </div>
              <p
                v-if="errors.password.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.add_password") }}
              </p>
            </div>

            <div
              class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto"
            >
              <div class="relative">
                <div @click="()=>changeInputType('passwordConfirmation')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'} cursor-pointer absolute top-[15px] `">
    <img v-if="errors.passwordConfirmation.isVisible" src="../../assets/imgs/hide.svg" alt="">
    <img v-else src="../../assets/imgs/unhide.svg" alt="">

  </div>
                <input
                  v-model="state.passwordConfirmation"
                  :placeholder="$t('auth.confirm_password')"
                  :class="`  ${ locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'} text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
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
              class="mt-[15px] max-w-[700px] mx-auto bg-[--main-color] text-[#fff] w-full h-[50px] flex justify-center items-center uppercase font-bold rounded-[46px] text-[12px] xs:text-[14px] sm:text-[16px] md:text[21px]"
              type="submit"
            >
              {{ $t("auth.change_info") }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "panel",
  middleware: "admin-guard",
});
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength, minLength } from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";


const global = useGlobalStore()
const { locale, locales, setLocale, t } = useI18n();
const { editCurrentAdmin , adminData } = useRequest();


const userInfo = useCookie('userInfo')
const adminName = ref();
const adminEmail = ref();


const getAdminData = ( ) =>{
  global.turnLoaderOn()
  adminData().then((res)=>{
    adminName.value = res.data?.data?.name;
    adminEmail.value = res.data?.data?.email;
  }).catch(console.error).finally(()=>{
    global.turnLoaderOff()
  })
}












const state = reactive({
  name: "",
  email: "",
  // old_password:"",
  password: "",
  passwordConfirmation: "",
});
const errors = reactive({
  name: {
    state: false,
  },
  email: {
    state: false,
  },

  // old_password:{
  //   state: false,

  // },
  password: {
    state: false,
    isVisible:false

  },
  passwordConfirmation: {
    state: false,
    isVisible:false

  },
});

const changeInputType =(type)=>{
  errors[type].isVisible = ! errors[type].isVisible 
}
const rules = computed(() => {
  return {
    name: {  },
    email: {  email },
    // old_password: { required : (state.old_password || state.password || state.passwordConfirmation )&& required, maxLength: maxLength(50), minLength: minLength(6) },
    password: { required : ( state.password || state.passwordConfirmation )&& required, maxLength: maxLength(50), minLength: minLength(6) },
    passwordConfirmation: { required : ( state.password || state.passwordConfirmation )&& required, maxLength: maxLength(50), minLength: minLength(6) },
  };
});
const v$ = useVuelidate(rules, state);

const updateAdminData = async () => {
  errors.name.state = false;
  errors.email.state = false;
  // errors.old_password.state = false;
  errors.password.state = false;
  errors.passwordConfirmation.state = false;

  const result = await v$.value.$validate();

  if (result) {
    const payload = {

};

state.name && (payload.name = state.name)
state.email && (payload.email = state.email)
state.password && (payload.password = state.password)

// change the new data on the local storage , cookies and memory

const oldUserData = localStorage.getItem('auth');
const parsedUserData = JSON.parse( oldUserData)
state.name && (parsedUserData.name = state.name)
state.email && (parsedUserData.email = state.email)


global.updateUserSpecificData({name:state.name , email:state.email , country : state.country?.alpha3})

userInfo.value = global.user
    editCurrentAdmin(payload)
      .then((res) => {

      }).then(()=>{
        getAdminData()
      })
      .catch((err) => {})
      .finally(() => {
        state.name = "";
        state.email = "";
        state.password = "";

      });
  } else {
    errors.name.state = v$.value.name.$error;
    errors.email.state = v$.value.email.$error;
    // errors.old_password.state = v$.value.old_password.$error;
    errors.password.state = v$.value.password.$error;
    errors.passwordConfirmation.state = v$.value.passwordConfirmation.$error;
  }
};

//hooks
onBeforeMount(() => {
  getAdminData()
});
</script>

<style >

</style>
