import { toast, ToastOptions } from "react-toastify";

const useToaster = () => {
  const showToast = (message: string, options?: ToastOptions) => {
    toast(message, options);
  };

  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  const err = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  const info = (message: string, options?: ToastOptions) => {
    toast.info(message, options);
  };

  const warning = (message: string, options?: ToastOptions) => {
    toast.warning(message, options);
  };

  return { showToast, success, err, info, warning };
};

export default useToaster;
