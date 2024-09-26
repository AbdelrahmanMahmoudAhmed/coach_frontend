<template>
  <div v-if="displayPopup">
    <LogoutPopup @closePopup="closePopup" />
  </div>
  <header id="app-header" :class="`border-b-[#16334A] border-b-2`">
    <div
      class="panel-container bg-[--third-color] h-[80px] text-[#fff] shadow-3xl relative flex items-center justify-between lg:justify-end"
    >
      <div>
        <div class="flex justify-center lg:hidden">
          <img src="../../assets/imgs/logo.svg" alt="" />
        </div>
      </div>

      <div class="">
        <div class="flex justify-between items-center">
          <div class="flex items-start lg:self-start">
            <!-- <div
              class="flex bg-[#fff] mx-3 h-[30px] w-[30px] justify-center rounded-[5px] items-center gap-[5px] text-[20px] font-[400] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class=" fill-[--main-color]"
              >
                <path
                  d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
                ></path>
              </svg>
            </div> -->
            <button
              :class="` ${
                locale == 'en' ? 'mr-[16px] ' : 'ml-[16px]'
              } bg-[#fff] w-[30px] h-[30px] items-center justify-center rounded-[4px] flex lg:hidden`"
              @click="openSidebar"
            >
              <img src="../../assets/imgs/burger.svg" alt="" />
            </button>
            <button
              :class="` ${
                locale == 'en' ? 'mr-[10px] ' : 'ml-[10px]'
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
              class="bg-[#fff] w-[30px] h-[30px] flex items-center justify-center rounded-[4px] cursor-pointer p-[1px]"
            >
              <img
               
                class="w-[48px] h-[30px] inline-block"
                src="../../assets/imgs/language.svg"
                alt=""
              />
        
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- start sidebar  -->
    <div
      @click="closeSidebar"
      v-if="toggleSidebar"
      class="fixed top-0 left-0 blur-sm z-10 w-[100vw] h-[100vh] backdrop-blur-[4px]"
    ></div>
    
    <div
      :class="`${
        toggleSidebar
          ? 'right-0 lg:left-0 w-[240px] xs:w-[260px] sm:w-[280px] lg:w-[300px]'
          : ' rtl:right-[-17px] left-[-17px] w-0 lg:rtl:right-0 lg:left-0 lg:w-[100px] '
      } duration-500 fixed flex flex-col justify-between  text-[#fff] gap-[10px] overflow-y-auto overflow-x-hidden z-20 top-0 h-[100vh] py-6 px-2 rtl:right-0 left-0 bg-[#001D34]  `"
    >
      <div>
        <div class="flex justify-center pb-3">
          <img src="../../assets/imgs/logo.svg" alt="" />
        </div>

        <button
        @click="toggleSidebarFun"

          :class="` m-auto gap-[5px] bg-[#16334A] h-[50px] w-[50px] my-4 p-2 transition-all duration-300 rounded-full hidden lg:flex hover:bg-[#285e89] ${toggleSidebar && 'rotate-180'}`"
        >
          <img :class="` w-[30px]`" src="../../assets/imgs/arrow.svg" alt="" />
        </button>

        <ul :class="`${toggleSidebar ? 'visible' : 'invisible lg:visible'} `">
          <li v-for="(link, idx) in links" :key="idx">
            <NuxtLink
              v-if="!link.isMulti"
              :to="link.link"
              :class="` flex gap-[5px] bg-[#16334A] h-[50px] my-4 p-2 rounded-md transition-all duration-300 w-full hover:px-5 hover:bg-[#285e89] `"
            >
              <img
                :class="`${!toggleSidebar && 'lg:mx-auto'} w-[30px]`"
                :src="`/imgs/${link.img}`"
                alt=""
              />
              <span
                :class="`${
                  !toggleSidebar && 'lg:hidden'
                } text-[16px] text-nowrap  flex items-center lg:text-[18px]`"
                >{{ $t(`sidebar.${type}.${link.title}`) }}</span
              >
            </NuxtLink>

            <div v-else >
              <button
              @click="toggleShowWebsiteButton"
              :class="` ${showWebsiteButton ? 'my-4' : 'mt-4'} relative z-10 items-center flex gap-[5px] bg-[#16334A] h-[50px] p-2 rounded-md transition-all duration-300 w-full hover:px-5 hover:bg-[#285e89] `"
            >
              <img
                :class="`${!toggleSidebar && 'lg:mx-auto'} w-[30px]`"
                :src="`/imgs/${link.img}`"
                alt=""
              />
              <div
                :class="`${
                  !toggleSidebar && 'lg:hidden'
                } text-[16px] text-nowrap  flex items-center justify-between w-full lg:text-[18px]`"
                ><span>{{ $t(`sidebar.${type}.${link.title}`) }}</span> <img class="w-[20px]" src="/imgs/down-2.svg" alt="">
              </div>
            </button>
            
            <ul :class="`${showWebsiteButton ? 'h-[500px] opacity-100 p-2 ' : 'h-0 opacity-0 p-0 '} bg-[#294a64aa] relative top-[-16px] overflow-hidden transition-[height] duration-700 `">
              <li v-for="(sub , index) in link.subLinks" :key="index">
                <NuxtLink
           
              :to="sub.link"
              :class="` flex gap-[5px] bg-[#16334A] h-[50px] my-4 p-2 rounded-md transition-all duration-300 w-full hover:px-5 hover:bg-[#285e89] `"
            >
              <img
                :class="`${!toggleSidebar && 'lg:mx-auto'} w-[30px]`"
                :src="`/imgs/${sub.img}`"
                alt=""
              />
              <span
                :class="`${
                  !toggleSidebar && 'lg:hidden'
                } text-[16px] text-nowrap  flex items-center lg:text-[18px]`"
                >{{ $t(`sidebar.${type}.${sub.title}`) }}</span
              >
            </NuxtLink>
              </li>
            </ul>
            </div>
          </li>
        </ul>
      </div>

      <div class="self-end w-full left-0 bottom-0 mb-8 px-[8px]">
        <NuxtLink
          to="/"
          class="mb-3 bg-[--main-color] font-bold text-[18px] block rounded-md w-full transition-all duration-300 hover:bg-[#618aa8]"
        >
          <button
            class="w-full py-2 flex items-center justify-center gap-2 text-center h-[40px]"
          >
            <img
              class="block h-full"
              src="../../assets/imgs/auth/home_img.svg"
              alt=""
            />
            <span v-if="toggleSidebar">
              {{ $t("header.home") }}
            </span>
          </button>
        </NuxtLink>

        <span
          class="bg-[--main-color] font-bold text-[18px] block rounded-md w-full transition-all duration-300 hover:bg-[#618aa8]"
        >
          <button
            @click="openPopup"
            class="w-full py-2 flex items-center justify-center gap-2 text-center h-[40px]"
          >
            <img
              class="block h-full"
              src="../../assets/imgs/auth/logout.svg"
              alt=""
            />
            <span v-if="toggleSidebar">
              {{ $t("header.logout") }}
            </span>
          </button>
        </span>
      </div>
    </div>
    <!-- end sidebar  -->
  </header>
</template>
    
  <script setup>
import { useGlobalStore } from "~/stores/global";
// import useRequest from "~/composables/useRequest";
import LogoutPopup from "../generic/LogoutPopup.vue";

const displayPopup = ref(false);
const isDark = useCookie("isDark");
const { locale, locales, setLocale } = useI18n();
const type = useCookie("type");
const userInfo = useCookie("userInfo");

const toggleSidebar = ref(false);
const showWebsiteButton = ref(false)
const global = useGlobalStore();
const router = useRouter();
// const route = useRoute();

const toggleShowWebsiteButton = ( ) => {
  showWebsiteButton.value = !showWebsiteButton.value
}

const openSidebar = () => {
  toggleSidebar.value = true;
};
const toggleSidebarFun = () => {
  toggleSidebar.value = !toggleSidebar.value;
};

const closeSidebar = () => {
  toggleSidebar.value = false;
};

const openPopup = () => {
  displayPopup.value = true;
  closeSidebar();
};
const closePopup = () => {
  displayPopup.value = false;
};
const links = computed(() => {
  if (type.value == "admin") {
    return [
      {
        img: "dashboard.svg",
        title: "dashboard",
        link: "/admin",
        isMulti: false,
      },
      {
        img: "packages.svg",
        title: "products",
        link: "/admin/products",
        isMulti: false,
      },
      {
        img: "service.svg",
        title: "service",
        link: "/admin/programs",
        isMulti: false,
      },
      {
        img: "manage_orders.svg",
        title: "orders_management",
        link: "/admin/orders",
        isMulti: false,
      },

      {
        img: "manage_users.svg",
        title: "users_management",
        link: "/admin/users",
        isMulti: false,
      },
      {
        img: "manage_admins.svg",
        title: "admins_management",
        link: "/admin/admins",
        isMulti: false,
      },
      {
        img: "contact.svg",
        title: "contact",
        link: "/admin/contact",
        isMulti: false,
      },
      {
        img: "settings.svg",
        title: "website_settings",
        link: null,
        isMulti: true,
                subLinks: [
          {
            img: "manage_website.svg",
            title: "website_settings",
            link: "/admin/website-settings",
            isMulti: false,
          },
          {
        img: "section.svg",
        title: "sections",
        link: "/admin/website-settings/sections",
        isMulti: false,
      },
          {
        img: "certificate.svg",
        title: "certification",
        link: "/admin/website-settings/certification",
        isMulti: false,
      },
      {
        img: "video.svg",
        title: "videos",
        link: "/admin/website-settings/videos",
        isMulti: false,
      },
      {
        img: "transformation.svg",
        title: "transformation",
        link: "/admin/website-settings/transformation",
        isMulti: false,
      },
      {
        img: "testimonial.svg",
        title: "testimonial",
        link: "/admin/website-settings/testimonials",
        isMulti: false,
      },
      {
        img: "blogs.svg",
        title: "blogs",
        link: "/admin/website-settings/blogs",
        isMulti: false,
      },
      {
        img: "answers.svg",
        title: "quick_answer",
        link: "/admin/website-settings/answers",
        isMulti: false,
      },
      
        ],
      },
      {
        img: "info.svg",
        title: "manage_info",
        link: "/admin/info",
        isMulti: false,
      },
    ];
  } 
  
  // else if (type.value == "client") {
  //   return [
  //     {
  //       img: "invoice.svg",
  //       title: "billing",
  //       link: "/user/",
  //       isMulti: false,
  //     },

  //     {
  //       img: "packages.svg",
  //       title: "packages_management",
  //       link: null,
  //       isMulti: true,
  //       subLinks: [
  //         {
  //           img: "IPv4.svg",
  //           title: "proxy",
  //           link: "/user/packages/proxy",
  //           isMulti: false,
  //         },
  //         {
  //           img: "Residential_Proxy.svg",
  //           title: "residential",
  //           link: "/user/packages/residential",
  //           isMulti: false,
  //         },
  //         {
  //           img: "VPS.svg",
  //           title: "vps",
  //           link: "/user/packages/vps",
  //           isMulti: false,
  //         },
  //       ],
  //     },
  //     {
  //       img: "manage_admins.svg",
  //       title: "manage_info",
  //       link: "/user/manage-account",
  //       isMulti: false,
  //     },
  //   ];
  // }
});

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
</script>
    
    <style>
    .router-link-active{
      background-color: #285e89;
    }

</style>