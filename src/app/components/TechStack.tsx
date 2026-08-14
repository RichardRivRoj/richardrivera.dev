"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "motion/react";

interface TechStackItem {
  name: string;
  icon: string;
}

interface TechStackGroup {
  category: string;
  items: TechStackItem[];
}

interface SpaceTechItem extends TechStackItem {
  index: number;
}

/**
 * Mapeo entre el identificador utilizado
 * en las traducciones y el SVG real.
 *
 * Ubicación:
 * /public/icons/devicon/
 */
const DEVICON_MAP: Record<string, string> = {
  // Frontend
  ReactIcon: "react",
  NextIcon: "nextjs",
  TypeScriptIcon: "typescript",
  JavaScriptIcon: "javascript",
  TailwindIcon: "tailwindcss",

  // Backend
  PythonIcon: "python",
  NodeJsIcon: "nodejs",
  PHPIcon: "php",
  DjangoIcon: "django",
  FastAPIIcon: "fastapi",
  LaravelIcon: "laravel",

  // Database
  MysqlIcon: "mysql",
  PostgreSqlIcon: "postgresql",
  MariaDBIcon: "mariadb",
  SqlIcon: "azuresqldatabase",

  // DevOps
  DockerIcon: "docker",
  GitIcon: "git",
  GitHubIcon: "github",
  LinuxIcon: "kalilinux",
  PostmanIcon: "postman",
  JenkinsIcon: "jenkins",

  // Robotics & IoT
  CIcon: "c",
  CppIcon: "cplusplus",
  ArduinoIcon: "arduino",
  ESP32Icon: "esp32",
  Fusion360Icon: "fusion",

  // Tools
  FigmaIcon: "figma",
  CanvaIcon: "canva",
};

/**
 * Variaciones de profundidad.
 *
 * No utilizamos tarjetas ni backgrounds.
 * La profundidad se consigue únicamente
 * mediante tamaño, opacidad y blur.
 */
const DEPTH_CLASSES = [
  {
    size: "h-16 w-16 md:h-20 md:w-20",
    opacity: "opacity-100",
    blur: "",
  },
  {
    size: "h-11 w-11 md:h-14 md:w-14",
    opacity: "opacity-55",
    blur: "blur-[0.5px]",
  },
  {
    size: "h-14 w-14 md:h-16 md:w-16",
    opacity: "opacity-80",
    blur: "",
  },
  {
    size: "h-16 w-16 md:h-20 md:w-20",
    opacity: "opacity-100",
    blur: "",
  },
  {
    size: "h-12 w-12 md:h-14 md:w-14",
    opacity: "opacity-60",
    blur: "blur-[0.4px]",
  },
  {
    size: "h-14 w-14 md:h-16 md:w-16",
    opacity: "opacity-85",
    blur: "",
  },
];

