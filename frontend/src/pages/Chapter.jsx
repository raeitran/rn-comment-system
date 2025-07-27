import { useParams } from "react-router-dom";

import useChapter from "../hooks/useChapter";
import { CommentForm } from "../components/CommentForm";
import CommentThread from "../components/CommentThread";
const Chapter = () => {
  const { novelId, chapterId } = useParams();
  const { data, isLoading, isError, error } = useChapter(novelId, chapterId);

  if (isLoading) return <div className="p-4">Loading chapter...</div>;
  if (isError)
    return <div className="p-4 text-red-600">Error: {error.message}</div>;

  return (
    <div className="w-screen h-screen pt-20 px-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
      <div className="mb-10 whitespace-pre-wrap">{data.content}</div>

      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <CommentForm novelId={novelId} chapterId={chapterId} />
      <CommentThread comments={data.comments} />
    </div>
  );
};

export default Chapter;
