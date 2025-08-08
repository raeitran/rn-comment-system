import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { defaultError } from "../utils/defaultError";

export const useNovel = () => {
  return useQuery({
    queryKey: ["novels"],
    queryFn: async () => {
      const res = await axios.get(`/novel`);
      return res.data;
    },
    onError: defaultError,
  });
};
