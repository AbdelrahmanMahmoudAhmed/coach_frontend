
import { useToast } from 'vue-toast-notification'

const toast = useToast()

function showToast({message= "message" , type = "success" , duration = 3000}) {
  toast.open({
    message,
    type,
    duration
  })
}


export default showToast;
