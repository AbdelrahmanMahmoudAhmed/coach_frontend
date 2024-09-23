<template>
  <div class="pb-10">
    <div v-if="popup">
<ManageAnswers :currentAnswer="currentAnswer" :type="type" @closePopup="closePopup" @getAnswers="getAnswers" />
    </div>
    <Title title="quick_answer" />


    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-answers"
        :withSearch=" false"
        :withAdd="global.user.websiteManagement"
        :addButtonTitle="t(`admin.actions.add_question`)"
        @openPopup="openPopup"
      >
        <template v-if=" global.user.websiteManagement" #actions="{rowData}">
          
          <button
          v-if="global.user.websiteManagement"
            @click="() => openPopup('edit', rowData?.currentItem)"
            class="panel-table-action"
          >
            {{ t(`table.headers.edit`) }}
          </button>

          <button
          v-if="global.user.websiteManagement"
            @click="() => openPopup('delete', rowData?.currentItem)"
            class="panel-table-delete"
          >
            {{ $t(`table.headers.delete`) }}
          </button>
        </template>
        <template  #seeMore="{rowData}">
          

          <SeeMore class-name="text-center" :text="rowData.currentItem" />


        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "panel",
  middleware: "admin-guard",
});

import DataTable from "~/components/panel/DataTable.vue";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";
import ManageAnswers from "~/components/panel/popups/ManageAnswers";
import SeeMore from "~/components/generic/SeeMore.vue";
import Title from "~/components/panel/Title.vue"


const pagination = reactive({
  perPage: "",
  totalCount: "",
});
const type = ref("");
const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const currentAnswer = ref("");
const popup = ref(false);
const { getAllQuickAnswers } = useRequest();
const headers = ref(["question_ar", "question_en","answer_ar", "answer_en"]);
(global.user.websiteManagement  ) && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
const totalRecords = ref(100);

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (operationType, answer) => {
  currentAnswer.value = answer;
  type.value = operationType;
  popup.value = true;
};




const getAnswers = async () => {
  dataFetched.value = false;

  try {
    const res = await getAllQuickAnswers();
    totalRecords.value = res.data?.data?.count;




    const allAnswers = res.data?.data;
    const handeldAnswers = allAnswers.map((item) => {
      return [

        {
          id: item?.id,
          item: null,
          isSlot: true,
          slotName:"seeMore",
          currentItem:item?.questionAr,
        },
 
        {
          id: item?.id,
          item: null,
          isSlot: true,
          slotName:"seeMore",
          currentItem:item?.questionEn,
        },
        {
          id: item?.id,
          item: null,
          isSlot: true,
          slotName:"seeMore",
          currentItem:item?.answerAr,
        },
        {
          id: item?.id,
          item: null,
          isSlot: true,
          slotName:"seeMore",
          currentItem:item?.answerEn,
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          hideTd:global.user?.role == 'admin',
          currentItem: {
            id: item?.id,
            questionAr: item?.questionAr,
            questionEn: item?.questionEn,
            answerAr: item?.answerAr,
            answerEn: item?.answerEn,
          }
        },
      ];
    });
    rows.value = handeldAnswers;
  } catch (err) {
    console.error(err);
  } finally {
    dataFetched.value = true;
  }
};

// hooks
onBeforeMount(() => {
  getAnswers();
});



</script>

<style></style>
