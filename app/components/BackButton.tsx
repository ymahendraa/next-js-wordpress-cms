"use client";

interface BackButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function BackButton({ className, children }: BackButtonProps) {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button onClick={handleGoBack} className={className}>
      {children}
    </button>
  );
}
