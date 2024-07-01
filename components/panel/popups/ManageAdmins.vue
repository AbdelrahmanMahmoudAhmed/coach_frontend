<template>
  <div
    @click.self="closePopup"
    class="popup fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#00000099] z-30 overflow-auto flex justify-center items-center"
  >
    <form
      @submit.prevent="ManageUsers"
      class="px-[45px] py-[30px] bg-[#fff] border-[5px] border-[#fff] rounded-[20px] w-[95%] sm:w-[60%] md:w-[488px] dark:bg-[#1E78B9] dark:border-[#3C97D8]"
    >
      <h3
        class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
      >
        {{ $t(`admin.actions.${type}_admin`) }}
      </h3>

      <div
        v-if="type != 'delete' "
        class="flex flex-col justify-center"
      >
      <div class="mb-[10px] w-full flex flex-col justify-center items-center max-w-[440px] m-auto"
            v-if="imageDisplaying">
            <div class=" max-w-[200px] rounded-lg overflow-hidden ">
              <img :src="imageDisplaying" alt="personal image">
            </div>
          </div>
      <div class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto">
        <div class="relative">
     
          <label class="px-[30px] mb-1" for="">{{ $t("auth.admin_image") }}</label>
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
        <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
          <div class="relative">
            <input
              v-model="state.name"
              :placeholder="$t('auth.name')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
              type="text"
            />
          </div>
          <p
            v-if="errors.name.state"
            class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
          >
            {{ $t("auth.errors.add_name") }}
          </p>
        </div>

        <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
          <div class="relative">
            <input
              v-model="state.email"
              :placeholder="$t('auth.email')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
              type="email"
              autocomplete="off"
            />
          </div>
          <p
            v-if="errors.email.state"
            class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
          >
            {{ $t("auth.errors.add_email") }}
          </p>
        </div>
        <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <!-- <input v-model="state.goal" :placeholder="$t('auth.goal')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text" /> -->
                <DropDownCompVue 
                :placeholder="$t('auth.role')" 
              :options="roleOptions"
              @changeVal="changeVal"
              mode="single"
              :locale="locale"
              :close="true"
            />
            </div>
            <p v-if="errors.role.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.choose_role") }}
            </p>
          </div>
        <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
          <div class="relative">
            <div
              @click="() => changeInputType('password')"
              :class="` ${
                locale == 'ar' ? ' left-5' : ' right-5'
              } cursor-pointer absolute top-[15px] `"
            >
              <img
                v-if="errors.password.isVisible"
                src="../../../assets/imgs/hide.svg"
                alt=""
              />
              <img v-else src="../../../assets/imgs/unhide.svg" alt="" />
            </div>
            <input
              v-model="state.password"
              :placeholder="$t('auth.password')"
              :class="`${
                locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'
              } text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
              :type="errors.password.isVisible ? 'text' : 'password'"
              autocomplete="off"
            />
          </div>
          <p
            v-if="errors.password.state"
            class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
          >
            {{ $t("auth.errors.add_password") }}
          </p>
        </div>

        <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
          <div class="relative">
            <div
              @click="() => changeInputType('passwordConfirmation')"
              :class="` ${
                locale == 'ar' ? ' left-5' : ' right-5'
              } cursor-pointer absolute top-[15px] `"
            >
              <img
                v-if="errors.passwordConfirmation.isVisible"
                src="../../../assets/imgs/hide.svg"
                alt=""
              />
              <img v-else src="../../../assets/imgs/unhide.svg" alt="" />
            </div>
            <input
              v-model="state.passwordConfirmation"
              :placeholder="$t('auth.confirm_password')"
              :class="`  ${
                locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'
              } text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
              :type="errors.passwordConfirmation.isVisible ? 'text' : 'password'"
              autocomplete="off"
            />
          </div>
          <p
            v-if="errors.passwordConfirmation.state"
            class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
          >
            {{ $t("auth.errors.add_password_confirmation") }}
          </p>
        </div>
  
      </div>

      <div v-else-if="type == 'delete'">
        <div class="text-center font-[900]">
          {{ $t(`admin.actions.delete_msg`) }} {{ currentAdmin?.name }}
          {{ locale == "ar" ? "؟" : "?" }}
        </div>
      </div>

      <div
        class="text-[#fff] pt-[22px] flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-[20px]"
      >
        <button
          @click="closePopup"
          type="button"
          class="bg-[#062946] rounded-[21px] h-[40px] px-[23px]"
        >
          {{ $t(`admin.actions.cancel`) }}
        </button>
        <button
          type="submit"
          :class="`${
            type == 'delete' ? ' bg-red-800' : 'bg-[#2FA3F7]'
          }  rounded-[21px] h-[40px] px-[23px]`"
        >
          {{ $t(`admin.actions.${type}`) }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const emit = defineEmits(["closePopup", "getUsersData"]);
const props = defineProps({
  type: String,
  currentAdmin: Object,
});

import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
  sameAs,
} from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import DropDownCompVue from "~/components/generic/DropDownComp.vue";

const { createUser, editUser, deleteUser } = useRequest();
const imageDisplaying = ref("");
const roleOptions = ref([
  {value:'admin' , name_ar:"مشرف" , name_en:"Admin"},
  {value:'superAdmin' , name_ar:"مدير" , name_en:"Super Admin"},

])

const state = reactive({
  name: "",
  email: "",
  image: "",
  role: "",
  password: "",
  passwordConfirmation: "",
});
const errors = reactive({
  image: {
    state: false,
  },
  realImage: {
    state: false,
  },
  name: {
    state: false,
  },
  email: {
    state: false,
  },
  role: {
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

const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    role: { required },
    password: { required, maxLength: maxLength(50), minLength: minLength(6) },
    passwordConfirmation: {
      required,
      maxLength: maxLength(50),
      minLength: minLength(6),
    },
  };
});
const editRules = computed(() => {
  return {
    password: { maxLength: maxLength(50), minLength: minLength(6) },

    passwordConfirmation: {
      sameAs: sameAs(state.password),
    },
  };
});
const v$ = useVuelidate(rules, state);

const { locale, locales, setLocale, t } = useI18n();

const closePopup = () => {
  emit("closePopup");
};

const getUsersData = () => {
  emit("getUsersData");
};

const ManageUsers = async () => {
  if (props.type != "delete") {
    errors.name.state = false;
    errors.email.state = false;
    errors.role.state = false;
    errors.password.state = false;
    errors.passwordConfirmation.state = false;

    const payload = {};

    const result = await v$.value.$validate();

    if (result) {
      state.name && (payload.name = state.name);
      state.email && (payload.email = state.email);
      state.role && (payload.role = state.role);
      state.password && (payload.password = state.password);

      await createUser(payload)
        .then((res) => {
          getUsersData();
        })
        .catch((err) => {})
        .finally(() => {
          closePopup();
        });
    } else {
      errors.name.state = v$.value.name.$error;
      errors.email.state = v$.value.email.$error;
      errors.role.state = v$.value.role.$error;
      errors.password.state = v$.value.password.$error;
      errors.passwordConfirmation.state = v$.value.passwordConfirmation.$error;
    }
  } else {
    await deleteUser(props.currentAdmin?.id)
      .then((res) => {
        getUsersData();
      })
      .catch((err) => {})
      .finally(() => {
        closePopup();
      });
  }
};
const onChangeImage = (e) => {
  const file = e.target.files[0]
  state.image = file
  imageDisplaying.value = URL.createObjectURL(file);
}
const changeVal = (val, name) => {
    state.role = val;

};
// hooks
onBeforeMount(() => {
  if (props.type == "edit") {
    // state.name = props.currentAdmin?.name;
    // state.email = props.currentAdmin?.email;
    console.log("currentAdmin" , props.currentAdmin)
  }

});
</script>

<style></style>
