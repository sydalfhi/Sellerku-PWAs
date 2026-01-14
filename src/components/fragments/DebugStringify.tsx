type DebugStringifyProps = {
  data: any;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
};

const sizeMap = {
  sm: "w-64 h-32",
  md: "w-96 h-48",
  lg: "w-[40rem] h-64",
  xl: "w-[60rem] h-80",
  full: "w-full h-full",
} as const;

export default function DebugStringify({
  data,
  size = "md",
  className = "",
}: DebugStringifyProps) {
  const appliedSize = sizeMap[size as keyof typeof sizeMap];

  return (
    <div
      className={`bg-gray-100 border border-gray-300 rounded p-4 overflow-auto font-mono text-sm ${appliedSize} ${className}`}
    >
      <pre>{JSON.stringify(data ?? "null", null, 2)}</pre>
    </div>
  );
}
