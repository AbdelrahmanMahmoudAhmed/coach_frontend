<template>
    <div
      @click.self="closePopup"
      class="popup-holder popup"
    >
    <!-- <div class=" flex justify-center items-center"> -->
      <form
        @submit.prevent="manageAdminFun"
        class="panel-form "
      >
        <h3
          class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
        >
          {{ $t(`admin.actions.${type}_admin`) }}
        </h3>
  
        <div v-if="type != 'delete'" class="flex flex-col justify-center">
          <div
            class="add-edit-holder"
            v-if="imageDisplaying"
          >
            <div class="max-w-[200px] rounded-lg overflow-hidden">
              <img :src="imageDisplaying" alt="personal image" />
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
              class="panel-input-err "
            >
              {{ $t("auth.errors.add_image") }}
            </p>
            <p
              v-if="errors.realImage.state"
              class="panel-input-err "
            >
              {{ $t("auth.errors.add_real_image") }}
            </p>
          </div>
          <div class="panel-input-holder ">
            <div class="relative">
              <input
                v-model="state.name"
                :placeholder="$t('auth.name')"
                class="panel-input"
                type="text"
              />
            </div>
            <p
              v-if="errors.name.state"
              class="panel-input-err "
            >
              {{ $t("auth.errors.add_name") }}
            </p>
          </div>
  
          <div class="panel-input-holder ">
            <div class="relative">
              <input
                v-model="state.email"
                :placeholder="$t('auth.email')"
                class="panel-input"
                type="email"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.email.state"
              class="panel-input-err "
            >
            {{ $t(`auth.errors.${errors.email.message}`) }}
            </p>
          </div>
          <div class="panel-input-holder ">
            <div class="relative">
              <input
                v-model="state.phone"
                :placeholder="$t('auth.phone')"
                class="panel-input"
                type="text"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.phone.state"
              class="panel-input-err "
            >
              {{ $t("auth.errors.add_phone") }}
            </p>
          </div>
          <div class="panel-input-holder ">
            <div class="relative">
              <DropDownCompVue
                :currentVal="state.role"
                :placeholder="$t('auth.role')"
                :options="roleOptions"
                @changeVal="changeVal"
                mode="single"
                :locale="locale"
                :close="true"
              />
            </div>
            <p
              v-if="errors.role.state"
              class="panel-input-err "
            >
              {{ $t("auth.errors.choose_role") }}
            </p>
          </div>
          <div class="panel-input-holder ">
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
                } panel-input`"
                :type="errors.password.isVisible ? 'text' : 'password'"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.password.state"
              class="panel-input-err "
            >
              {{ $t("auth.errors.add_password") }}
            </p>
          </div>
  
          <div class="panel-input-holder ">
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
                } panel-input`"
                :type="errors.passwordConfirmation.isVisible ? 'text' : 'password'"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.passwordConfirmation.state"
              class="panel-input-err "
            >
              {{ $t("auth.errors.add_password_confirmation") }}
            </p>
          </div>
          <div :class="`panel-input-holder  ${state.role == 'superAdmin' && 'blur-sm backdrop-blur-[2px]'}`">
            <div class=" flex justify-start gap-6 items-center">
              <label class="switch">
                    <input
                      type="checkbox"
                      @click="()=>state.allowEdit = ! state.allowEdit"
                      :checked="state.allowEdit"
                    />
                    <span class="slider round"></span>
                  </label>
  
                  <span>{{ t('auth.allow_edit') }}</span>
            </div>
          </div>
          <div :class="`panel-input-holder  ${state.role == 'superAdmin' && 'blur-sm backdrop-blur-[2px]'}`">
            <div class=" flex justify-start gap-6 items-center">
              <label class="switch">
                    <input
                      type="checkbox"
                      @click="()=>state.allowDelete = ! state.allowDelete"
                      :checked="state.allowDelete"
                    />
                    <span class="slider round"></span>
                  </label>
  
                  <span>{{ t('auth.allow_delete') }}</span>
            </div>
          </div>
          <div :class="`panel-input-holder  ${state.role == 'superAdmin' && 'blur-sm backdrop-blur-[2px]'}`">
            <div class=" flex justify-start gap-6 items-center">
              <label class="switch">
                    <input
                      type="checkbox"
                      @click="()=>state.websiteManagement = ! state.websiteManagement"
                      :checked="state.websiteManagement"
                    />
                    <span class="slider round"></span>
                  </label>
   
                  <span>{{ t('auth.manage_website') }}</span>
            </div>
          </div>
    
  
        </div>
  
        <div v-else-if="type == 'delete'">
          <div class="text-center font-[900]">
            {{ $t(`admin.actions.delete_msg`) }} {{ currentClient?.name }}
            {{ locale == "ar" ? "؟" : "?" }}
          </div>
        </div>
  
        <div
          class="popup-actions-holder"
        >
          <button
            @click="closePopup"
            type="button"
            class="panel-cancel-btn"
          >
            {{ $t(`admin.actions.cancel`) }}
          </button>
          <button
            type="submit"
            :class="`${
              type == 'delete' ? ' bg-red-800 hover:bg-red-600' : 'bg-[#2FA3F7] hover:bg-[#62b4ef]'
            }  rounded-[21px] h-[40px] px-[23px] w-full sm:w-fit`"
          >
            {{ $t(`admin.actions.${type}`) }}
          </button>
        </div>
      </form>
    </div>
    <!-- </div> -->
  </template>
  
  <script setup>
  const emit = defineEmits(["closePopup", "getAdminsData"]);
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
  const BASE_URL =  config.public.base_url;
  
  const { createAdmin, editAdmin, deleteAdmin } = useRequest();
  const { locale, t } = useI18n();
  const imageDisplaying = ref("");
  const roleOptions = ref([
    { value: 'admin', name_ar: "مشرف", name_en: "Admin" },
    { value: 'superAdmin', name_ar: "مدير", name_en: "Super Admin" },
  
  ])
  
  const state = reactive({
    name: "",
    email: "",
    phone: "",
    image: "",
    role: "",
    password: "",
    passwordConfirmation: "",
    allowEdit: true,
    allowDelete: true,
    websiteManagement: true,
  });
  const errors = reactive({
    image: {
      state: false,
      message:"",
    },
    realImage: {
      state: false,
      message:"",
    },
    name: {
      state: false,
      message:"",
    },
    email: {
      state: false,
      message:"",
    },
    phone: {
      state: false,
      message:"",
    },
    role: {
      state: false,
      message:"",
    },
  
  
    password: {
      state: false,
      isVisible: false,
      message:"",
    },
    passwordConfirmation: {
      state: false,
      isVisible: false,
      message:"",
    },
  });
  const changeInputType = (type) => {
    errors[type].isVisible = !errors[type].isVisible;
  };
  
  const rules = computed(() => {
    return {
      name: { required },
      email:{ required: helpers.withMessage('add_email', required), email:  helpers.withMessage('add_right_email', email)  },
      phone: { required, numeric },
      role: { required },
      required: requiredIf(function (nestedModel) {
          const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']; // Add more MIME types as needed
          if(!state.image && props.type == 'edit'){
            errors.image.state = false
            errors.realImage.state =false;
            return false
          }
          if(!state.image ){
            errors.image.state = true
            errors.realImage.state =false;
            return true
          }
         else if (allowedMimeTypes.includes(nestedModel.image.type)) {
            errors.image.state = false
            errors.realImage.state =false;
            // Accept the file
            return false
          } else {
            // Reject the file
            errors.realImage.state =true;
            errors.image.state = false
            return true
          }
        }),
      password: {
        required: requiredIf(function () {
          return props.type == 'add'
        }), maxLength: maxLength(50), minLength: minLength(6)
      },
      passwordConfirmation: {
        required: requiredIf(function () {
          return props.type == 'add'
        }),
        maxLength: maxLength(50),
        minLength: minLength(6),
        sameAs : sameAs(state.password)
      },
    };
  });
  
  const v$ = useVuelidate(rules, state);
  
  
  const closePopup = () => {
    emit("closePopup");
  };
  
  const getAdminsData = () => {
    emit("getAdminsData");
  };
  
  const manageAdminFun = async () => {
    if (props.type != "delete") {
      errors.name.state = false;
      errors.email.state = false;
      errors.phone.state = false;
      errors.role.state = false;
      errors.password.state = false;
      errors.passwordConfirmation.state = false;
  
      const payload = new FormData();
  
      const result = await v$.value.$validate();
  
      if (result && !errors.image.state) {
        state.image && (payload.append("image", state.image));
        state.name && (payload.append("name", state.name));
        state.email && (payload.append("email", state.email));
        state.role && (payload.append("role", state.role));
        state.phone && (payload.append("phone", state.phone));
        state.password && (payload.append("password", state.password));
        state.passwordConfirmation && (payload.append("passwordConfirmation", state.passwordConfirmation));
        payload.append('allowDelete' , state.allowDelete );
        payload.append('allowEdit' , state.allowEdit  );
        payload.append('websiteManagement' , state.websiteManagement  );
  
        try {
          let res;
          if (props.type == 'add') res = await createAdmin(payload)
          if (props.type == 'edit') res = await editAdmin( props.currentClient?.id ,payload)      
          if(res.data.success){
            props.type == 'add' && showToast({  message: t('toast.success_add_admin')});
            props.type == 'edit' && showToast({  message: t('toast.success_edit_admin')});
          getAdminsData();
          closePopup();
  
          } 
          else showToast({ type: "error", message:"err" });
        } catch (err) {
          console.error(err)
        }
  
      } else {
        v$.value.$errors.forEach((err)=>{
          errors[err.$property].state = true
          errors[err.$property].message =  err.$message
        })
      }
    } else {
      
      try {
        const res = await deleteAdmin(props.currentClient?.id)
        
          if(res.data.success){
           showToast({  message: t('toast.success_delete_admin')});
          getAdminsData();
          } 
          else showToast({ type: "error", message:"err" });
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
    state.role = val;
  
  };
  // hooks
  onBeforeMount(() => {
    if (props.type == "edit") {
      state.name = props.currentClient?.name;
      state.email = props.currentClient?.email;
      state.phone = props.currentClient?.phone;
      state.role = props.currentClient?.role;
      state.allowDelete = props.currentClient?.allowDelete;
      state.allowEdit = props.currentClient?.allowEdit;
      state.websiteManagement = props.currentClient?.websiteManagement;
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
  
  input:checked + .slider {
    background-color: var(--third-color);
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px var(--third-color);
  }
  
  input:checked + .slider:before {
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