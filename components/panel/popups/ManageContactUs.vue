<template>
  <div @click.self="closePopup" class="popup-holder popup">
    <form @submit.prevent="manageContactUs" class="panel-form">
      <div
        @click="closePopup"
        :class="`${
          locale == 'ar' ? 'left-4' : 'right-4'
        } absolute top-4 cursor-pointer`"
      >
        <img
          class="w-[40px] cursor-pointer"
          :src="
            isDark == 'light' ? '/imgs/close_dark.svg' : '/imgs/close_light.svg'
          "
          alt=""
        />
      </div>
      <h3
        class="text-center text-[20px] mb-[21px] sm:text-[22px] md:text-[28px] font-bold"
      >
        {{ $t(`admin.actions.delete_message`) }}
      </h3>

      <div>
        <div class="text-center font-[900]">
          {{
            $t(`admin.actions.delete_message_msg`, {
              name: currentMessage?.name
            })
          }}
        </div>
      </div>

      <div class="popup-actions-holder">
        <button @click="closePopup" type="button" class="panel-cancel-btn">
          {{ $t(`admin.actions.cancel`) }}
        </button>
        <button
          type="submit"
          class="bg-red-800 hover:bg-red-600 rounded-[21px] h-[40px] px-[23px] w-full sm:w-fit"
        >
          {{ $t(`admin.actions.delete`) }}
        </button>
      </div>
    </form>
  </div>
</template>
  
  <script setup>
const emit = defineEmits(["closePopup", "getMessagesData"]);
const props = defineProps({
  currentMessage: Object,
});
const isDark = useCookie("isDark");

import useRequest from "~/composables/useRequest";
import showToast from "~/composables/useToast";

const { deleteMessage } = useRequest();
const { locale, t } = useI18n();

const closePopup = () => {
  emit("closePopup");
};

const getMessagesData = () => {
  emit("getMessagesData");
};

const manageContactUs = async () => {
  try {
    const res = await deleteMessage(props.currentMessage?.id);

    if (res.data.success) {
      showToast({ message: t("toast.success_delete_message") });
      getMessagesData();
    } else showToast({ type: "error", message: "err" });
  } catch (err) {
    console.error(err);
  } finally {
    closePopup();
  }
};
</script>
  
  <style></style>
  