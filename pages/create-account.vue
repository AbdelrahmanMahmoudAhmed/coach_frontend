<template>
  <div
    class="app-container create-account-page min-h-[50vh] bg-[--trans-color] p-[40px] lg:pt-[110px] lg:pb-[120px] dark:bg-[unset]">
    <div>
      <div>
        <h1
          class="text-center pb-[18px] font-bold text-[20px] xs:text-[26px] md:text-[36px] lg:text-[42px] xl:text-[50px]">
          {{ $t("auth.new_account") }}
        </h1>

        <form @submit.prevent="createAccount" class="flex flex-col justify-center">


          <div class="mb-[10px] w-full flex flex-col justify-center items-center max-w-[440px] m-auto"
            v-if="imageDisplaying">
            <div class=" max-w-[200px] rounded-lg overflow-hidden ">
              <img :src="imageDisplaying" alt="personal image">
            </div>
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <label class="px-[30px] mb-1" for="">{{ $t('auth.image') }}</label>
              <input @change="onChangeImage"
                class=" py-[9px] text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#c1abab] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="file" />
            </div>
            <p v-if="errors.image.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_image") }}
            </p>
            <p v-if="errors.realImage.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_real_image") }}
            </p>
            
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input v-model="state.name" :placeholder="$t('auth.name')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text" />
            </div>
            <p v-if="errors.name.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_name") }}
            </p>
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input v-model="state.email" :placeholder="$t('auth.email')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="email" autocomplete="off" />
            </div>
            <p v-if="errors.email.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_email") }}
            </p>
          </div>






          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input v-model="state.phone" :placeholder="$t('auth.phone')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text" />
            </div>
            <p v-if="errors.phone.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_phone") }}
            </p>
          </div>


          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input v-model="state.tall" :placeholder="$t('auth.tall')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text" />
            </div>
            <p v-if="errors.tall.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_tall") }}
            </p>
          </div>

          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input v-model="state.weight" :placeholder="$t('auth.weight')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text" />
            </div>
            <p v-if="errors.weight.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_weight") }}
            </p>
          </div>

          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <!-- <input v-model="state.goal" :placeholder="$t('auth.goal')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text" /> -->
                <DropDownCompVue 
                :placeholder="$t('auth.goal')" 
              :options="goalOptions"
              @changeVal="changeVal"
              mode="single"
              :locale="locale"
              :close="true"
            />
            </div>
            <p v-if="errors.goal.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_goal") }}
            </p>
          </div>

          <!-- <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input v-model="state.name" :placeholder="$t('auth.name')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text" />
            </div>
            <p v-if="errors.name.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_name") }}
            </p>
          </div> -->


          <!-- 
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <input v-model="state.name" :placeholder="$t('auth.name')"
                class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]"
                type="text" />
            </div>
            <p v-if="errors.name.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_name") }}
            </p>
          </div> -->


          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <div class="relative">
                <div @click="() => changeInputType('password')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'
            } cursor-pointer absolute top-[15px] `">
                  <img v-if="errors.password.isVisible" src="../assets/imgs/hide.svg" alt="" />
                  <img v-else src="../assets/imgs/unhide.svg" alt="" />
                </div>
                <input v-model="state.password" :placeholder="$t('auth.password')"
                  :class="` ${locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'
            } text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
                  :type="errors.password.isVisible ? 'text' : 'password'" autocomplete="off" />
              </div>
            </div>
            <p v-if="errors.password.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_password") }}
            </p>
          </div>
          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[440px] m-auto">
            <div class="relative">
              <div @click="() => changeInputType('passwordConfirmation')" :class="` ${locale == 'ar' ? ' left-5' : ' right-5'
            } cursor-pointer absolute top-[15px] `">
                <img v-if="errors.passwordConfirmation.isVisible" src="../assets/imgs/hide.svg" alt="" />
                <img v-else src="../assets/imgs/unhide.svg" alt="" />
              </div>
              <input v-model="state.passwordConfirmation" :placeholder="$t('auth.confirm_password')"
                :class="` ${locale == 'ar' ? 'pl-[50px]' : 'pr-[50px]'
            } text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[30px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#00000038] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#011F37] dark:text-[#fff] h-[50px] xs:text-[14px] sm:text-[16px]`"
                :type="errors.passwordConfirmation.isVisible ? 'text' : 'password'" autocomplete="off" />
            </div>
            <p v-if="errors.passwordConfirmation.state"
              class="mb-[10px] text-center font-bold text-[14px] text-red-600 xs:text-[14px] sm:text-[16px]">
              {{ $t("auth.errors.add_password_confirmation") }}
            </p>
          </div>
          <button
            class="mt-[15px] max-w-[440px] mx-auto bg-[--main-color] text-[#fff] w-full h-[50px] flex justify-center items-center uppercase font-bold rounded-[46px] text-[12px] xs:text-[14px] sm:text-[16px] md:text[21px]"
            type="submit">
            {{ $t("auth.sign_up") }}
          </button>
        </form>
        <div class="pt-[20px] lg:pt-[30px]">
          <span class="block text-center font-bold text-[16px] xs:text-[18px]">
            <span>
              {{ $t("auth.has_account") }}
            </span>
            <NuxtLink class="uppercase text-[--main-color] px-2" to="/login">
              {{ $t("auth.login") }}</NuxtLink>
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
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength, minLength, sameAs, numeric, requiredIf } from "@vuelidate/validators";
import useServerRequest from "~/composables/useServerRequist";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "../stores/global";
import DropDownCompVue from "~/components/generic/DropDownComp.vue";
import showToast from "~/composables/useToast";

