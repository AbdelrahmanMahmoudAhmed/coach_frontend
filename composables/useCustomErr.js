import showToast from "~/composables/useToast";

const showMessage = (message) => {
  showToast({ type: "error", message });
};

export default function useCustomErr(customCode, t) {
  switch (customCode) {
    case 1:
      showMessage(t("toast.wrong_email"));
      break;
    case 2:
      showMessage(t("toast.wrong_password"));
      break;
    case 3:
      showMessage(t("toast.wrong_type"));
      break;
    case 4:
      showMessage(t("toast.invalid_send_email"));
      break;
    case 5:
      showMessage(t("toast.not_available_phone"));
      break;
    case 6:
      showMessage(t("toast.not_subscribed"));
      break;
    case 7:
      showMessage(t("toast.expired_token"));
      break;
    case 8:
      showMessage(t("toast.wrong_token"));
      break;

    default:
      showMessage(t("toast.something_wrong"));
      break;
  }
}
