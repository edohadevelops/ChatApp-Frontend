import { toast } from "react-toastify";

export const notifyError = (message) => {
    
    return toast.error(message += " !")
}

export const notifySuccess = (message) => {
    return toast.success(message += " !")
}