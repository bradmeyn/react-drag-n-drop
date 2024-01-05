import Board from "../components/Home/Board";

export default function Home() {
  return (
    <div className="text-start container mx-auto">
      <div
        className="flex justify-center my-14 md:my-16 lg:md-20 opacity-0 animate-[fade-in-up_0.6s]"
        style={{ animationFillMode: "forwards" }}
      >
        <h1 className="p-3 text-6xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl  xl:text-10xl text-center">
          <div className="text-white">React Drag n Drop</div>
        </h1>
      </div>

      <Board />
    </div>
  );
}
