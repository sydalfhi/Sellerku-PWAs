type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: string;
};

export default function LoadingSpinner({
  size = "md",
  color = "#d7d0fe",
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`animate-spin rounded-full border-solid border-t-transparent ${sizeMap[size]}`}
        style={{ borderColor: color }}
      />
    </div>
  );
}
