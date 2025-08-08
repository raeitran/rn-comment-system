import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultError } from "../utils/defaultError";
import axios from "axios";

const useNovelDetails = (novelId) => {
  const queryClient = useQueryClient();

  // fetch data
  const { data, isError, isLoading } = useQuery({
    queryKey: ["novelComments", novelId],
    queryFn: async () => {
      const res = await axios.get(`/novel/${novelId}`);
      return res.data;
    },
    onError: defaultError,
    enabled: !!novelId,
  });

  // add new comment novel
  const addMutation = useMutation({
    mutationFn: async (payload) => {
      await axios.post(`/novel/${novelId}/comments`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["novelComments"] });
    },
    onError: defaultError,
  });

  return {
    data,
    isError,
    isLoading,
    addComment: addMutation.mutate,
  };
};

export default useNovelDetails;
