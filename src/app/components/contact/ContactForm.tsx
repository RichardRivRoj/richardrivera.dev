"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { motion } from "motion/react";

interface ContactFormProps {
  translations: {
    title: string;

    name: {
      label: string;
      placeholder: string;
    };

    email: {
      label: string;
      placeholder: string;
    };

    subject: {
      label: string;
      placeholder: string;
    };

    message: {
      label: string;
      placeholder: string;
    };

    submit: string;
    sending: string;

    success: {
      title: string;
      description: string;
      another: string;
    };
  };
}

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm({ translations }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormState((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("sending");

    /*
     * Actualmente simulamos el envío.
     *
     * Posteriormente puedes reemplazar este bloque por:
     *
     * await fetch("/api/contact", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify(formState),
     * });
     */

    setTimeout(() => {
      setStatus("success");
      setFormState(initialFormState);
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.35,
          }}
          className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-500 shadow-sm dark:border-emerald-900/30 dark:bg-emerald-950/30 dark:text-emerald-400"
        >
          <CheckCircle2 size={32} />
        </motion.div>

        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          {translations.success.title}
        </h3>

        <p className="max-w-sm text-sm leading-relaxed font-light text-slate-500 dark:text-slate-400">
          {translations.success.description}
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 rounded bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          {translations.success.another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="font-display mb-4 text-xl font-bold text-slate-900 dark:text-white">
        {translations.title}
      </h3>

      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          id="name"
          name="name"
          type="text"
          label={translations.name.label}
          placeholder={translations.name.placeholder}
          value={formState.name}
          onChange={handleChange}
        />

        <FormField
          id="email"
          name="email"
          type="email"
          label={translations.email.label}
          placeholder={translations.email.placeholder}
          value={formState.email}
          onChange={handleChange}
        />
      </div>

      {/* Subject */}
      <FormField
        id="subject"
        name="subject"
        type="text"
        label={translations.subject.label}
        placeholder={translations.subject.placeholder}
        value={formState.subject}
        onChange={handleChange}
      />

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="font-display text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
        >
          {translations.message.label}
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formState.message}
          onChange={handleChange}
          placeholder={translations.message.placeholder}
          className="w-full resize-none rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 transition-colors outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-custom-sm bg-primary hover:bg-primary-hover flex w-full items-center justify-center gap-2 py-4 font-semibold text-white shadow transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? (
          translations.sending
        ) : (
          <>
            {translations.submit}
            <Send size={14} />
          </>
        )}
      </button>
    </form>
  );
}

/* ========================================================= */
/* FORM FIELD                                                */
/* ========================================================= */

interface FormFieldProps {
  id: string;
  name: string;
  type: "text" | "email";
  label: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

function FormField({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-display text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={name}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 transition-colors outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
      />
    </div>
  );
}
