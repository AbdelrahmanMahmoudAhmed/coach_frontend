<template>
  <div class="pb-16">
    <div class="">
      <div
        class="flex flex-col justify-center items-center gap-8 lg:mt-[50px] lg:gap-16"
      >
        <div class="w-full">
          <h1
            class="text-center font-bold text-[18px] mb-6 sm:text-[26px] lg:text-[32px]"
          >
            {{ $t("user.change_info") }}
          </h1>

          <form @submit.prevent="updateAdminData" class="w-full">
            <div
              class="mb-[10px] w-full flex flex-col justify-center items-center max-w-[440px] m-auto"
              v-if="imageDisplaying"
            >
              <div class="max-w-[200px] rounded-lg overflow-hidden">
                <img :src="imageDisplaying" alt="personal image" />
              </div>
            </div>

            <div
              class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto"
            >
              <div class="relative">
                <span
                  :class="` ${
                    locale == 'ar' ? ' left-6' : ' right-6'
                  } cursor-pointer absolute top-[37px] text-red-600 text-lg`"
                  >*</span
                >
                <label class="px-[30px] mb-1" for="">{{
                  $t("auth.image")
                }}</label>
                <input
                  @change="onChangeImage"
                  class="py-[9px] text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#c1abab] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                  type="file"
                />
              </div>
              <p
                v-if="errors.image.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.add_image") }}
              </p>
              <p
                v-if="errors.realImage.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.add_real_image") }}
              </p>
            </div>

            <div
              class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto"
            >
              <div class="relative">
                <span
                  :class="` ${
                    locale == 'ar' ? ' left-6' : ' right-6'
                  } cursor-pointer absolute top-[15px] text-red-600 text-lg`"
                  >*</span
                >
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
                <span
                  :class="` ${
                    locale == 'ar' ? ' left-6' : ' right-6'
                  } cursor-pointer absolute top-[15px] text-red-600 text-lg`"
                  >*</span
                >
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
                <span
                  :class="` ${
                    locale == 'ar' ? ' left-6' : ' right-6'
                  } cursor-pointer absolute top-[15px] text-red-600 text-lg`"
                  >*</span
                >
                <input
                  v-model="state.phone"
                  :placeholder="$t('auth.phone')"
                  class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                  type="text"
                  autocomplete="off"
                />
              </div>
              <p
                v-if="errors.phone.state"
                class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]"
              >
                {{ $t("auth.errors.add_email") }}
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
  middleware: "admin-guard",
});
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
  requiredIf,
} from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";
import showToast from "~/composables/useToast";
import { updateUserData } from "~/composables/useAuth";


const config = useRuntimeConfig();
const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const { editCurrentAdmin, adminData } = useRequest();
const imageDisplaying = ref("");

const userInfo = useCookie("userInfo");
const BASE_URL = config.public.base_url;

const state = reactive({
  name: "",
  email: "",
  image: "",
  phone: "",
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
  image: {
    state: false,
  },
  realImage: {
    state: false,
  },
  phone: {
    state: false,
  },
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
const getAdminData = async () => {
  global.turnLoaderOn();
  try {
    const res = await adminData();
    state.name = res.data.data.name;
    state.email = res.data.data.email;
    state.phone = res.data.data.phone;
    imageDisplaying.value = `${BASE_URL}${res.data.data.image}`;
  } catch (err) {
    console.error(err);
  } finally {
    global.turnLoaderOff();
  }
};
const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    phone: { required, numeric },
    image: {
      required: requiredIf(function (nestedModel) {
        const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"]; // Add more MIME types as needed

        if (!state.image) {
          errors.image.state = false;
          errors.realImage.state = false;
          return false;
        } else if (allowedMimeTypes.includes(nestedModel.type)) {
          errors.image.state = false;
          errors.realImage.state = false;
          // Accept the file
          return false;
        } else {
          // Reject the file
          errors.realImage.state = true;
          errors.image.state = false;
          return true;
        }
      }),
    },
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
const v$ = useVuelidate(rules, state);

const updateAdminData = async () => {
  errors.name.state = false;
  errors.email.state = false;
  errors.phone.state = false;
  errors.image.state = false;
  errors.password.state = false;
  errors.passwordConfirmation.state = false;

  const result = await v$.value.$validate();

  if (result &&  !errors.image.state) {
    const payload = new FormData();
    payload.append("name", state.name);
    payload.append("email", state.email);
    payload.append("phone", state.phone);
    payload.append("image", state.image);
    state.password && payload.append("password", state.password);
    state.passwordConfirmation &&
      payload.append("passwordConfirmation", state.passwordConfirmation);

    // change the new data on the local storage , cookies and memory

    try {
      const res = await editCurrentAdmin(payload);
      if (res.data.success) {
        showToast({ message: t("toast.info_updated") });
        updateUserData(res.data.data)
      } else showToast({ type: "error", message: "err" });
    } catch (err) {
      console.error(err);
    }
  } else {
    errors.name.state = v$.value.name.$error;
    errors.email.state = v$.value.email.$error;
    errors.phone.state = v$.value.phone.$error;
    errors.password.state = v$.value.password.$error;
    errors.passwordConfirmation.state = v$.value.passwordConfirmation.$error;
  }
};

// const updateAdminData =async()=>{
//   console.log("hello")
//   const payload = new FormData();
//     payload.append('name' , state.name)
//     payload.append('email' , state.email)
//     payload.append('phone' , state.phone)
//     payload.append('image' , state.image)
//     state.password && payload.append('password' , state.password)
//     state.passwordConfirmation && payload.append('passwordConfirmation' , state.passwordConfirmation)
//     console.log("state.image" , state.image)
//   try {
//     // const response = await fetch('http://localhost:8080/api/admin/admins/me', {
//     //   method: 'PATCH',
//     //   body: payload,
//     //   credentials: 'include', // This is to include cookies if needed
//     //   headers: {
//     //     // 'Content-Type': 'multipart/form-data', // Do not set this header for FormData
//     //     'Authorization': `bearer ${global.token}`
//     //   }
//     // });

//     // const result = await response.json();

//     //   console.log('result' , result)
//   } catch (error) {
//    console.log(error)
//   }
// }

const onChangeImage = (e) => {
  const file = e.target.files[0];
  state.image = file;
  imageDisplaying.value = URL.createObjectURL(file);
};
//hooks
onBeforeMount(() => {
  getAdminData();
});
</script>

<style></style>
