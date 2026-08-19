"use client";

import { Code2, Database, Layers3, Server } from "lucide-react";

import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetail } from "@/types/project";
import { ProjectSectionIntro } from "./ProjectSectionIntro";
import { ProjectTechnologyGroup } from "./ProjectTechnologyGroup";

interface ProjectTechnologiesProps {
  project: ProjectDetail;
}

export function ProjectTechnologies({ project }: ProjectTechnologiesProps) {
  const { t } = useTranslation();

  const { frontend, backend, database, tools } = project.technologies;

  return (
    <section className="border-y border-slate-100 bg-white pt-20 pb-16 md:py-28 dark:border-slate-800/60 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-300 px-6">
        <ProjectSectionIntro
          icon={<Server size={20} />}
          label={t<string>("projectsSection.stack")}
          title={t<string>("projectsSection.technology")}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProjectTechnologyGroup
            icon={<Code2 size={18} />}
            title="Frontend"
            technologies={frontend}
          />

          <ProjectTechnologyGroup
            icon={<Server size={18} />}
            title="Backend"
            technologies={backend}
          />

          <ProjectTechnologyGroup
            icon={<Database size={18} />}
            title="Database"
            technologies={database}
          />

          <ProjectTechnologyGroup
            icon={<Layers3 size={18} />}
            title="Tools"
            technologies={tools}
          />
        </div>
      </div>
    </section>
  );
}
