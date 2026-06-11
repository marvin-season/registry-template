export default function Loading() {
  return (
    <div className="animate-fade-in-soft space-y-3 py-6 px-4">
      <div className="h-8 w-1/3 rounded-md bg-muted animate-pulse" />
      <div className="h-4 w-full rounded-md bg-muted/70 animate-pulse" />
      <div className="h-4 w-5/6 rounded-md bg-muted/70 animate-pulse" />
      <div className="h-4 w-2/3 rounded-md bg-muted/70 animate-pulse" />
      <div className="h-4 w-3/4 rounded-md bg-muted/70 animate-pulse" />
    </div>
  );
}
