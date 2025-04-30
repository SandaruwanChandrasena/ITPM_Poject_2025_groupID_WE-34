import { FC } from "react";
import HeroSection from "../components/HeroSection";
import BookByGenre from "../components/BookByGenre";

interface Props {}

const Home: FC<Props> = () => {
  return (
    <div className="px-5 space-y-10 lg:p-0 ">
      <HeroSection />
      <BookByGenre genre="Fiction" />
      <BookByGenre genre="Young Adult" />
      <BookByGenre genre="Science Fiction" />
      <BookByGenre genre="Mystery" />
    </div>
  );
};

export default Home;
