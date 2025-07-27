import { toast } from "react-hot-toast";

export const defaultError = (error) => {
  toast.error(error?.response?.data?.message || "Something went wrong");
};
