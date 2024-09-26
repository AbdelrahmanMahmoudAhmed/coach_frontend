<template>
    <div
      class="bg-[--main-color-opacity] pb-[20px] lg:pb-[41px] dark:bg-gradient-to-t dark:from-[--main-color] dark:to-[#105B91] "
    >
      <div class="mb-8">
        <SectionTitle
          :title="`${$t('header.transformation')}  `"
          :isColored="true"
        />
      </div>
      <div class="app-container">
        <div class="card">
          <!-- <Carousel
            :value="feedbacks"
            :numVisible="1"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
            :autoplayInterval="3000"
          > -->
  
          <!-- :slides-per-view="2" -->
          <Swiper
            v-if="reload"
            :breakpoints="breakpoints"
           
            :speed="500"
            :pagination="{ clickable: true  }"
            :navigation="true"
            grab-cursor
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
            }"
            :modules="[Autoplay, Pagination, Navigation]"
          >
            <!-- <template #item="slotProps"> -->
            <SwiperSlide
              
              v-for="(item, i) in feedbacks"
              :key="i"
            >
          <div>
            <div class="text-center  font-bold sm:text-[18px] md:text-[22px]"> 
              <span class="p-2 inline-block">{{ locale == 'ar' ? item?.descriptionAr : item?.descriptionEn }}</span>
            </div>
            <div class=" h-[300px] border-[3px] border-[--main-color] rounded-xl overflow-hidden mx-2 sm:h-[400px]">
            <img class=" h-full w-full object-cover" :src="`${baseURL}${item?.image}`"  alt="">
            </div>
          </div>
              <!-- </template> -->
              <!-- </Carousel> -->
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import SectionTitle from "../home/SectionTitle.vue";
  import { ref, onMounted } from "vue";
  
  
  const config = useRuntimeConfig();
  const baseURL = config.public.base_url
    // process.env.NODE_ENV === "production"
    //   ? config.public.prod_base
    //   : config.public.dev_base;
  // const { locale, locales, setLocale } = useI18n();
  
  const responsiveOptions = ref([
    {
      breakpoint: "1400px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ]);
  
  
  // const getSeverity = (status) => {
  //   switch (status) {
  //     case "INSTOCK":
  //       return "success";
  
  //     case "LOWSTOCK":
  //       return "warning";
  
  //     case "OUTOFSTOCK":
  //       return "danger";
  
  //     default:
  //       return null;
  //   }
  // };
  
  //////////////////////////////////
  // imports ( swiper package )
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Autoplay, Navigation, Pagination, A11y, Virtual } from "swiper";
  import "swiper/css";
  import useServerRequist from "~/composables/useServerRequist";
  
  // variables
  const { transformations } = useServerRequist()
  const { data , error , pending} = await transformations();
  
  const feedbacks = data.value?.data;
  
  
  const breakpoints = ref({
    1700: {
      slidesPerView: feedbacks?.length > 3 ? 4 : feedbacks?.length,
      spaceBetween: 10,
    },
    1150: {
      slidesPerView:feedbacks?.length > 2 ? 3 : feedbacks?.length,
      spaceBetween: 20,
    },
    740: {
      slidesPerView:feedbacks?.length > 1 ? 2 : feedbacks?.length,
      spaceBetween: 20,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  });
  
  
  const img = "/imgs/Banner.png";
  const reload = ref(true);
  const { locale, locales, setLocale, t } = useI18n();
  
  // Functions
  const reloadFun = () => {
    reload.value = false;
  
    setTimeout(() => {
      reload.value = true;
    }, 1);
  };
  // to replace img when it has an error
  const handleImgError = (e) => {
    e.target.src = img;
  };
  
  watch(
    () => locale,
    (newValue, oldValue) => {
      reloadFun();
    },
    { deep: true }
  );
  </script>
  <style >
  .direction {
    direction: ltr;
  }
  .swiper.swiper-initialized.swiper-horizontal.swiper-rtl.swiper-backface-hidden {
    width: 100%;
  }
  
  
    .swiper-pagination.swiper-pagination-bullets.swiper-pagination-horizontal {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
  }
  @media (max-width: 300px) {
      .swiper-pagination.swiper-pagination-bullets.swiper-pagination-horizontal {
      align-items: center;
    }
  }
  
    .swiper-pagination.swiper-pagination-bullets.swiper-pagination-horizontal
    span {
    width: 41px;
    height: 9px;
    background: #9FC9D8 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
    cursor: pointer;
  }
  
  
    .swiper-pagination.swiper-pagination-bullets.swiper-pagination-horizontal
    span.swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: #2FA3F7 0% 0% no-repeat padding-box;
  }
  
  @media (max-width: 670px) {
   .swiper-pagination.swiper-pagination-bullets.swiper-pagination-horizontal
      span {
      width: 33px;
      height: 8.5px;
    }
  }
  </style>
  
  
  
  