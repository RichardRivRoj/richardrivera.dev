import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  description?: string;
  alignment?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  description,
  alignment = "center",
}: SectionHeadingProps) {
  const isCenter = alignment === "center";
  return (
    <div
      className={`mb-16 flex flex-col ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } max-w-3xl ${isCenter ? "mx-auto" : ""}`}
    >
      <span className="text-xs font-bold tracking-widest uppercase text-primary dark:text-blue-400">
        {subtitle}
      </span>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-sans font-light">
          {description}
        </p>
      )}
    </div>
  );
}
