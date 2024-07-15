export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-2xl w-full max-w-screen-sm flex flex-col gap-3">
        {["Nico", "Me", "You", "Yourself"].map((person, index) => (
          <div
            key={index}
            className="flex items-center gap-5 group hover:bg-green-300"
          >
            <div className="size-7 bg-blue-400 rounded-full" />
            <span className="text-lg group-hover:text-red-500  font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300">
              {person}
            </span>
            <div className="size-6 rounded-sexy-name bg-red-500 text-white flex items-center justify-center relative">
              <span className="z-10">{index}</span>
              <div className="size-6 bg-red-500 rounded-full absolute" />
            </div>
          </div>
        ))}
        <button className="btn">Cool</button>
      </div>
    </main>
  );
}
