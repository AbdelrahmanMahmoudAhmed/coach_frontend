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
            v-if="userName"
            class="text-[12px] flex gap-2 xs:text-[16px] sm:text-[22px] sm:gap-4"
          >
            <span class="text-[#0000007d] text-nowrap dark:text-[#ffffff82]">{{
              $t("auth.name")
            }}</span
            ><span class="">{{ userName }}</span>
          </div>
          <div
          v-if="userEmail"
            class="text-[12px] flex gap-2 xs:text-[16px] sm:text-[22px] sm:gap-4"
          >
            <span class="text-[#0000007d] text-nowrap dark:text-[#ffffff82]">{{
              $t("auth.email")
            }}</span
            ><span class="">{{ userEmail }}</span>
          </div>

          <div
          v-if="userCountryName && flag "
            class="text-[12px] flex gap-2 xs:text-[16px] sm:text-[22px] sm:gap-4"
          >
            <span class="text-[#0000007d] text-nowrap dark:text-[#ffffff82]">{{
              $t("auth.countrey")
            }}</span
            >{{ userCountryName }}
            <img
              class="h-[20px] mt-auto mb-auto"
              :src="`data:image/png;base64,${flag}`"
              alt=""
            />
          </div>
        </div>
        <div class="w-full">
          <h1
            class="text-center font-bold text-[18px] mb-6 sm:text-[26px] lg:text-[32px]"
          >
            {{ $t("user.change_info") }}
          </h1>

          <form @submit.prevent="changeUserData" class="w-full">
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
                <Dropdown
                  v-model="state.country"
                  :options="allCountries"
                  optionLabel="name"
                  :placeholder="$t('auth.select_country')"
                  class="w-full md:w-14rem"
                >
                  <template #value="slotProps">
                    <div
                      v-if="slotProps.value"
                      class="flex align-items-center gap-2"
                    >
                      <img
                        :alt="slotProps.value.label"
                        :src="`data:image/png;base64,${slotProps.value.flag}`"
                        :class="`mr-2 flag flag-${slotProps.value.alpha3.toLowerCase()}`"
                        style="width: 18px"
                      />
                      <div>
                        {{
                          locale == "en"
                            ? slotProps.value.name
                            : slotProps.value.nameAr
                        }}
                      </div>
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex align-items-center gap-2">
                      <img
                        :alt="slotProps.option.label"
                        :src="`data:image/png;base64,${slotProps.option.flag}`"
                        :class="`mr-2 flag flag-${slotProps.option.alpha3.toLowerCase()}`"
                        style="width: 18px"
                      />
                      <div>
                        {{
                          locale == "en"
                            ? slotProps.option.name
                            : slotProps.option.nameAr
                        }}
                      </div>
                    </div>
                  </template>
                </Dropdown>
              </div>

              <p
                v-if="errors.country.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.select_country") }}
              </p>
            </div>

            <div
              class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto"
            >
              <div class="relative">
                <div
                  @click="() => changeInputType('password')"
                  :class="` ${
                    locale == 'ar' ? ' left-5' : ' right-5'
                  } cursor-pointer absolute top-[15px] `"
                >
                  <img
                    v-if="errors.password.isVisible"
                    src="../../assets/imgs/hide.svg"
                    alt=""
                  />
                  <img v-else src="../../assets/imgs/unhide.svg" alt="" />
                </div>
                <input
                  v-model="state.password"
                  :placeholder="$t('auth.new_password')"
                  :class="`${
                    locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'
                  } text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
                  :type="errors.password.isVisible ? 'text' : 'password'"
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
                <div
                  @click="() => changeInputType('passwordConfirmation')"
                  :class="` ${
                    locale == 'ar' ? ' left-5' : ' right-5'
                  } cursor-pointer absolute top-[15px] `"
                >
                  <img
                    v-if="errors.passwordConfirmation.isVisible"
                    src="../../assets/imgs/hide.svg"
                    alt=""
                  />
                  <img v-else src="../../assets/imgs/unhide.svg" alt="" />
                </div>
                <input
                  v-model="state.passwordConfirmation"
                  :placeholder="$t('auth.confirm_password')"
                  :class="`  ${
                    locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'
                  } text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
                  :type="
                    errors.passwordConfirmation.isVisible ? 'text' : 'password'
                  "
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
  middleware: "user-guard",
});
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength, minLength } from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import useServerRequest from "~/composables/useServerRequist";
import { useGlobalStore } from "~/stores/global";

