export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* Box */}
      <div className="aspect-[4/5] w-full bg-foreground/5" />
      {/* Text Lines */}
      <div className="flex flex-col items-center justify-center space-y-3 mt-2">
        <div className="h-3 bg-foreground/10 w-2/3 rounded-sm" />
        <div className="h-2 bg-foreground/10 w-1/4 rounded-sm" />
      </div>
    </div>
  );
}
