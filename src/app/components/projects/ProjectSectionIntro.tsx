"use client";

import React from "react";

interface ProjectSectionIntroProps {
  icon: React.ReactNode;
  label: string;
  title: string;
}

export function ProjectSectionIntro({
  icon,
  label,
  title,
}: ProjectSectionIntroProps) {
  return (
    <div className="text-center">
      <div className="mx-auto flex w-fit items-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
        {icon}
        {label}
      </div>

      <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
        {title}
      </h2>
    </div>
  );
}
