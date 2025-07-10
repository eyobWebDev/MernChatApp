

export default function UserLoadingSkeleton() {
  return (
    <div className="p-1 mt-3 ml-3 mx-auto">
      <div className="flex items-center space-x-4">
        <div className="skeleton w-16 h-16 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-4 w-1/2"></div>
        </div>
      </div>
    </div>
  );
}