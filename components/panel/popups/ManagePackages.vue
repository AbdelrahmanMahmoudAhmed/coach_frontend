<template>
    <div
      @click.self="closePopup"
      class="popup flex items-center fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#00000099] z-30 overflow-auto p-[10px] sm:p-[40px] "
    >
    <!-- <div class=" flex justify-center items-center"> -->
      <form
        @submit.prevent="managePackageFun"
        class=" m-auto px-[10px] py-[30px] bg-[#fff] border-[5px] border-[#fff] rounded-[20px] w-[98%] sm:px-[45px] sm:w-[70%] md:w-[488px] dark:bg-[#1E78B9] dark:border-[#3C97D8]"
      >
        <h3
          class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
        >
          {{ $t(`admin.actions.${type}_package`) }}
        </h3>
  
        <div v-if="type != 'delete'" class="flex flex-col justify-center">
          <div
            class="mb-[10px] w-full flex flex-col justify-center items-center max-w-[440px] m-auto"
            v-if="imageDisplaying"
          >
            <div class="max-w-[200px] rounded-lg overflow-hidden">
              <img :src="imageDisplaying" alt="personal image" />
            </div>
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto">
            <div class="relative">
              <label class="px-[30px] mb-1" for="">{{ $t("auth.package_image") }}</label>
              <input
                @change="onChangeImage"
                class="py-[9px] text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#c1abab] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="file"
              />
            </div>
            <p
              v-if="errors.image.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_image") }}
            </p>
            <p
              v-if="errors.realImage.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_real_image") }}
            </p>
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input
                v-model="state.titleAr"
                :placeholder="$t('auth.title_ar')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text"
              />
            </div>
            <p
              v-if="errors.titleAr.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_title_ar") }}
            </p>
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input
                v-model="state.titleEn"
                :placeholder="$t('auth.title_en')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text"
              />
            </div>
            <p
              v-if="errors.titleEn.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_title_en") }}
            </p>
          </div>
  
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input
                v-model="state.descriptionAr"
                :placeholder="$t('auth.description_ar')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.descriptionAr.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_description_ar") }}
            </p>
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input
                v-model="state.descriptionEn"
                :placeholder="$t('auth.description_en')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.descriptionEn.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_description_en") }}
            </p>
          </div>

          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input
                v-model="state.period"
                :placeholder="$t('auth.period')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="number"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.period.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_period") }}
            </p>
          </div>

          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input
                v-model="state.price"
                :placeholder="$t('auth.price')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="number"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.price.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_price") }}
            </p>
          </div>


          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input
                v-model="state.discountPercentage"
                :placeholder="$t('auth.discount_percentage')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="number"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.discountPercentage.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_discount_percentage") }}
            </p>
          </div>



          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
<div class=" flex justify-between">
    <span class="px-[30px] mb-1" >{{ $t("auth.package_features") }}</span>
    <span class="px-[30px] mb-1" @click="addFeature" >+</span>

