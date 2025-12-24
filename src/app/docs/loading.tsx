export default function Loading() {
  return (
    <div className="animate-pulse space-y-2 py-6 px-4">
      <div className="h-8 w-1/3 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-100 rounded" />
      <div className="h-4 w-5/6 bg-gray-100 rounded" />
      <div className="h-4 w-2/3 bg-gray-100 rounded" />
      <div className="h-4 w-3/4 bg-gray-100 rounded" />
    </div>
  );
}