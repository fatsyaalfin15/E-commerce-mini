export default function SkeletonCard() {
  return (
    <div className="flex flex-col border border-line bg-paper-raised animate-pulse">
      <div className="aspect-square p-4 sm:p-6">
        <div className="w-full h-full bg-line/70" />
      </div>
      <div className="flex-1 flex flex-col gap-2 px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="h-2.5 w-16 bg-line/70" />
        <div className="h-3.5 w-full bg-line/70" />
        <div className="h-3.5 w-2/3 bg-line/70" />
        <div className="h-2.5 w-20 bg-line/70" />
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="h-6 w-16 bg-line/70" />
          <div className="h-3 w-14 bg-line/70" />
        </div>
      </div>
    </div>
  );
}