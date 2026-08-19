"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetail } from "@/types/project";

import { ProjectNotFound } from "./projects/ProjectNotFound";
import { ProjectHero } from "./projects/ProjectHero";
import { ProjectProblemSolution } from "./projects/ProjectProblemSolution";
import { ProjectObjectives } from "./projects/ProjectObjectives";
import { ProjectArchitecture } from "./projects/ProjectArchitecture";
import { ProjectFeatures } from "./projects/ProjectFeatures";
import { ProjectTechnologies } from "./projects/ProjectTechnologies";
import { ProjectGallery } from "./projects/ProjectGallery";
import { ProjectResults } from "./projects/ProjectResults";
import { ProjectFooter } from "./projects/ProjectFooter";

interface ProjectDetailsProps {
  projectId: string;
}

export function ProjectDetails({
  projectId,
}: ProjectDetailsProps) {
  const { t } = useTranslation();

  const project = t<ProjectDetail>(
    `projectDetails.${projectId}`,
  );

  if (
    typeof project !== "object" ||
    project === null ||
    !("overview" in project)
  ) {
    return <ProjectNotFound />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <ProjectHero project={project} />

      <ProjectProblemSolution
        project={project}
      />

      <ProjectObjectives
        project={project}
      />

      <ProjectArchitecture
        project={project}
      />

      <ProjectFeatures
        project={project}
      />

      <ProjectTechnologies
        project={project}
      />

      <ProjectGallery
        project={project}
      />

      <ProjectResults
        project={project}
      />

      <ProjectFooter
        project={project}
      />
    </main>
  );
}
