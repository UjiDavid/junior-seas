const HeroCarouselSkeleton = () => (
  <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
    <svg
      className="animate-spin h-10 w-10 text-gray-400 mb-6 flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
            <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <div className="absolute bottom-4 left-4 bg-gray-300 h-16 w-2/3 rounded"></div>
  </div>
);

export default HeroCarouselSkeleton;