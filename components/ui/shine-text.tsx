"use client";

interface ShineTextProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  variant?: "ember" | "cream";
}

export default function ShineText({
  children,
  className = "",
  duration = 3.8,
  variant = "cream",
}: ShineTextProps) {
  const gradients = {
    cream:
      "linear-gradient(100deg, #F2E5D7 0%, #F2E5D7 28%, rgba(255,255,255,0.06) 39%, #FFFFFF 46%, rgba(255,255,255,0.06) 53%, #F2E5D7 64%, #F2E5D7 100%)",
    ember:
      "linear-gradient(100deg, #FF6B35 0%, #FF6B35 25%, rgba(255,200,160,0.18) 36%, #FFCBA0 43%, rgba(255,200,160,0.18) 50%, #FF6B35 61%, #FF6B35 100%)",
  };

  return (
    <span
      className={className}
      style={{
        background: gradients[variant],
        backgroundSize: "300% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline-block",
        animation: `shineSlide ${duration}s linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
