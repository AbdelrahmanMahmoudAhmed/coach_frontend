<template>
  <div class="mb-[30px] lg:mb-[80px]">
    <div>
      <SectionTitle :title="`${$t('header.Q&A')}`" :isColored="true" />
    </div>
    <div class="app-container pt-[25px] lg:pt-[40px]">
      <div class="m-auto w-full lg:w-[80%] xl:w-[65%]">
        <div
          class="cursor-pointer border border-[--main-color] mb-2 p-2 rounded-lg bg-[--secondary-color]"
          v-for="(item, idx) in questions"
          :key="idx"
          @click="() => toggleQuestion(item?.id)"
        >
          <div class="flex justify-between px-3 items-center font-bold">
            {{ locale == "ar" ? item?.questionAr : item?.questionEn }}
            <img
              :class="`w-[20px] transition-all duration-1000   ${
                item?.isOpen && 'rotate-180'
              }`"
              src="/imgs/down-2.svg"
              alt=""
            />
          </div>
          <div
            :class="`transition-all duration-1000 relative ${
              item?.isOpen ? 'max-h-[300px]' : 'max-h-0'
            }`"
          >
            <div
              v-show="item?.isOpen"
              class="my-4 w-[90%] mx-auto h-[1px] rounded-lg bg-[#82c3eb]"
            ></div>

            <p v-html=" locale == 'ar' ? `${item?.answerAr?.replace(/(?:\r\n|\r|\n)/g, '<br>' )}` : `${item?.answerEn?.replace(/(?:\r\n|\r|\n)/g, '<br>' )}`"
           
              :class="` transition-all duration-700  px-4   ${
                item?.isOpen ? 'opacity-1' : 'opacity-0'
              } `"
            >
        
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import SectionTitle from "../home/SectionTitle.vue";
const props = defineProps({
  features: Array,
});
import useServerRequist from "~/composables/useServerRequist";
const { quickAnswer } = useServerRequist();
const { data, error, pending } = await quickAnswer();
const prepareQuestions = data.value?.data.map((item) => {
  item.isOpen = false;
  return item;
});
const questions = ref(prepareQuestions);

const toggleQuestion = (id) => {
  questions.value = questions.value.map((item) => {
    if (item.id == id) item.isOpen = !item.isOpen;
    else item.isOpen = false;
    return item;
  });
};

const config = useRuntimeConfig();
const baseURL =
  process.env.NODE_ENV === "production"
    ? config.public.prod_base
    : config.public.dev_base;
const { locale, locales, setLocale } = useI18n();

const allFeatures = ref([
  {
    title: "Feature 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Feature 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Feature 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Feature 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  {
    title: "Feature 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Feature 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Feature 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Feature 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
]);
</script>
  
  <style>
</style>
  
  
  