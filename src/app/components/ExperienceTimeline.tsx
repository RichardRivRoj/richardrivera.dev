"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Code2,
  Cpu,
} from "lucide-react";
import { motion } from "motion/react";

type ExperienceType =
  "developer" | "education" | "robotics" | "graduation" | "work" | "internship";

interface Experience {
  year: string;
  role: string;
  organization: string;
  description: string;
  type: ExperienceType;
}

export function ExperienceTimeline() {
  const { t } = useTranslation();

  const experiences = t<Experience[]>("experience");

  const section = t<{
    subtitle: string;
    title: string;
    description: string;
  }>("experienceSection");

  const getIcon = (type: ExperienceType) => {
    switch (type) {
      case "developer":
        return <Code2 className="text-blue-500" size={17} strokeWidth={2} />;

      case "education":
        return <Award className="text-amber-500" size={17} strokeWidth={2} />;

      case "robotics":
        return <Cpu className="text-cyan-500" size={17} strokeWidth={2} />;

      case "graduation":
        return (
          <GraduationCap
            className="text-purple-500"
            size={17}
            strokeWidth={2}
          />
        );

      case "internship":
        return (
          <Calendar className="text-slate-400" size={17} strokeWidth={2} />
        );

      case "work":
      default:
        return (
          <Briefcase className="text-emerald-500" size={17} strokeWidth={2} />
        );
    }
  };

  return (
    <section id="experience" className="bg-white py-20 lg:py-24 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-350 px-6">
        <SectionHeading
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
        />

        {/* Timeline */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Central line */}
          <div className="absolute top-0 bottom-0 left-5 w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2 dark:bg-slate-800" />

          <div className="space-y-12">
            {experiences.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={`${item.year}-${item.role}`}
                  className="relative md:grid md:grid-cols-2 md:gap-16"
                >
                  {/* Timeline node */}
                  <div className="absolute top-7 left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm md:left-1/2 dark:border-slate-900 dark:bg-slate-800">
                    {getIcon(item.type)}
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? -30 : 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-80px",
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className={`ml-12 md:ml-0 ${
                      isEven
                        ? "md:col-start-1 md:text-right"
                        : "md:col-start-2 md:text-left"
                    } `}
                  >
                    <div
                      className={`rounded-custom-md border border-slate-200/70 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800/70 dark:bg-slate-800/40 ${
                        isEven ? "md:mr-8" : "md:ml-8"
                      } `}
                    >
                      {/* Year */}
                      <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {item.year}
                      </span>

                      {/* Role */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>

                      {/* Organization */}
                      {item.organization && (
                        <span className="mt-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">
                          {item.organization}
                        </span>
                      )}

                      {/* Description */}
                      <p className="mt-3 text-sm leading-relaxed font-light text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
