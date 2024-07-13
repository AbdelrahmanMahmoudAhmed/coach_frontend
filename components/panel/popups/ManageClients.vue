<template>
  <div @click.self="closePopup" class="popup-holder popup">
    <!-- <div class=" flex justify-center items-center"> -->
    <form @submit.prevent="manageClientFun" class="panel-form ">
      <h3 class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold">
        {{ $t(`admin.actions.${type}_client`) }}
      </h3>

      <div v-if="type != 'delete'" class="flex flex-col justify-center">
        <div class="add-edit-holder" v-if="imageDisplaying">
          <div class="max-w-[200px] rounded-lg overflow-hidden">
            <img :src="imageDisplaying" alt="personal image" />
          </div>
        </div>
        <div class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto">
          <div class="relative">
            <label class="px-[30px] mb-1" for="">{{ $t("auth.client_image") }}</label>
            <input @change="onChangeImage"
              class="py-[9px] text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#c1abab] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
              type="file" />
          </div>
          <p v-if="errors.image.state" class="panel-input-err ">
            {{ $t("auth.errors.add_image") }}
          </p>
          <p v-if="errors.realImage.state" class="panel-input-err ">
            {{ $t("auth.errors.add_real_image") }}
          </p>
        </div>
        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.name" :placeholder="$t('auth.name')" class="panel-input" type="text" />
          </div>
          <p v-if="errors.name.state" class="panel-input-err ">
            {{ $t(`auth.errors.${errors.name.message}`) }}

          </p>
        </div>

        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.email" :placeholder="$t('auth.email')" class="panel-input" type="email"
              autocomplete="off" />
          </div>
          <p v-if="errors.email.state" class="panel-input-err ">
            {{ $t(`auth.errors.${errors.email.message}`) }}
          </p>
        </div>
        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.phone" :placeholder="$t('auth.phone')" class="panel-input" type="text"
              autocomplete="off" />
          </div>
          <p v-if="errors.phone.state" class="panel-input-err ">
            {{ $t(`auth.errors.${errors.phone.message}`) }}

          </p>
        </div>
        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.tall" :placeholder="$t('auth.tall')" class="panel-input" type="text"
              autocomplete="off" />
          </div>
          <p v-if="errors.tall.state" class="panel-input-err ">
            {{ $t(`auth.errors.${errors.tall.message}`) }}
          </p>
        </div>
        <div class="panel-input-holder ">
          <div class="relative">
            <input v-model="state.weight" :placeholder="$t('auth.weight')" class="panel-input" type="text"
              autocomplete="off" />
          </div>
          <p v-if="errors.weight.state" class="panel-input-err ">
            {{ $t(`auth.errors.${errors.weight.message}`) }}
          </p>
        </div>
        <div class="panel-input-holder ">
          <div class="relative">
            <DropDownCompVue :currentVal="state.goal" :placeholder="$t('auth.goal')" :options="goalOptions"
              @changeVal="changeVal" mode="single" :locale="locale" :close="true" />
          </div>
          <p v-if="errors.goal.state" class="panel-input-err ">
            {{ $t("auth.errors.add_goal") }}
          </p>
        </div>
        <div class="panel-input-holder ">
          <div class="relative">
            <div @click="() => changeInputType('password')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'
    } cursor-pointer absolute top-[15px] `">
              <img v-if="errors.password.isVisible" src="../../../assets/imgs/hide.svg" alt="" />
              <img v-else src="../../../assets/imgs/unhide.svg" alt="" />
            </div>
            <input v-model="state.password" :placeholder="$t('auth.password')" :class="`${locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'
    } panel-input`" :type="errors.password.isVisible ? 'text' : 'password'" autocomplete="off" />
          </div>
          <p v-if="errors.password.state" class="panel-input-err ">
            {{ $t(`auth.errors.${errors.password.message}`) }}
          </p>
        </div>

        <div class="panel-input-holder ">
          <div class="relative">
            <div @click="() => changeInputType('passwordConfirmation')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'
    } cursor-pointer absolute top-[15px] `">
              <img v-if="errors.passwordConfirmation.isVisible" src="../../../assets/imgs/hide.svg" alt="" />
              <img v-else src="../../../assets/imgs/unhide.svg" alt="" />
            </div>
            <input v-model="state.passwordConfirmation" :placeholder="$t('auth.confirm_password')" :class="`  ${locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'
    } panel-input`" :type="errors.passwordConfirmation.isVisible ? 'text' : 'password'"
              autocomplete="off" />
          </div>
          <p v-if="errors.passwordConfirmation.state" class="panel-input-err ">
            {{ $t("auth.errors.add_password_confirmation") }}
          </p>
        </div>




      </div>

      <div v-else-if="type == 'delete'">
        <div class="text-center font-[900]">
          {{ $t(`admin.actions.delete_msg`) }} {{ currentClient?.name }}
          {{ locale == "ar" ? "؟" : "?" }}
        </div>
      </div>

      <div class="popup-actions-holder">
        <button @click="closePopup" type="button" class="panel-cancel-btn">
          {{ $t(`admin.actions.cancel`) }}
        </button>
        <button type="submit" :class="`${type == 'delete' ? ' bg-red-800 hover:bg-red-600' : 'bg-[#2FA3F7] hover:bg-[#62b4ef]'
    }  rounded-[21px] h-[40px] px-[23px] w-full sm:w-fit`">
          {{ $t(`admin.actions.${type}`) }}
        </button>
      </div>
    </form>
  </div>
  <!-- </div> -->
</template>

<script setup>
const emit = defineEmits(["closePopup", "getClientData"]);
const props = defineProps({
  type: String,
  currentClient: Object,
});

import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
  sameAs,
  requiredIf,
  helpers
} from "@vuelidate/validators";
import useRequest from "~/composables/useRequest";
import DropDownCompVue from "~/components/generic/DropDownComp.vue";
import showToast from "~/composables/useToast";
import { useGlobalStore } from "~/stores/global";

const config = useRuntimeConfig();
const BASE_URL = config.public.base_url;

const { createClient, editClient, deleteClient } = useRequest();
const { locale, t } = useI18n();
const imageDisplaying = ref("");

const goalOptions = reactive([
  {name_ar:"خسارة الدهون" , name_en:"lose fat" , value:"loseFat"},
  {name_ar:"خسارة وزن" , name_en:"lose weight" , value:"loseWeight"},
  {name_ar:"الحصول على كتلة عضلية" , name_en:"increase the muscle mass" , value:"gainMuscle"},
  {name_ar:"زيادة الوزن" , name_en:"increase the weight" , value:"gainWeight"},
  {name_ar:"الحفاظ على الوزن" , name_en:"maintain weight" , value:"maintain"},
])
const state = reactive({
  name: "",
  email: "",
  phone: "",
  image: "",
  goal: "",
  password: "",
  passwordConfirmation: "",
  allowEdit: true,
  allowDelete: true,
  websiteManagement: true,
});
const errors = reactive({
  image: {
    state: false,
    message: "",
  },
  realImage: {
    state: false,
    message: "",
  },
  name: {
    state: false,
    message: "",
  },
  email: {
    state: false,
    message: "",
  },
  tall: {
    state: false,
    message: "",
  },
  weight: {
    state: false,
    message: "",
  },
  phone: {
    state: false,
    message: "",
  },
  goal: {
    state: false,
    message: "",
  },
  password: {
    state: false,
    isVisible: false,
    message: "",
  },
  passwordConfirmation: {
    state: false,
    isVisible: false,
    message: "",
  },
});
const changeInputType = (type) => {
  errors[type].isVisible = !errors[type].isVisible;
};

const rules = computed(() => {
  return {
    name: {  required: helpers.withMessage('add_name', required) , minLength: helpers.withMessage('at_least_three', minLength(3))},
    email: { required: helpers.withMessage('add_email', required), email: helpers.withMessage('add_right_email', email) },
    phone: { required: helpers.withMessage('add_phone', required), numeric: helpers.withMessage('must_be_number', numeric) ,  minLength: helpers.withMessage('at_least_seven_num', minLength(7)) },
    tall:{ required: helpers.withMessage('add_tall', required), numeric: helpers.withMessage('must_be_number', numeric) },
    weight:{ required: helpers.withMessage('add_weight', required), numeric: helpers.withMessage('must_be_number', numeric) },
    goal: { required },
    required: requiredIf(function (nestedModel) {
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']; // Add more MIME types as needed
      if (!state.image && props.type == 'edit') {
        errors.image.state = false
        errors.realImage.state = false;
        return false
      }
      if (!state.image) {
        errors.image.state = true
        errors.realImage.state = false;
        return true
      }
      else if (allowedMimeTypes.includes(nestedModel.image.type)) {
        errors.image.state = false
        errors.realImage.state = false;
        // Accept the file
        return false
      } else {
        // Reject the file
        errors.realImage.state = true;
        errors.image.state = false
        return true
      }
    }),

    password: {
      required: helpers.withMessage('add_password', requiredIf(function () {
        return props.type == 'add'
      })) , maxLength:helpers.withMessage('add_valid_password', maxLength(50)), minLength: helpers.withMessage('add_valid_password', minLength(8))
    },
    passwordConfirmation: {
      required: requiredIf(function () {
        return props.type == 'add'
      }),
      maxLength: maxLength(50),
      minLength: minLength(6),
      sameAs: sameAs(state.password)
    },
  };
});

const v$ = useVuelidate(rules, state);


const closePopup = () => {
  emit("closePopup");
};

const getClientData = () => {
  emit("getClientData");
};

const manageClientFun = async () => {
  if (props.type != "delete") {
    errors.name.state = false;
    errors.email.state = false;
    errors.phone.state = false;
    errors.tall.state = false;
    errors.weight.state = false;
    errors.goal.state = false;
    errors.password.state = false;
    errors.passwordConfirmation.state = false;
    const payload = new FormData();
    const result = await v$.value.$validate();

    if (result && !errors.image.state) {
      state.image && (payload.append("image", state.image));
      state.name && (payload.append("name", state.name));
      state.email && (payload.append("email", state.email));
      state.goal && (payload.append("goal", state.goal));
      state.tall && (payload.append("tall", state.tall));
      state.weight && (payload.append("weight", state.weight));
      state.phone && (payload.append("phone", state.phone));
      state.password && (payload.append("password", state.password));
      state.passwordConfirmation && (payload.append("passwordConfirmation", state.passwordConfirmation));


      try {
        let res;
        if (props.type == 'add') res = await createClient(payload)
        if (props.type == 'edit') res = await editClient(props.currentClient?.id, payload)
        if (res.data.success) {
          props.type == 'add' && showToast({ message: t('toast.success_add_client') });
          props.type == 'edit' && showToast({ message: t('toast.success_edit_client') });
          getClientData();
          closePopup();

        }
        else showToast({ type: "error", message: "err" });
      } catch (err) {
        console.error(err)
      }

    } else {
      v$.value.$errors.forEach((err) => {
        errors[err.$property].state = true
        errors[err.$property].message = err.$message
      })
    }
  } else {

    try {
      const res = await deleteClient(props.currentClient?.id)

      if (res.data.success) {
        showToast({ message: t('toast.success_delete_client') });
        getClientData();
      }
      else showToast({ type: "error", message: "err" });
    } catch (err) {
      console.error(err)
    } finally {
      closePopup();
    }
  }
};
const onChangeImage = (e) => {
  const file = e.target.files[0]
  state.image = file
  imageDisplaying.value = URL.createObjectURL(file);
}
const changeVal = (val) => {
  state.goal = val;
};
// hooks
onBeforeMount(() => {
  if (props.type == "edit") {
    console.log(" props.currentClient?.gaol" ,  props.currentClient.goal
)
    state.name = props.currentClient?.name;
    state.email = props.currentClient?.email;
    state.phone = props.currentClient?.phone;
    state.goal =props.currentClient.goal;
    state.tall = props.currentClient?.tall;
    state.weight = props.currentClient?.weight;
    imageDisplaying.value = `${BASE_URL}${props.currentClient?.image}`;
  }
});
</script>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked+.slider {
  background-color: var(--third-color);
}

input:focus+.slider {
  box-shadow: 0 0 1px var(--third-color);
}

input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>