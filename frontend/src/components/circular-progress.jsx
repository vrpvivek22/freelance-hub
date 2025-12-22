const CircularProgress = ({ value }) => {
  const safeValue = Number(value) || 0;
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="w-11 h-11 relative">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="lightgray"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth="5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 stroke-indigo-500"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
        {safeValue}%
      </div>
    </div>
  );
};

export default CircularProgress;
