export default async function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex gap-5">
          <div className="flex flex-col gap-2">
            <div className="size-20 rounded-md bg-neutral-700 h-5 w-20" />
            <div className="size-20 rounded-md bg-neutral-700 h-5 w-40" />
            <div className="flex gap-2">
              <div className="size-20 rounded-md bg-neutral-700 h-5 w-10" />
              <div className="size-20 rounded-md bg-neutral-700 h-5 w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