export function TechStack() {
  const { t } = useTranslation();

  const techStack = t<TechStackGroup[]>("techStack");

  const section = t<{
    subtitle: string;
    title: string;
    description: string;
  }>("techStackSection");

  /**
   * Convertimos todas las categorías
   * en una sola colección.
   */
  const technologies = useMemo<SpaceTechItem[]>(() => {
    return techStack
      .flatMap((group) => group.items)
      .map((tech, index) => ({
        ...tech,
        index,
      }));
  }, [techStack]);

  /**
   * Dividimos las tecnologías en dos líneas.
   */
  const firstRow = technologies.filter((_, index) => index % 2 === 0);

  const secondRow = technologies.filter((_, index) => index % 2 !== 0);

  /**
   * Evitamos problemas si solamente existe
   * una tecnología.
   */
  const safeFirstRow = firstRow.length > 0 ? firstRow : technologies;

  const safeSecondRow = secondRow.length > 0 ? secondRow : technologies;

  /**
   * Renderiza una fila duplicada.
   *
   * La segunda mitad es idéntica a la primera,
   * permitiendo el loop infinito.
   */
  const renderMarqueeItems = (items: SpaceTechItem[], offset: number) => {
    const duplicatedItems = [...items, ...items];

    return duplicatedItems.map((tech, index) => {
      const originalIndex = index % items.length;

      const depth =
        DEPTH_CLASSES[(originalIndex + offset) % DEPTH_CLASSES.length];

      const deviconName = DEVICON_MAP[tech.icon];

      const iconPath = deviconName ? `/icons/devicon/${deviconName}.svg` : null;

      return (
        <motion.div
          key={`${tech.name}-${index}-${offset}`}
          whileHover={{
            y: -6,
            scale: 1.08,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20,
          }}
          className="group flex shrink-0 flex-col items-center justify-center px-5 md:px-8"
        >
          {/* Icon */}
          <div
            className={`relative flex ${depth.size} ${depth.opacity} ${depth.blur} items-center justify-center transition-all duration-300`}
          >
            {/* Subtle hover halo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-1/4 rounded-full bg-blue-400/0 blur-2xl transition-all duration-500 group-hover:bg-blue-400/20 dark:group-hover:bg-blue-500/25"
            />

            {iconPath ? (
              <Image
                src={iconPath}
                alt={tech.name}
                width={80}
                height={80}
                draggable={false}
                className="relative z-10 h-full w-full object-contain drop-shadow-none transition-all duration-300 select-none group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.35)] dark:group-hover:drop-shadow-[0_0_18px_rgba(96,165,250,0.45)]"
              />
            ) : (
              <span className="text-sm font-bold text-slate-400 dark:text-slate-600">
                ?
              </span>
            )}
          </div>

          {/* Technology name */}
          <span className="mt-3 text-[10px] font-semibold tracking-wide whitespace-nowrap text-slate-500 transition-colors duration-300 group-hover:text-blue-600 md:text-xs dark:text-slate-500 dark:group-hover:text-blue-400">
            {tech.name}
          </span>
        </motion.div>
      );
    });
  };

  return (
    <>
      <section
        id="techstack"
        className="relative isolate flex w-full flex-col overflow-hidden border-y border-slate-200/70 bg-slate-50 dark:border-slate-800/70 dark:bg-slate-950"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-12 md:pt-16">
          <SectionHeading
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            className="mb-14 md:mb-16"
          />
        </div>

        {/* ================================================= */}
        {/* ATMOSPHERE                                         */}
        {/* ================================================= */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
        >
          {/* Light mode */}
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/[0.04] blur-[130px] dark:hidden" />

          {/* Dark mode central nebula */}
          <div className="absolute top-1/2 left-1/2 hidden h-[650px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.08] blur-[150px] dark:block" />

          {/* Purple atmosphere */}
          <div className="absolute top-[-20%] right-[-15%] hidden h-[500px] w-[600px] rounded-full bg-purple-600/[0.07] blur-[150px] dark:block" />
        </div>

        {/* ================================================= */}
        {/* STARS — DARK MODE ONLY                            */}
        {/* ================================================= */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        >
          {Array.from({ length: 55 }).map((_, index) => (
            <span
              key={index}
              className="absolute animate-pulse rounded-full bg-white opacity-30"
              style={{
                left: `${(index * 37) % 100}%`,
                top: `${(index * 61) % 100}%`,
                width: `${1 + (index % 3)}px`,
                height: `${1 + (index % 3)}px`,
                animationDelay: `${-(index % 7)}s`,
                animationDuration: `${3 + (index % 5)}s`,
              }}
            />
          ))}
        </div>

        {/* ================================================= */}
        {/* TECHNOLOGY UNIVERSE                              */}
        {/* ================================================= */}

        <div className="relative mt-0 w-full overflow-hidden py-8 md:py-12">
          {/* Central atmospheric glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[250px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[100px] dark:bg-blue-500/[0.08]"
          />

          {/* Left fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-20 h-full w-16 bg-gradient-to-r from-slate-50 to-transparent md:w-40 dark:from-slate-950"
          />

          {/* Right fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 z-20 h-full w-16 bg-gradient-to-l from-slate-50 to-transparent md:w-40 dark:from-slate-950"
          />

          {/* ================================================= */}
          {/* ROW 1 — LEFT                                    */}
          {/* ================================================= */}

          <div className="animate-tech-marquee-left relative z-10 flex w-max will-change-transform hover:[animation-play-state:paused]">
            {renderMarqueeItems(safeFirstRow, 0)}
          </div>

          {/* ================================================= */}
          {/* ROW 2 — RIGHT                                   */}
          {/* ================================================= */}

          <div className="animate-tech-marquee-right relative z-10 mt-12 flex w-max will-change-transform hover:[animation-play-state:paused]">
            {renderMarqueeItems(safeSecondRow, 3)}
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM SPACING                                    */}
        {/* ================================================= */}

        <div className="h-16 md:h-20" />
      </section>
    </>
  );
}
