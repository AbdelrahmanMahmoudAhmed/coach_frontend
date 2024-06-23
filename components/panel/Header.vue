<template>
  <div v-if="displayPopup">
    <LogoutPopup @closePopup="closePopup" />
  </div>
  <header id="app-header" :class="`border-b-[#16334A] border-b-2`">
    <div
      class="panel-container bg-[--main-card-color] h-[80px] text-[#fff] shadow-3xl relative flex items-center justify-between lg:justify-end"
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
            <!-- 
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
            </div> -->
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

            <div v-else>
    
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

const global = useGlobalStore();
const router = useRouter();
// const route = useRoute();

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
        title: "packages_management",
        link: null,
        isMulti: true,
        subLinks: [
          {
            img: "VPS.svg",
            title: "vps",
            link: "/admin/packages/vps",
            isMulti: false,
          },
          {
            img: "IPv4.svg",
            title: "proxy",
            link: "/admin/packages/proxy",
            isMulti: false,
          },
        ],
      },
      {
        img: "manage_orders.svg",
        title: "orders_management",
        link: "/admin/orders",
        isMulti: false,
      },
      {
        img: "paypal.svg",
        title: "paypal_requests",
        link: "/admin/paypal",
        isMulti: false,
      },
      {
        img: "manage_users.svg",
        title: "users_management",
        link: "/admin/user-management/users",
        isMulti: false,
        // subLinks: [
        //   {
        //     img: "packages.svg",
        //     title: "packages_management",
        //     link: "/admin/user-management/packages",
        //     isMulti: false,
        //   },
        //   {
        //     img: "user.svg",
        //     title: "users",
        //     link: "/admin/user-management/users",
        //     isMulti: false,
        //   },
        //   {
        //     img: "invoice.svg",
        //     title: "invoices",
        //     link: "/admin/user-management/invoices",
        //     isMulti: false,
        //   },
        // ],
      },
      {
        img: "manage_admins.svg",
        title: "admins_management",
        link: "/admin/admins",
        isMulti: false,
      },
      {
        img: "features.svg",
        title: "features_management",
        link: "/admin/features",
        isMulti: false,
      },
      {
        img: "feedback.svg",
        title: "feedback_management",
        link: "/admin/feedback",
        isMulti: false,
      },
      {
        img: "service.svg",
        title: "service",
        link: "/admin/services",
        isMulti: false,
      },
      {
        img: "manage_website.svg",
        title: "website_settings",
        link: "/admin/website-settings",
        isMulti: false,
      },
      {
        img: "info.svg",
        title: "manage_info",
        link: "/admin/info",
        isMulti: false,
      },
    ];
  } else if (type.value == "client") {
    return [
      {
        img: "invoice.svg",
        title: "billing",
        link: "/user/",
        isMulti: false,
      },

      {
        img: "packages.svg",
        title: "packages_management",
        link: null,
        isMulti: true,
        subLinks: [
          {
            img: "IPv4.svg",
            title: "proxy",
            link: "/user/packages/proxy",
            isMulti: false,
          },
          {
            img: "Residential_Proxy.svg",
            title: "residential",
            link: "/user/packages/residential",
            isMulti: false,
          },
          {
            img: "VPS.svg",
            title: "vps",
            link: "/user/packages/vps",
            isMulti: false,
          },
        ],
      },
      {
        img: "manage_admins.svg",
        title: "manage_info",
        link: "/user/manage-account",
        isMulti: false,
      },
    ];
  }
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

</style>~/composables/useRequest