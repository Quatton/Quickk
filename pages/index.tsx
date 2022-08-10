import type { NextPage } from "next";
import Game from "../components/Game";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-900 h-screen grid place-items-center">
      <Game />
    </div>
  );
};

export default Home;
