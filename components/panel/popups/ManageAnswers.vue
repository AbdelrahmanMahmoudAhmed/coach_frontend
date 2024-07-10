<template>
    <div @click.self="closePopup"
      class="popup-holder popup">
      <!-- <div class=" flex justify-center items-center"> -->
      <form @submit.prevent="manageAnswerFun"
        class="panel-form ">
     <div @click="closePopup" :class="`${locale == 'ar' ? 'left-4' : 'right-4'} absolute top-4 cursor-pointer`">
      <img class="w-[40px] cursor-pointer" :src="isDark == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'" alt="">
     </div>
        <h3 class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold">
          {{ $t(`admin.actions.${type}_question`) }}
        </h3>
        <div v-if="type != 'delete'" class="flex flex-col justify-center">

          <div class="mb-[10px] w-full flex flex-col justify-center max-w-[700px] m-auto">
      

          </div>
          <div class="panel-input-holder ">
            <div class="relative">
              <input v-model="state.questionAr" :placeholder="$t('auth.question_ar')"
                class="panel-input"
                type="text" />
            </div>
            <p v-if="errors.questionAr.state"
              class="panel-input-err ">
              {{ $t(`auth.errors.${errors.questionAr.message}`) }}
            </p>
          </div>
          <div class="panel-input-holder ">
            <div class="relative">
              <input v-model="state.questionEn" :placeholder="$t('auth.question_en')"
                class="panel-input"
                type="text" />
            </div>
            <p v-if="errors.questionEn.state"
              class="panel-input-err ">
              {{ $t(`auth.errors.${errors.questionEn.message}`) }}
            </p>
          </div>
          <div class="panel-input-holder ">
            <div class="relative">
              <textarea v-model="state.answerAr" :placeholder="$t('auth.answer_ar')"
                class="panel-input h-[100px] px-6 py-2"
                type="text" autocomplete="off" ></textarea>
            </div>
            <p v-if="errors.answerAr.state"
              class="panel-input-err ">
              {{ $t(`auth.errors.${errors.answerAr.message}`) }}
            </p>
          </div>
          <div class="panel-input-holder ">
            <div class="relative">
              <textarea v-model="state.answerEn" :placeholder="$t('auth.answer_ar')"
                class="panel-input h-[100px] px-6 py-2"
                type="text" autocomplete="off" ></textarea>
            </div>
            <p v-if="errors.answerEn.state"
              class="panel-input-err ">
              {{ $t(`auth.errors.${errors.answerEn.message}`) }}
            </p>
          </div>  
        
        </div>
  
        <div v-else-if="type == 'delete'">
          <div class="text-center font-[900]">
            {{ $t(`admin.actions.delete_answer_msg` , {answer : locale == "ar" ? currentAnswer?.questionAr : currentAnswer?.questionEn }) }}
  
          </div>
        </div>
  
        <div class="popup-actions-holder">
          <button @click="closePopup" type="button"
            class="panel-cancel-btn ">
            {{ $t(`admin.actions.cancel`) }}
          </button>
          <button type="submit" :class="`${type == 'delete' ? ' bg-red-800 hover:bg-red-600' : 'bg-[#2FA3F7] hover:bg-[#62b4ef]'
      }  rounded-[21px] h-[40px] px-[23px] w-full sm:w-fit`">
            {{ $t(`admin.actions.${type}`) }}
          </button>
        </div>
      </form>
    </div>
    <!-- </div> -->
  </template>
  
  <script setup>
  const emit = defineEmits(["closePopup", "getAnswers"]);
  const props = defineProps({
    type: String,
    currentAnswer: Object,
  });
  const isDark = useCookie("isDark");
  
  import useVuelidate from "@vuelidate/core";
  import {
    required,
    minLength,
    helpers
  } from "@vuelidate/validators";
  import useRequest from "~/composables/useRequest";
  import showToast from "~/composables/useToast";
    
  const { createQuickAnswer, editQuickAnswer, deleteQuickAnswer } = useRequest();
  const { locale, t } = useI18n();
  
  const state = reactive({
    questionAr:  "",
    questionEn: "",
    answerAr: "",
    answerEn: "",
  });

  const errors = reactive({
    questionAr: {
      state: false,
      message:"",
    },
    questionEn: {
      state: false,
      message:"",
    },
    answerAr: {
      state: false,
      message:"",
    },
    answerEn: {
      state: false,
      message:"",
    },

  });
  
  const rules = computed(() => {
    return {
      questionAr: { required: helpers.withMessage('add_question_ar', required), minLength:  helpers.withMessage('at_least_seven', minLength(7))  },
      questionEn: { required: helpers.withMessage('add_question_ar', required), minLength:  helpers.withMessage('at_least_seven', minLength(7))  },
     
      answerAr: { required: helpers.withMessage('add_answer_ar', required), minLength:  helpers.withMessage('at_least_seven', minLength(7))  },
      answerEn: { required: helpers.withMessage('add_answer_ar', required), minLength:  helpers.withMessage('at_least_seven', minLength(7))  },
  
    };
  });
  
  const v$ = useVuelidate(rules, state);
  
  const closePopup = () => {
    emit("closePopup");
  };
  
  const getAnswers = () => {
    emit("getAnswers");
  };
  
  const manageAnswerFun = async () => {
  
    if (props.type != "delete") {
      errors.questionAr.state = false;
      errors.questionEn.state = false;
      errors.answerAr.state = false;
      errors.answerEn.state = false;
  
      const payload = new FormData();
  
      const result = await v$.value.$validate();
  
      if (result  ) {
        state.questionAr && payload.append("questionAr", state.questionAr);
        state.questionEn && payload.append("questionEn", state.questionEn);
        state.answerAr && payload.append("answerAr", state.answerAr);
        state.answerEn && payload.append("answerEn", state.answerEn);
        try {
          let res;
          if (props.type == "add") res = await createQuickAnswer(payload);
          if (props.type == "edit")
            res = await editQuickAnswer(props.currentAnswer?.id, payload);
  
          if (res.data.success) {
            props.type == "add" && showToast({ message: t("toast.success_add_question") });
            props.type == "edit" && showToast({ message: t("toast.success_edit_question") });
            getAnswers();
            closePopup();
          } else showToast({ type: "error", message: "err" });
        } catch (err) {
          console.error(err);
        }
      } else {
        v$.value.$errors.forEach((err)=>{
          errors[err.$property].state = true
          errors[err.$property].message =  err.$message
        })
      }
    } else {
      try {
        const res = await deleteQuickAnswer(props.currentAnswer?.id);
  
        if (res.data.success) {
          showToast({ message: t("toast.success_delete_question") });
          getAnswers();
        } else showToast({ type: "error", message: "err" });
      } catch (err) {
        console.error(err);
      } finally {
        closePopup();
      }
    }
  };

  


  
  // hooks
  onBeforeMount(() => {
    if (props.type == "edit" &&  props.currentAnswer) {
console.log("props.currentAnswer" ,props.currentAnswer)
    state.questionAr = props.currentAnswer?.questionAr;
    state.questionEn = props.currentAnswer?.questionEn;
    state.answerAr = props.currentAnswer?.answerAr;
    state.answerEn = props.currentAnswer?.answerEn;
    }
  });
  </script>
  
  <style></style>
  