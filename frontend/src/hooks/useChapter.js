import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultError } from "../utils/defaultError";
import axios from "axios";

const useChapter = (novelId, chapterId) => {
  const queryClient = useQueryClient();

  // fetch data
  const { data, isError, isLoading } = useQuery({
    queryKey: ["chapter", novelId, chapterId],
    queryFn: async () => {
      const res = await axios.get(`/novel/${novelId}/chapter/${chapterId}`);
      return res.data;
    },
    enabled: !!novelId && !!chapterId,
    onError: defaultError,
  });

  // add new comment
  const addMutation = useMutation({
    mutationFn: async ({ novelId, chapterId, payload }) => {
      await axios.post(
        `/novel/${novelId}/chapter/${chapterId}/comments`,
        payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapter"] });
    },
    onError: defaultError,
  });

  return {
    data,
    isError,
    isLoading,
    addComment: addMutation.mutate,
    // updateComment: updateMutation.mutate,
    // deleteComment: deleteMutation.mutate,
  };
};

export default useChapter;
