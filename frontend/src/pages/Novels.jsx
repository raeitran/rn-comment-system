import { useNovel } from "../hooks/useNovels";
import NovelList from "../components/NovelList";

const Novels = () => {
  const { data: novels, isLoading, isError } = useNovel();

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Failed to load novels.</div>;
  return (
    <div className="w-screen h-screen 1">
      <NovelList novels={novels || []} />
    </div>
  );
};

export default Novels;
