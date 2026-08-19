"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetail } from "@/types/project";
import { ProjectContentBlock } from "./ProjectContentBlock";

interface ProjectProblemSolutionProps {
  project: ProjectDetail;
}

export function ProjectProblemSolution({
  project,
}: ProjectProblemSolutionProps) {
  const { t } = useTranslation();

  return (
    <section className="border-b border-slate-100 bg-white py-24 md:py-28 dark:border-slate-800/60 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <ProjectContentBlock
            label={t<string>("projectsSection.problem")}
            title={project.problem.title}
            description={project.problem.description}
          />

          <ProjectContentBlock
            label={t<string>("projectsSection.solution")}
            title={project.solution.title}
            description={project.solution.description}
          />
        </div>
      </div>
    </section>
  );
}