</div>
            <div v-for="(feature , idx) in state.packageFeatures " :key="idx" :id="feature.id"  class="relative px-3 pt-8 pb-3 rounded-lg border mb-2 ">
                <span @click="()=>removeFeature(feature.id)" :class="` absolute top-1 cursor-pointer ${locale == 'ar' ? 'left-3' : 'right-3'} `" >X</span>

                <input
                v-model="feature.featureAr"
                :placeholder="$t('auth.package_feature_ar')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text"
                autocomplete="off"
              />
              <input
                v-model="feature.featureEn"
                :placeholder="$t('auth.package_feature_en')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[20px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text"
                autocomplete="off"
              />
            </div>
            <p
              v-if="errors.packageFeatures.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px] dark:text-red-900"
            >
              {{ $t("auth.errors.add_complete_feature") }}
            </p>
          </div>





        </div>
  
        <div v-else-if="type == 'delete'">
          <div class="text-center font-[900]">
            {{ $t(`admin.actions.delete_msg`) }} {{ locale == 'ar' ? currentPackage?.titleAr : currentPackage?.titleEn }}
            {{ locale == "ar" ? "؟" : "?" }}
          </div>
        </div>
  
        <div
          class="text-[#fff] pt-[22px] flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-[20px]"
        >
          <button
            @click="closePopup"
            type="button"
            class="bg-[#062946] rounded-[21px] h-[40px] px-[23px] w-full sm:w-fit"
          >
            {{ $t(`admin.actions.cancel`) }}
          </button>
          <button
            type="submit"
            :class="`${
              type == 'delete' ? ' bg-red-800' : 'bg-[#2FA3F7]'
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
  const emit = defineEmits(["closePopup", "getPackagesData"]);
  const props = defineProps({
    type: String,
    currentPackage: Object,
  });
  
  import useVuelidate from "@vuelidate/core";
  import {
    required,
    email,
     maxValue,
    minLength,
    numeric,
    sameAs,
    requiredIf
  } from "@vuelidate/validators";
  import useRequest from "~/composables/useRequest";
  import DropDownCompVue from "~/components/generic/DropDownComp.vue";
  import showToast from "~/composables/useToast";
  import { useGlobalStore } from "~/stores/global";
  
  const config = useRuntimeConfig();
  const BASE_URL =  config.public.base_url;
  
  const { createPackage, editAdmin, deleteAdmin } = useRequest();
  const { locale, t } = useI18n();
  const imageDisplaying = ref("");

  
  const state = reactive({
    image: "",
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    period:"",
    price:"",
    discountPercentage:"",
    packageFeatures:[
        { id:"feature_1" ,featureAr:"",featureEn:""},
    ]

  });
  const errors = reactive({
    image: {
      state: false,
    },
    realImage: {
      state: false,
    },
    titleAr: {
      state: false,
    },
    titleEn: {
      state: false,
    },
    descriptionAr: {
      state: false,
    },
    descriptionEn: {
      state: false,
    },
    period: {
      state: false,
    },
    price: {
      state: false,
    },
    discountPercentage: {
      state: false,
    },
    packageFeatures: {
      state: false,
    },
  });

  
  const rules = computed(() => {

    return {
        titleAr: { required , minLength:minLength(3) },
        titleEn: { required , minLength:minLength(3)},
        descriptionAr: { required ,minLength:minLength(7) },
        descriptionEn: { required ,minLength:minLength(7) },
        period: { required, numeric },
        price: { required, numeric },
        discountPercentage: { required, numeric ,  maxValue: maxValue(100)},
        packageFeatures:{
            required: requiredIf(function (nestedModel) {
                console.log("nestedModel" , nestedModel)

                const completedFeatures = [];

                nestedModel.forEach((item)=>{
                    if(item.featureAr && item.featureEn) completedFeatures.push(item)
                });


                console.log("completedFeatures" , completedFeatures)

                // if(completedFeatures.length) return false;
                // else return true;
                completedFeatures.length &&( state.packageFeatures = completedFeatures)
                errors.packageFeatures.state = completedFeatures.length === 0;
                return completedFeatures.length === 0;

    
        }),
        },

      image : {
        required: requiredIf(function (nestedModel) {
          const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']; // Add more MIME types as needed
          if(!state.image && props.type == 'edit'){
            errors.image.state = false
            errors.realImage.state =false;
            return false
          }
          if(!state.image ){
            console.log('case 1')
            errors.image.state = true
            errors.realImage.state =false;
            return true
          }
         else if (allowedMimeTypes.includes(nestedModel.type)) {
            console.log('case 2')

            errors.image.state = false
            errors.realImage.state =false;
            // Accept the file
            return false
          } else {
            // Reject the file
            console.log('case 3')

            console.log('nestedModel.type' ,nestedModel.image.type)
            errors.realImage.state =true;
            errors.image.state = false
            return true
          }
        }),
    }

    };
  });
  
  const v$ = useVuelidate(rules, state);
  
  
  const closePopup = () => {
    emit("closePopup");
  };
  
  const getPackagesData = () => {
    emit("getPackagesData");
  };
  
  const managePackageFun = async () => {
 console.log("feratures" , state.packageFeatures)

    if (props.type != "delete") {
      errors.titleAr.state = false;
      errors.titleEn.state = false;
      errors.descriptionAr.state = false;
      errors.descriptionEn.state = false;
      errors.period.state = false;
      errors.price.state = false;
      errors.discountPercentage.state = false;
        errors.packageFeatures.state = false;
      const payload = new FormData();
  
      const result = await v$.value.$validate();

      console.log("result" , v$.value)
  
      if (result && !errors.image.state) {
        state.image && (payload.append("image", state.image));
        state.titleAr && (payload.append("titleAr", state.titleAr));
        state.titleEn && (payload.append("titleEn", state.titleEn));
        state.descriptionAr && (payload.append("descriptionAr", state.descriptionAr));
        state.descriptionEn && (payload.append("descriptionEn", state.descriptionEn));
        state.price && (payload.append("price", state.price));
        state.period && (payload.append("period", state.period));
        state.discountPercentage && (payload.append("discountPercentage", state.discountPercentage));

        state.packageFeatures.forEach((item , idx)=>{
            // packageFeatures[0][featureEn]
            console.log("idx" , idx )
            payload.append(`packageFeatures[${idx}][featureEn]`, item.featureEn)
            payload.append(`packageFeatures[${idx}][featureAr]`, item.featureAr)
        })

   
  
        try {
          let res;
          if (props.type == 'add') res = await createPackage(payload)
          if (props.type == 'edit') res = await editAdmin( props.currentPackage?.id ,payload)
  
        
        
          if(res.data.success){
            props.type == 'add' && showToast({  message: t('toast.success_add_package')});
            props.type == 'edit' && showToast({  message: t('toast.success_edit_package')});
          getPackagesData();
          closePopup();
  
          } 
          else showToast({ type: "error", message:"err" });
        } catch (err) {
          console.error(err)
        }
  
      } else {
        errors.titleAr.state = v$.value.titleAr.$error;
        errors.titleEn.state = v$.value.titleEn.$error;
        errors.descriptionAr.state = v$.value.descriptionAr.$error;
        errors.descriptionEn.state = v$.value.descriptionEn.$error;
        errors.period.state = v$.value.period.$error;
        errors.price.state = v$.value.price.$error;
        errors.discountPercentage.state = v$.value.discountPercentage.$error;
        
      }
    } else {
      
      try {
        const res = await deleteAdmin(props.currentPackage?.id)
        
          if(res.data.success){
           showToast({  message: t('toast.success_delete_package')});
          getPackagesData();
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
    const file =  e.target.files[0]
    console.log("file______________" , file)
    state.image = file
    imageDisplaying.value = URL.createObjectURL(file);
    console.log("state.image" , state.image)
  }

  const addFeature = ( ) => {
    const id = `feature_${ Date.now() }`
    state.packageFeatures.push({
        id,
        featureAr:"",
        featureEn:"",
    })
  }
  const removeFeature = ( id ) => {

    if(state.packageFeatures.length < 2) return;
   const updatedFeatures = state.packageFeatures.filter(item=>item.id != id)
   state.packageFeatures = updatedFeatures
  }

  // hooks
  onBeforeMount(() => {
    if (props.type == "edit") {
     
    }
  
  });
  </script>
  
  <style>
  </style>