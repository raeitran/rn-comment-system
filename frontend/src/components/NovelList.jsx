import { Link } from "react-router-dom";

/*
  <Link to="/" className="flex items-center text-black mt-4">
                <img src={dashboard} alt="dashboard" className="nav-button" />
                <p className="text-xl font-light">Dashboard</p>
  </Link>
*/
const NovelList = ({ novels = [] }) => (
  <div className="flex flex-wrap justify-evenly rounded-lg ">
    {novels.map((novel) => (
      <div key={novel._id} className="1 h-[19rem] w-64">
        <img
          src={
            novel.coverImg
              ? null
              : "https://www.japanpowered.com/media/images/frieren.jpg"
          }
          alt="coverImage"
          className="w-full h-48 object-cover rounded-sm"
        />
        <div className="p-1">
          <Link to={`/novels/${novel._id}`} className="text-black mt-4">
            <h2 className="text-lg font-bold">{novel.title}</h2>
          </Link>

          <ul className="">
            {(novel.chapters || []).map((chapter) => (
              <li
                key={chapter._id}
                className="flex items-center justify-between text-sm bg-slate-100 px-2 py-1 rounded"
              >
                <span className="bg-white text-black px-2 py-0.5 rounded text-xs ">
                  {`Chapter ${chapter.order}`}
                </span>
                <span>
                  {new Date(chapter.createdAt).toISOString().split("T")[0]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

export default NovelList;
