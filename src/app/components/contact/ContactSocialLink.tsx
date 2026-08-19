"use client";

import React from "react";

interface ContactSocialLinkProps {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  external?: boolean;
}

export function ContactSocialLink({
  href,
  label,
  value,
  icon,
  external = true,
}: ContactSocialLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="rounded-custom-sm flex items-center gap-3.5 border border-slate-100 p-3 transition-colors hover:bg-slate-50 dark:border-slate-700/40 dark:hover:bg-slate-700/55"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
        {icon}
      </div>

      <div className="flex min-w-0 flex-col">
        <span className="font-display text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          {label}
        </span>

        <span className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
          {value}
        </span>
      </div>
    </a>
  );
}
