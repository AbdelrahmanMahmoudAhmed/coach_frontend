<template>
  <div class="relative max-h-[100vh] overflow-hidden">
    <div
      class="absolute top-0 left-0 h-full w-full bg-[--main-color-opacity] z-10"
    ></div>
    <div
      class="app-container absolute bottom-0 left-0 h-[70%] w-full z-20 flex flex-col items-center sm:h-[75%] xl:h-[75%]"
    >
      <h1
        class="font-bold text-center text-[36px] text-[#00c2f7e7] p-2 rounded-md md:text-[42px] uppercase xl:text-[62px]"
      >
        {{
          locale == "ar" ? firstSecData?.mainTitleAr : firstSecData?.mainTitleEn
        }}
      </h1>
      <p
        class="text-[#FDFDFD] font-bold bg-[#00c2f765] p-4 rounded-xl text-center w-full lg:w-[90%] xl:text-[20px] xl:w-[70%] xl:mb-20 2xl:mt-[50px] 2xl:p-[40px]"
        v-html="
          locale == 'ar'
            ? firstSecData?.mainDescAr.replace(/(?:\r\n|\r|\n)/g, '<br>')
            : firstSecData?.mainDescEn.replace(/(?:\r\n|\r|\n)/g, '<br>')
        "
      ></p>
      <button
        class="text-center block w-fit m-auto text-nowrap bg-[--main-color] text-white rounded-[23px] px-[27px] py-[8px] text-[18px] xs:text-[21px] 2xl:text-[26px] xl:m-[unset]"
      >
    adssdaf dsafsdf</button>
    </div>
    <video
      ref="videoPlayer"
      class="w-[100vw] hidden sm:block"
      autoplay
      muted
      loop
    >
      <source
        class=" "
        src="../../../assets/videos/cris.mp4"
        type="video/mp4"
      />
    </video>
    <video
      ref="mobileVideoPlayer"
      class="w-[100vw] block sm:hidden"
      autoplay
      muted
      loop
    >
      <source
        class=""
        src="../../../assets/videos/IMG_4373.MOV"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n();
const props = defineProps({
  firstSecData: Object,
});
const videoPlayer = ref(null);
const mobileVideoPlayer = ref(null);

const playVideo = () => {
  const video = videoPlayer.value;
  const mobileVideo = videoPlayer.value;
  if (video && typeof video.play === "function") {
    video.play();
  }
  if (mobileVideo && typeof mobileVideo.play === "function") {
    mobileVideo.play();
  }
};

// Play video on page mount and when route changes
onMounted(() => {
  playVideo(); // When the component mounts
});
</script>

<style>
</style>