const global = useGlobalStore();

const { locale, locales, setLocale, t } = useI18n();
const { changeUserAccountData, getUserData } = useRequest();
const { countries } = useServerRequest();
const allCountries = ref([]);
const userInfo = useCookie("userInfo");
const flag = ref();
const userCountryName = ref();

const userName = ref();
const userEmail = ref();

//server requist
const { data, error } = await countries();
allCountries.value = data?.value?.data;

const getUserCountry = (alfa) => {
  const userCountry = allCountries.value.filter((item) => {
    return item?.alpha3 == alfa;
  });
  console.log("userCountry", userCountry);
  flag.value = userCountry[0]?.flag;
  userCountryName.value = userCountry[0]?.name;
};

const state = reactive({
  name: "",
  email: "",
  country: "",
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
  country: {
    state: false,
  },
  // old_password: {
  //   state: false,
  // },
  password: {
    state: false,
    isVisible: false,
  },
  passwordConfirmation: {
    state: false,
    isVisible: false,
  },
});

const changeInputType = (type) => {
  errors[type].isVisible = !errors[type].isVisible;
};
const rules = computed(() => {
  return {
    name: {},
    email: { email },
    country: {},
    // old_password: { required : (state.old_password || state.password || state.passwordConfirmation )&& required, maxLength: maxLength(50), minLength: minLength(6) },
    password: {
      required: (state.password || state.passwordConfirmation) && required,
      maxLength: maxLength(50),
      minLength: minLength(6),
    },
    passwordConfirmation: {
      required: (state.password || state.passwordConfirmation) && required,
      maxLength: maxLength(50),
      minLength: minLength(6),
    },
  };
});

const getUserInfo = () => {
  global.turnLoaderOn()
  getUserData()
    .then((res) => {
      console.log("res {}{}", res.data);
      userEmail.value = res.data?.data?.email;
      userName.value = res.data?.data?.name;
      // userCountry.value = res.data?.data?.country;
      getUserCountry(res.data?.data?.country);
      // console.log("userEmail" , userEmail.value)
      console.log("hi");
    })
    .catch((err) => {
      console.log("errrr", err);
    }).finally(()=>{
      global.turnLoaderOff()
    });
    
};
const v$ = useVuelidate(rules, state);

const changeUserData = async () => {
  errors.name.state = false;
  errors.email.state = false;
  errors.country.state = false;
  // errors.old_password.state = false;
  errors.password.state = false;
  errors.passwordConfirmation.state = false;

  const result = await v$.value.$validate();

  if (result) {
    const payload = {};

    state.name && (payload.name = state.name);
    state.email && (payload.email = state.email);
    state.country && (payload.country = state.country?.alpha3);
    state.password && (payload.password = state.password);

    // change the new data on the local storage , cookies and memory

    const oldUserData = localStorage.getItem("auth");
    const parsedUserData = JSON.parse(oldUserData);
    state.name && (parsedUserData.name = state.name);
    state.email && (parsedUserData.email = state.email);
    state.country && (parsedUserData.country = state.country?.alpha3);

    global.updateUserSpecificData({
      name: state.name,
      email: state.email,
      country: state.country?.alpha3,
    });

    userInfo.value = global.user;

    // get the current country and the flag
    getUserCountry(state.country?.alpha3);

    changeUserAccountData(payload)
      .then((res) => {

      })
      .then(() => {
        getUserInfo();
      })
      .catch((err) => {})
      .finally(() => {
        state.name = "";
        state.email = "";
        state.country = "";
        state.password = "";
      });
  } else {
    errors.name.state = v$.value.name.$error;
    errors.email.state = v$.value.email.$error;
    errors.country.state = v$.value.country.$error;
    errors.password.state = v$.value.password.$error;
    errors.passwordConfirmation.state = v$.value.passwordConfirmation.$error;
  }
};

//hooks
onBeforeMount(() => {});
onMounted(() => {
  getUserInfo();
});
</script>

<style scoped>
span.p-dropdown-label.p-inputtext {
  font-size: 10px;
  color: red;
}
</style>
