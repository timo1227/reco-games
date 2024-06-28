export default function Loading() {
  // Loading Spinner Annimation
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-4 border-black dark:border-white"></div>
    </div>
  );
}
