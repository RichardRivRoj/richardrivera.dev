"use client";

import React from "react";

interface ProjectTechnologyGroupProps {
  icon: React.ReactNode;
  title: string;
  technologies: string[];
}

export function ProjectTechnologyGroup({
  icon,
  title,
  technologies,
}: ProjectTechnologyGroupProps) {
  return (
    <div className="rounded-custom-md border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-700/60 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
        <span className="text-blue-600 dark:text-blue-400">{icon}</span>

        {title}
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400"
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
}
