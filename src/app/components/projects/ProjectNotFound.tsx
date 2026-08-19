"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function ProjectNotFound() {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-6 py-32 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="font-display mb-4 text-3xl font-bold text-slate-900 dark:text-white">
          {t<string>("projectsSection.notFound")}
        </h1>

        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft size={16} />
          {t<string>("general.back")}
        </Link>
      </div>
    </section>
  );
}
