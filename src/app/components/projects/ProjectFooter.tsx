"use client";

import Link from "next/link";
import { ArrowLeft, FolderGit2 } from "lucide-react";

import { ProjectDetail } from "@/types/project";
import { useTranslation } from "@/hooks/useTranslation";

interface ProjectFooterProps {
  project: ProjectDetail;
}

export function ProjectFooter({ project }: ProjectFooterProps) {
  const { t } = useTranslation();

  const { links } = project;

  return (
    <section className="border-t border-slate-200 bg-white py-2 pt-14 pb-2 md:py-2 md:pb-2 md:pt-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-300 flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        >
          <ArrowLeft size={16} />
          {t<string>("general.back")}
        </Link>

        <div className="flex gap-3">
          {links.github && links.github !== "#" && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-custom-sm inline-flex items-center gap-2 border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <FolderGit2 size={16} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
