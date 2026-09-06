import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({
  name,
  color = "bg-primary",
  className,
  size = "md",
}: {
  name: string;
  color?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  }[size];

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white",
        color,
        sizeClasses,
        className
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
