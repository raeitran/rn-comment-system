import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import useNovelDetails from "../hooks/useNovelDetails";
import CommentThread from "../components/CommentThread";
import { CommentForm } from "../components/CommentForm";

const Novel = () => {
  const { novelId } = useParams();
  const { data, isLoading, error } = useNovelDetails(novelId);

  if (isLoading) return <div className="p-4">Loading...</div>;

  if (error) return <div className="p-4 text-red-500">Error loading novel</div>;

  return (
    <div className="w-screen h-screen 1 pt-20 px-10">
      <div className="flex ">
        <img
          src={
            data.coverImg
              ? null
              : "https://www.japanpowered.com/media/images/frieren.jpg"
          }
          alt="coverImage"
          className="w-[25rem] h-[28rem] object-cover rounded-sm"
        />
        <section className="flex flex-col ml-10 gap-3">
          <h1 className="text-2xl font-bold mb-4">title: {data.title}</h1>
          <p className="text-gray-600 mb-6"> description: {data.description}</p>
        </section>
      </div>

      {/* can be a component idk */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Chapters</h2>
        <ul className="space-y-2 mb-8">
          {(data.chapters || []).map((ch) => (
            <li
              key={ch._id}
              className="border px-3 py-2 rounded shadow-sm bg-white flex justify-between"
            >
              <Link
                to={`/novels/${novelId}/chapter/${ch._id}`}
                className="text-black mt-4"
              >
                <span>Chapter {ch.order}</span>
              </Link>

              <span className="text-sm text-gray-500">
                {new Date(ch.createdAt).toISOString().split("T")[0]}
              </span>
            </li>
          ))}
        </ul>
        <CommentForm novelId={novelId} />
      </div>

      <CommentThread comments={data.comments} />
    </div>
  );
};

export default Novel;
