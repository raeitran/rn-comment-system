import { useForm } from "@tanstack/react-form";
import useNovelDetails from "../hooks/useNovelDetails";
import useChapter from "../hooks/useChapter";

export const CommentForm = ({ novelId, chapterId, parentId, onSuccess }) => {
  const { addComment } = chapterId
    ? useChapter(novelId, chapterId)
    : useNovelDetails(novelId);

  const form = useForm({
    defaultValues: {
      username: "",
      content: "",
    },
    onSubmit: async ({ value }) => {
      if (chapterId) {
        await addComment({
          novelId,
          chapterId,
          payload: { ...value, parentId },
        });
      } else {
        await addComment({ ...value, parentId });
      }
      form.reset();
      onSuccess?.();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
    >
      <form.Field name="content">
        {(field) => (
          <div>
            <textarea
              className="border p-2 w-full"
              rows="3"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Write a comment..."
            />
          </div>
        )}
      </form.Field>
      <form.Field name="username">
        {(field) => (
          <div className="flex flex-col mb-5 ">
            <label htmlFor="username">Username</label>
            <input
              className="w-[15rem] rounded-sm border"
              type="text"
              id="username"
              name="username"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>
      <button
        type="submit"
        disabled={form.state.isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded-sm"
      >
        Submit
      </button>
    </form>
  );
};
