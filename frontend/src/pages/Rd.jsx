const RedditnovelCardPage = () => {
  const Novel = {
    title: "How to Survive as the Academy’s Villain",
    image: "https://www.japanpowered.com/media/images/frieren.jpg",
    chapters: [
      { id: 4, label: "Chapter 4", date: "2024-06-18" },
      { id: 3, label: "Chapter 3", date: "2024-06-13" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-start p-10">
      <div className=" bg-white-900 max-w-xs rounded-lg overflow-hidden shadow-lg">
        <img
          src={Novel.image}
          alt={Novel.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4 1">
          <h2 className="text-lg font-bold mb-2">{Novel.title}</h2>
          <ul className="space-y-1">
            {Novel.chapters.map((chapter) => (
              <li
                key={chapter.id}
                className="flex items-center justify-between text-sm bg-gray-800 px-2 py-1 rounded"
              >
                <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">
                  {chapter.label}
                </span>
                <span className="text-gray-400">{chapter.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RedditnovelCardPage;
