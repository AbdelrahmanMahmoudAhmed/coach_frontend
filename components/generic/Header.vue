<template>
    <div v-if="displayPopup">
  <LogoutPopup  @closePopup="closePopup" />
  </div>
  <header id="app-header" :class="`fixed top-0 left-0 w-full z-30  `">
    <div
      class="app-container bg-[--main-card-color] text-[#fff] shadow-3xl relative"
    >
      <div class="pt-[20px] lg:pt-[48px]">
        <div
          class="flex justify-between items-center pb-4 border-b-[#16334A] lg:pb-2 lg:border-b-2"
        >
          <div class="flex gap-[50px]">
            <div
              @click="() => navToSection('home', 'home-page')"
              class="cursor-pointer"
            >
              <img src="../../assets/imgs/logo.svg" alt="" />
            </div>
            <ul
              class="hidden gap-[20px] text-[16px] text-[#FFFFFF66] xl:text-[17px] xl:gap-[30px] 2xl:text-[20px] lg:flex"
            >
              <li
                @click="() => navToSection('home', 'home-page')"
                :class="`${
                  activeState.home ? 'active-nav' : ''
                } cursor-pointer`"
              >
                {{ $t("header.home") }}
              </li>
              <li
                @click="() => navToSection('about', 'about-section')"
                :class="`${
                  activeState.about ? 'active-nav' : ''
                } cursor-pointer`"
              >
                {{ $t("header.about") }}
              </li>
              <li
                @click="() => navToSection('feature', 'feature-section')"
                :class="`${
                  activeState.feature ? 'active-nav' : ''
                } cursor-pointer`"
              >
                {{ $t("header.feature") }}
              </li>
              <li
                @click="() => navToSection('feedback', 'feedback-section')"
                :class="`${
                  activeState.feedback ? 'active-nav' : ''
                } cursor-pointer`"
              >
                {{ $t("header.feedback") }}
              </li>
              <li
                @click="() => navToSection('contactUs', 'contact-us-section')"
                :class="`${
                  activeState.contactUs ? 'active-nav' : ''
                } cursor-pointer`"
              >
                {{ $t("header.contact_us") }}
              </li>
            </ul>
          </div>
          <div class="flex items-center lg:self-start">
            <button
            @click="openPopup"
              v-if="global.isAuth || role == 'admin' || role == 'user'"
              class="hidden font-bold text-[12px] uppercase xs:text-[18px] mx-[10px] lg:block xl:mx-[10px]"
            >
              {{ $t("header.logout") }}
            </button>
            <NuxtLink
              v-else
              to="/login"
              class="hidden font-bold text-[12px] uppercase xs:text-[18px] mx-[10px] lg:block xl:mx-[10px]"
            >
              {{ $t("header.login") }}
            </NuxtLink>

            <NuxtLink
               v-if="role == 'admin' || global.user.type == 'admin' "
              :to="`/admin`"
              :class="`${
                locale == 'en' ? 'mr-[10px]' : 'ml-[10px]'
              } hidden h-[30px] whitespace-nowrap bg-[--main-color] text-[17px] px-[10px] rounded-[4px] items-center lg:flex`"
            >
              {{ $t("header.my_account") }}
            </NuxtLink>
            <NuxtLink
            v-else-if="role == 'user' || global.user.type == 'user' "
              :to="`/user`"
              :class="`${
                locale == 'en' ? 'mr-[10px]' : 'ml-[10px]'
              } hidden h-[30px] whitespace-nowrap bg-[--main-color] text-[17px] px-[10px] rounded-[4px] items-center lg:flex`"
            >
              {{ $t("header.my_account") }}
            </NuxtLink>
            <NuxtLink
              v-else
              to="/create-account"
              :class="`${
                locale == 'en' ? 'mr-[10px]' : 'ml-[10px]'
              } hidden h-[30px] whitespace-nowrap bg-[--main-color] text-[17px] px-[10px] rounded-[4px] items-center lg:flex`"
            >
              {{ $t("header.create") }}
            </NuxtLink>
            <button
              :class="` ${
                locale == 'en'
                  ? 'mr-[10px] 2xl:mr-[30px]'
                  : 'ml-[10px] 2xl:ml-[30px]'
              } bg-[#fff] w-[30px] h-[30px] flex items-center justify-center rounded-[4px] lg:hidden`"
              @click="openSidebar"
            >
              <img src="../../assets/imgs/burger.svg" alt="" />
            </button>
            <button
              :class="` ${
                locale == 'en'
                  ? 'mr-[10px] 2xl:mr-[30px]'
                  : 'ml-[10px] 2xl:ml-[30px]'
              } bg-[#fff] w-[30px] h-[30px] flex items-center justify-center rounded-[4px]`"
              @click="changeMode"
            >
              <img
                v-if="isDark == 'light'"
                src="../../assets/imgs/darkmode.svg"
                alt=""
              />
              <img v-else src="../../assets/imgs/lightmode.png" alt="" />
            </button>

            <div
              @click="changeLang"
              class="flex items-center gap-[5px] text-[20px] font-[400] cursor-pointer"
            >
    
              <img
                v-if="locale == 'en'"
                class="hidden w-[48px] h-[30px] sm:inline-block"
                src="../../assets/imgs/arabic.png"
                alt=""
              />
              <img
                v-else
                class="hidden w-[48px] h-[30px] sm:inline-block"
                src="../../assets/imgs/english.png"
                alt=""
              />
              <span class="flex items-center"> {{ $t("header.lang") }}</span>
            </div>
          </div>
        </div>
        <div class="hidden pb-[12px] pt-[21px] lg:block">
    
        </div>
      </div>
    </div>

    <div
      @click="closeSidebar"
      v-if="toggleSidebar"
      class="fixed top-0 left-0 blur-sm z-10 w-[100vw] h-[100vh]"
    ></div>
    <div
      :class="`${
        toggleSidebar
          ? 'rtl:right-0 left-0'
          : 'rtl:right-[-200px] left-[-200px] sm:rtl:right-[-300px] sm:left-[-300px]'
      } duration-700 fixed flex flex-col justify-between text-[#fff] gap-[50px] overflow-auto z-20 top-0 h-[100vh] w-[200px] py-6 px-2 bg-[#001D34] sm:w-[300px] lg:hidden `"
    >
      <div>
        <div class="flex justify-center pb-5">
          <img src="../../assets/imgs/logo.svg" alt="" />
        </div>

        <ul
          class="mb-[60px] text-[16px] text-[#FFFFFF66] xl:text-[17px] 2xl:text-[20px]"
        >
          <li
            @click="() => navToSection('home', 'home-page')"
            :class="`${
              activeState.home ? 'active-nav' : ''
            } cursor-pointer mb-3 transition-all duration-300 hover:px-2`"
          >
            {{ $t("header.home") }}
          </li>
          <li
            @click="() => navToSection('about', 'about-section')"
            :class="`${
              activeState.about ? 'active-nav' : ''
            } cursor-pointer mb-3 transition-all duration-300 hover:px-2`"
          >
            {{ $t("header.about") }}
          </li>
          <li
            @click="() => navToSection('feature', 'feature-section')"
            :class="`${
              activeState.feature ? 'active-nav' : ''
            } cursor-pointer mb-3 transition-all duration-300 hover:px-2`"
          >
            {{ $t("header.feature") }}
          </li>
          <li
            @click="() => navToSection('feedback', 'feedback-section')"
            :class="`${
              activeState.feedback ? 'active-nav' : ''
            } cursor-pointer mb-3 transition-all duration-300 hover:px-2`"
          >
            {{ $t("header.feedback") }}
          </li>
          <li
            @click="() => navToSection('contactUs', 'contact-us-section')"
            :class="`${
              activeState.contactUs ? 'active-nav' : ''
            } cursor-pointer mb-3 transition-all duration-300 hover:px-2`"
          >
            {{ $t("header.contact_us") }}
          </li>
        </ul>

       
      </div>

      <div class="self-end w-full left-0 bottom-0 mb-8 px-[8px]">
        <NuxtLink
          v-if="role == 'user' || global.user.type == 'user'"
          :to="`/user`"
          :class="`bg-[--main-color] text-center font-bold text-[18px] block rounded-xl w-full mb-2 py-[2px]`"
        >
          {{ $t("header.my_account") }}
        </NuxtLink>

        <NuxtLink
          v-else-if="role == 'admin' || global.user.type == 'admin' "
          :to="`/admin`"
          :class="`bg-[--main-color] text-center font-bold text-[18px] block rounded-xl w-full mb-2 py-[2px]`"
        >
          {{ $t("header.my_account") }}
        </NuxtLink>

        <NuxtLink
          v-else
          to="/create-account"
          :class="`bg-[--main-color] text-center font-bold text-[18px] block rounded-xl w-full mb-2 py-[2px]`"
        >
          {{ $t("header.create") }}
        </NuxtLink>

        <span
          v-if="global.isAuth || role == 'admin' || role == 'user'"
          class="bg-[--main-color] font-bold text-[18px] block rounded-xl w-full"
        >
          <button
          @click="openPopup"
            class="bg-[--main-color] font-bold text-[18px] block rounded-xl w-full"
          >
            {{ $t("header.logout") }}
          </button>
        </span>
        <span
          v-else
          class="bg-[--main-color] font-bold text-[18px] block rounded-xl w-full"
        >
          <NuxtLink to="/login" class="w-full block text-center py-[2px]"
            >{{ $t("header.login") }}
          </NuxtLink>
        </span>
      </div>
    </div>
  </header>
</template>
  
  <script setup>
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";
import LogoutPopup from "./LogoutPopup.vue";
const { locale, locales, setLocale } = useI18n();
const role = useCookie("role");
const userInfo = useCookie('userInfo')
const isDark = useCookie("isDark");
const global = useGlobalStore();
const router = useRouter();
const route = useRoute();
// const { logout } = useRequest();
const displayPopup = ref(false)

const currentPage = ref(route.fullPath.replace("/", "").toLowerCase())

const currentRole = computed(()=> role.value)


const openPopup = ( ) => {
  displayPopup.value = true
}
const closePopup = ( ) => {
  displayPopup.value = false
}



const toggleSidebar = ref(false);
const activeState = reactive({
  home: false,
  about: false,
  feature: false,
  feedback: false,
  contactUs: false,
});

const openLoader = ( link ) => {

// open loader before navigate to server side pages
  if(currentPage.value?.toLowerCase() != link?.title?.toLowerCase()){
    currentPage.value = link?.title
  global.turnLoaderOn()
  }

}


const logoutFun = ( ) => {
  // logout().then((res)=>{

  //   role.value="",
  //   global.updateAuth({user:{} , isAuth:false})
  //   localStorage.setItem('auth',"")
  //   userInfo.value = ""
  // })
}

const navToSection = (type, id) => {
  if (route.fullPath != "/"){
    router.push("/");
    setTimeout(() => {
    const element = document.getElementById(id);
    const header = document.getElementById("app-header");
    const headerHeight = header.offsetHeight;

    let pos = element.offsetTop;
    window.scrollTo({
      top: pos - headerHeight,
      behavior: "smooth",
    });
  }, 500);
  } else{
    setTimeout(() => {
    const element = document.getElementById(id);
    const header = document.getElementById("app-header");
    const headerHeight = header.offsetHeight;

    let pos = element.offsetTop;
    window.scrollTo({
      top: pos - headerHeight,
      behavior: "smooth",
    });
  });
  }


};

const addActiveOnScroll = () => {
  let height = window.pageYOffset;

  const firstSec = document.getElementById("home-page");
  const aboutSec = document.getElementById("about-section");
  const featureSec = document.getElementById("feature-section");
  const feedbackSec = document.getElementById("feedback-section");
  const contactUsSec = document.getElementById("contact-us-section");

  const header = document.getElementById("app-header");



  if (route.fullPath == "/") {
    if (height > contactUsSec.offsetTop - (header.offsetHeight + 150)) {
      // change active class
      Object.keys(activeState).forEach((item) => {
        if (item == "contactUs") {
          activeState[item] = true;
        } else {
          activeState[item] = false;
        }
      });
    } else if (height > feedbackSec.offsetTop - (header.offsetHeight + 150)) {
      // change active class
      Object.keys(activeState).forEach((item) => {
        if (item == "feedback") {
          activeState[item] = true;
        } else {
          activeState[item] = false;
        }
      });
    } else if (height > featureSec.offsetTop - (header.offsetHeight + 150)) {
      // change active class
      Object.keys(activeState).forEach((item) => {
        if (item == "feature") {
          activeState[item] = true;
        } else {
          activeState[item] = false;
        }
      });
    } else if (height > aboutSec.offsetTop - (header.offsetHeight + 150)) {
      // change active class
      Object.keys(activeState).forEach((item) => {
        if (item == "about") {
          activeState[item] = true;
        } else {
          activeState[item] = false;
        }
      });
    } else {
      Object.keys(activeState).forEach((item) => {
        if (item == "home") {
          activeState[item] = true;
        } else {
          activeState[item] = false;
        }
      });
    }

  }
};

const openSidebar = () => {
  toggleSidebar.value = true;
};

const closeSidebar = () => {
  toggleSidebar.value = false;
};


function changeMode() {
  const body = document.body;
  if (isDark.value == "dark") {
    isDark.value = "light";
    body.classList.remove("dark");
    body.classList.add("light");
    body.setAttribute("dir");
  } else {
    isDark.value = "dark";
    body.classList.remove("light");
    body.classList.add("dark");
  }
}
const changeLang = () => {
  const body = document.body;

  if (locale.value == "en") {
    setLocale("ar");
    body.setAttribute("dir", "rtl");
  } else {
    setLocale("en");
    body.setAttribute("dir", "ltr");
  }
};




//hooks
onMounted(() => {
  document.addEventListener("scroll", addActiveOnScroll);
});

watch(
  () => route.fullPath,
  (current) => {
    if (current != "/") {
      Object.keys(activeState).forEach((item) => (activeState[item] = false));
    } else {
      activeState.home = true;
    }
  },
  { immediate: true }
);


</script>
  
  <style>
.p-accordion-content,
.p-accordion-header-link,
.p-accordion-header-link:hover {
  background-color: var(--main-card-color);
  border: 1px solid var(--secondary-card-color);
  color: #fff;
}
</style>~/composables/useRequest