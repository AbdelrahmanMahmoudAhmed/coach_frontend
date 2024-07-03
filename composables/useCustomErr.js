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
    case 9:
      showMessage(t("toast.not_auth"));
      break;
    case 10:
      showMessage(t("toast.image_not_allowed"));
      break;
    case 11:
      showMessage(t("toast.not_allowTo_delete"));
      break;
    case 12:
      showMessage(t("toast.not_allowTo_edit"));
      break;
    case 13:
      showMessage(t("toast.not_allow_manage_website"));
      break;
    case 14:
      showMessage(t("toast.not_super_admin"));
      break;
    // case 15:
    //   showMessage(t("toast.image_not_allowed"));
    //   break;
    case 16:
      showMessage(t("toast.cant_update_self"));
      break;
    case 17:
      showMessage(t("toast.not_found_person"));
      break;
    case 18:
      showMessage(t("toast.required_img"));
      break;
    case 19:
      showMessage(t("toast.not_matched_password"));
      break;
    case 20:
      showMessage(t("toast.not_allowed_email"));
      break;
    case 21:
      showMessage(t("toast.not_allowed_phone"));
      break;
    case 22:
      showMessage(t("toast.validation_err"));
      break;
    case 23:
      showMessage(t("toast.file_too_large"));
      break;

    default:
      showMessage(t("toast.something_wrong"));
      break;
  }
}
