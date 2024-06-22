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
        {{ $t(`admin.actions.${type}_user`) }}
      </h3>

      <div
        v-if="type != 'delete' && type != 'credit'"
        class="flex flex-col justify-center"
      >
        <div
          class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto"
        >
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

        <div
          class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto"
        >
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

        <div
          class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto"
        >

          <Dropdown
            v-model="state.country"
            :options="allCountries"
            optionLabel="name"
            :placeholder="$t('auth.select_country')"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center gap-2">
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
          <!-- </div> -->
          <p
            v-if="errors.country.state"
            class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
          >
            {{ $t("auth.errors.select_country") }}
          </p>
        </div>

        <div
          class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto"
        >
          <div class="relative">
            <div @click="()=>changeInputType('password')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'} cursor-pointer absolute top-[15px] `">
    <img v-if="errors.password.isVisible" src="../../../assets/imgs/hide.svg" alt="">
    <img v-else src="../../../assets/imgs/unhide.svg" alt="">

  </div>
            <input
              v-model="state.password"
              :placeholder="$t('auth.password')"
              :class=" `${ locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'} text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
              :type="errors.password.isVisible ? 'text':'password'"
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

        <div
          class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto"
        >
          <div class="relative">
            <div @click="()=>changeInputType('passwordConfirmation')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'} cursor-pointer absolute top-[15px] `">
    <img v-if="errors.passwordConfirmation.isVisible" src="../../../assets/imgs/hide.svg" alt="">
    <img v-else src="../../../assets/imgs/unhide.svg" alt="">

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
            class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
          >
            {{ $t("auth.errors.add_password_confirmation") }}
          </p>
        </div>
        <div
          class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto"
        >
          <div class="relative">
            <input
              v-model="state.credit"
              :placeholder="$t('auth.credit')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
              type="number"
            />
          </div>
          <p
            v-if="errors.credit.state"
            class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
          >
            {{ $t("auth.errors.add_credit") }}
          </p>
        </div>
      </div>

      <div v-else-if="type == 'delete'">
        <div class="text-center font-[900]">
          {{ $t(`admin.actions.delete_msg`) }} {{ currentUser?.name }}
          {{ locale == "ar" ? "؟" : "?" }}
        </div>
      </div>

      <div v-else>
        <div v-if="locale == 'en'" class="text-center font-[900]">
          {{ currentUser?.name }}'s {{ $t(`admin.actions.credit`) }}
          {{ state.credit }}
        </div>
        <div v-else class="text-center font-[900]">
          {{ $t(`admin.actions.credit_to`) }} {{ currentUser?.name }}
          {{ state.credit }}
        </div>
        <div v-if="changedCredit" class="text-center font-[900]">
          {{ $t(`admin.actions.will_be`) }} {{ changedCredit }}
        </div>
        <input
          @keyup="changeCreditFun"
          v-model="state.editedCredit"
          :placeholder="$t('auth.change_credit')"
          class="my-4 text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
          type="number"
        />
        <p
            v-if="errors.editedCredit.state"
            class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
          >
            {{ $t("auth.errors.add_credit_val") }}
          </p>
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
  currentUser: Object,
  allCountries: Array,
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

const { createUser, editUser, deleteUser, changeUserCredit } = useRequest();
// const editedCredit = ref();
const changedCredit = ref();

const state = reactive({
  name: "",
  email: "",
  country: "",
  credit: "",
  password: "",
  passwordConfirmation: "",
  editedCredit: "",
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
  credit: {
    state: false,
  },

  password: {
    state: false,
    isVisible:false

  },
  passwordConfirmation: {
    state: false,
    isVisible:false

  },
  editedCredit: {
    state: false,
  },
});
const changeInputType =(type)=>{
  errors[type].isVisible = ! errors[type].isVisible 
}

const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    country: { required },
    credit: { required, numeric },
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
const editCreditRules = computed(() => {
  return {
    editedCredit: { required },
  };
});



const changeCreditFun = () => {
  changedCredit.value = (+state.credit) + (+state.editedCredit);
};

const v$ = useVuelidate(rules, state);
const EditV$ = useVuelidate(editRules, state);
const EditCreditV$ = useVuelidate(editCreditRules, state);

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
    errors.country.state = false;
    errors.credit.state = false;
    errors.password.state = false;
    errors.passwordConfirmation.state = false;

    const payload = {};
    if (props.type == "add") {
      const result = await v$.value.$validate();

      if (result) {
        state.name && (payload.name = state.name);
        state.email && (payload.email = state.email);
        state.country && (payload.country = state.country?.alpha3);
        state.password && (payload.password = state.password);
        state.credit && (payload.credit = state.credit);

        await createUser(payload)
          .then((res) => {

            getUsersData();
          })
          .catch((err) => {
          })
          .finally(() => {
            closePopup();
          });
      } else {
        errors.name.state = v$.value.name.$error;
        errors.email.state = v$.value.email.$error;
        errors.country.state = v$.value.country.$error;
        errors.credit.state = v$.value.credit.$error;
        errors.password.state = v$.value.password.$error;
        errors.passwordConfirmation.state = v$.value.passwordConfirmation.$error;
      }
    } else if (props.type == "edit") {
      const result = await EditV$.value.$validate();
      errors.password.state = false;
      errors.passwordConfirmation.state = false;

      state.name && (payload.name = state.name);
      state.email && (payload.email = state.email);
      state.country && (payload.country = state.country?.alpha3);
      state.password && (payload.password = state.password);
      state.credit && (payload.credit = state.credit);

      if (result) {
        await editUser(props.currentUser?.id, payload)
          .then((res) => {

            getUsersData();
          })
          .catch((err) => {
;
          })
          .finally(() => {
            closePopup();
          });
      } else {
        errors.password.state = EditV$.value.password.$error;
        errors.passwordConfirmation.state =
          EditV$.value.passwordConfirmation.$error;
      }
    } else if (props.type == "credit") {
      errors.editedCredit.state = false;
      const result = await EditCreditV$.value.$validate();

      if (result) {
        changeUserCredit(props.currentUser?.id, { credit: state.editedCredit })
          .then((res) => {
  
            getUsersData();
          })
          .catch((err) => {
          })
          .finally(() => {
            closePopup();
          });
      } else {
        errors.editedCredit.state = EditCreditV$.value.editedCredit.$error;
      }
    }
  } else {
    await deleteUser(props.currentUser?.id)
      .then((res) => {

        getUsersData();
      })
      .catch((err) => {

      })
      .finally(() => {
        closePopup();
      });
  }
};

// hooks
onBeforeMount(() => {
  if (props.type == "edit") {
    const currentCountry = props.allCountries?.filter(
      (item) => item?.alpha3 == props.currentUser?.country
    );
    state.name = props.currentUser?.name;
    state.email = props.currentUser?.email;
    state.credit = props.currentUser?.credit;
    state.country = currentCountry[0];
  }
  if (props.type == "credit") {
    state.credit = props.currentUser?.credit;
  }
});
</script>
    
    <style >
</style>~/composables/useRequest