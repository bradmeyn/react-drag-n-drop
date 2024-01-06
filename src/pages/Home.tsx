import { CheckIcon } from "@heroicons/react/24/solid";
import Board from "../components/Home/Board";

export default function Home() {
  return (
    <div className="text-start container mx-auto">
      <div
        className="flex justify-center my-14 md:my-16 lg:md-20 "
        style={{ animationFillMode: "forwards" }}
      >
        <h1 className="p-3 flex gap-4 text-6xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl  xl:text-10xl text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-500  to-purple-500">
          <span className="animate-[fade-in-up_0.6s]">Drag</span>
          <span className="animate-[fade-in-up_0.6s_200ms]">&</span>
          <span className="animate-[fade-in-up_0.6s_400ms]">Drop</span>
        </h1>
      </div>

      <Board />
    </div>
  );
}