const { locale, locales, setLocale, t } = useI18n();
const { register } = useRequest();
const router = useRouter();
const role = useCookie("role");
const userInfo = useCookie("userInfo");
const global = useGlobalStore();
const imageDisplaying = ref('');


'loseFat','loseWeight', 'gainMuscle' , 'gainWeight' , 'maintain' 

const goalOptions = reactive([
  {name_ar:"خسارة الدهون" , name_en:"lose fat" , value:"loseFat"},
  {name_ar:"خسارة وزن" , name_en:"lose weight" , value:"loseWeight"},
  {name_ar:"الحصول على كتلة عضلية" , name_en:"increase the muscle mass" , value:"gainMuscle"},
  {name_ar:"زيادة الوزن" , name_en:"increase the weight" , value:"gainWeight"},
  {name_ar:"الحفاظ على الوزن" , name_en:"maintain weight" , value:"maintain"},
])


// inputs and validation
const state = reactive({
  name: "",
  email: "",
  phone: "",
  image: "",
  tall: "",
  weight: "",
  goal: "",
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
  phone: {
    state: false,
  },
  image: {
    state: false,
  },
  realImage: {
    state: false,
  },
  tall: {
    state: false,
  },
  weight: {
    state: false,
  },
  goal: {
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
    tall: { required, numeric },
    weight: { required, numeric },
    goal: { required },
    phone: { required, numeric, minLength: minLength(11) },
    image: {
      required: requiredIf(function (nestedModel) {
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']; // Add more MIME types as needed
        if(!state.image){
          errors.image.state = true
          errors.realImage.state =false;
          return true
        }
       else if (allowedMimeTypes.includes(nestedModel.type)) {
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
      })
    },
    password: { required, minLength: minLength(6) },
    passwordConfirmation: {
      required,
      sameAs: sameAs(state.password),
    },
  };
});
const v$ = useVuelidate(rules, state);

const createAccount = async () => {
  errors.name.state = false;
  errors.email.state = false;
  errors.weight.state = false;
  errors.tall.state = false;
  errors.goal.state = false;
  errors.image.state = false;
  errors.phone.state = false;
  errors.password.state = false;
  errors.passwordConfirmation.state = false;

  const result = await v$.value.$validate();
  if (result) {
    const payload = new FormData();
    payload.append('name' , state.name)
    payload.append('email' , state.email)
    payload.append('weight' , state.weight)
    payload.append('tall' , state.tall)
    payload.append('phone' , state.phone)
    payload.append('image' , state.image)
    payload.append('goal' , state.goal)
    payload.append('password' , state.password)
    payload.append('passwordConfirmation' , state.passwordConfirmation)


    register(payload)
      .then((res) => {

        showToast({ message: t('toast.success_regester') });
        router.push("/login");

      })
      .catch((err) => { })
      .finally(() => {
        // state.name = "";
        // state.email = "";
        // state.password = "";
        // state.passwordConfirmation = "";
      });
  } else {
    console.log("else")
    errors.name.state = v$.value.name.$error;
    errors.email.state = v$.value.email.$error;
    errors.tall.state = v$.value.tall.$error;
    errors.weight.state = v$.value.weight.$error;
    errors.phone.state = v$.value.phone.$error;
    errors.goal.state = v$.value.goal.$error;
    // errors.image.state = v$.value.image.$error;
    errors.password.state = v$.value.password.$error;
    errors.passwordConfirmation.state = v$.value.passwordConfirmation.$error;
  }
};
const changeVal = (val, name) => {
    state.goal = val;

};
const onChangeImage = (e) => {
  console.log("e", e.target.files)
  const file = e.target.files[0]
  state.image = file
  imageDisplaying.value = URL.createObjectURL(file);
}
</script>

<style></style>
