<template>
  <div
    class="bg-gradient-to-t from-[--trans-color] to-[--main-color] pb-[20px] lg:pb-[41px] dark:from-[--main-color] dark:to-[#105B91] "
  >
    <div>
      <SectionTitle
        :title="`${locale == 'ar' ? '!' : ''} ${$t('header.feedback')} ${
          locale == 'en' ? '!' : ''
        } `"
        :isColord="false"
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
        <Swiper
          v-if="reload"
       
          :slides-per-view="1"
          :loop="true"
          :speed="500"
          :pagination="{ clickable: true  }"
          :navigation="true"
          grab-cursor
          :autoplay="{
            delay: 6000,
            disableOnInteraction: false,
          }"
          :modules="[Autoplay, Pagination, Navigation]"
        >
          <!-- <template #item="slotProps"> -->
          <SwiperSlide
            class=""
            v-for="(item, i) in feedbacks"
            :key="i"
          >
            <div
              class="mx-auto w-full flex justify-center py-[30px] mb-5 relative"
            >
              <div
                class="absolute w-[30px] h-[30px] bottom-[17px] left-[50% - 15px] bg-[#A8DFFC] rotate-45"
              ></div>
              <div
                class="absolute w-[26px] h-[26px] bottom-[25px] left-[50% - 13px] bg-[#fff] rotate-45"
              ></div>
              <div
                class="w-[97%] h-full max-w-[674px] bg-[#A8DFFC] rounded-3xl p-[6px] shadow-slider"
              >
                <div
                  class="w-full h-full max-w-[674px] bg-[#fff] rounded-3xl p-2"
                >
                  <div class="h-full min-h-[280px] px-[20px] lg:px-[43px]">
                    <div class="">
                      <div
                        class="mt-[30px] mb-1 w-[65px] h-[65px] bg-[#001D34] rounded-full mx-auto overflow-hidden"
                      >
                        <img
                          class="w-full h-full "
                          :src="`${baseURL}u/${item?.image}`"
                          alt=""
                        />
                      </div>
                      <h5
                        class="text-center font-[500] text-[--third-color] text-[16px] xs:text-[18px] sm:text-[20px]"
                      >
                        {{ item?.name }}
                      </h5>
                      <div
                        class="w-[166px] h-[27px] rounded-[20px] flex justify-center items-center bg-[#D6F5FE] mx-auto mb-[13px] text-[#001d3475]"
                      >
                        <span>{{ item?.jobTitle }}</span>
                      </div>
                    </div>
                    <div
                      :dir="locale == 'ar' ? 'rtl' : 'ltr'"
                      class="border-t-[3px] border-[#0000001A]"
                    >
                      <!-- <h5 class=" text-[--third-color] mb-[6px] mt-3 font-bold text-center text-[16px] xs:text-[18px] sm:text-[20px] lg-mt-2 lg:text-start lg:mt-[10px] "> {{ item.data.title }}</h5> -->
                      <p
                        v-html="
                          locale == 'ar'
                            ? item?.contentAr.replace(
                                /(?:\r\n|\r|\n)/g,
                                '<br>'
                              ) || ''
                            : item?.content.replace(
                                /(?:\r\n|\r|\n)/g,
                                '<br>'
                              ) || ''
                        "
                        class="text-[#808080] text-[14px] xs:text-[16px] pb-2 mt-3"
                      ></p>
                    </div>
                  </div>
                </div>
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

const props = defineProps({
  feedbacks: Array,
});
const config = useRuntimeConfig();
const baseURL =
  process.env.NODE_ENV === "production"
    ? config.public.prod_base
    : config.public.dev_base;
// const { locale, locales, setLocale } = useI18n();

// const responsiveOptions = ref([
//   {
//     breakpoint: "1400px",
//     numVisible: 1,
//     numScroll: 1,
//   },
//   {
//     breakpoint: "1199px",
//     numVisible: 1,
//     numScroll: 1,
//   },
//   {
//     breakpoint: "767px",
//     numVisible: 1,
//     numScroll: 1,
//   },
//   {
//     breakpoint: "575px",
//     numVisible: 1,
//     numScroll: 1,
//   },
// ]);

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

// variables
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



