<template>
  <div :class="`${className} max-w-[300px] min-w-[200px] break-words `">
    <p class="" v-if="isExceed">
      <template v-if="showMore">
        {{ text }}
      </template>
      <template v-else>
        {{ formatedText }}
      </template>
      <button @click="toggleShowMore" class="ms-1 bg-[--third-color] text-[14px] text-white mx-2 py-1 px-2 rounded-lg hover:text-[--main-color]">
        {{ showMore ? t('global.see_less') : t('global.see_more') }}
      </button>
    </p>
    <p class="" v-else>
      {{ text }}
    </p>
  </div>
</template>
  
  <script setup>
const { locale, locales, setLocale, t } = useI18n();

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  linesLimit: {
    type: Number,
    default: 2,
  },
  lengthLimit: {
    type: Number,
    default: 50,
  },
  className: {
    type: String,
    default: "",
  },
});

const { text, linesLimit, lengthLimit, className } = toRefs(props);
const showMore = ref(false);

const toggleShowMore = () => {
  showMore.value = !showMore.value;
  console.log("formatedText", formatedText.value);
};

const isExceed = computed(() => {
  return (
    text.value.split("\n").length > linesLimit.value ||
    text.value.length > lengthLimit.value
  );
});

const formatedText = computed(() => {
  let formatedText = text.value;
  if (formatedText.split("\n").length > linesLimit.value) {
    formatedText = formatedText
      .split("\n")
      .slice(0, linesLimit.value)
      .join("\n");
  }
  if (formatedText.length > lengthLimit.value) {
    formatedText = formatedText.substring(0, lengthLimit.value);
  }
  return formatedText;
});
</script>
  