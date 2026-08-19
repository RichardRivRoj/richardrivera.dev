"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface ContactFormProps {
  translations: {
    label: string;
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

const fieldVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
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
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex min-h-105 flex-col items-center justify-center text-center"
      >
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
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400"
        >
          <CheckCircle2 size={28} />
        </motion.div>

        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          {translations.success.title}
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-7 font-light text-slate-500 dark:text-slate-400">
          {translations.success.description}
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-xs font-bold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400"
        >
          {translations.success.another}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        staggerChildren: 0.08,
      }}
      className="space-y-7"
    >
      {/* Heading */}
      <motion.div variants={fieldVariants} className="mb-8">
        <span className="font-display text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase dark:text-blue-500">
          {translations.label}
        </span>

        <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {translations.title}
        </h3>
      </motion.div>

      {/* Name + Email */}
      <motion.div
        variants={fieldVariants}
        className="grid grid-cols-1 gap-7 sm:grid-cols-2"
      >
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
      </motion.div>

      {/* Subject */}
      <motion.div variants={fieldVariants}>
        <FormField
          id="subject"
          name="subject"
          type="text"
          label={translations.subject.label}
          placeholder={translations.subject.placeholder}
          value={formState.subject}
          onChange={handleChange}
        />
      </motion.div>

      {/* Message */}
      <motion.div variants={fieldVariants} className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-display text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase dark:text-slate-500"
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
          className="w-full resize-none border-b border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-800 transition-colors outline-none placeholder:text-slate-300 focus:border-blue-500 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-600"
        />
      </motion.div>

      {/* Submit */}
      <motion.div variants={fieldVariants} className="pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group rounded-custom-sm bg-primary hover:bg-primary-hover inline-flex w-full items-center justify-center gap-3 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-47.5"
        >
          {status === "sending" ? (
            translations.sending
          ) : (
            <>
              {translations.submit}

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </motion.div>
    </motion.form>
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
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-display text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase dark:text-slate-500"
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
        className="w-full border-b border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-800 transition-colors outline-none placeholder:text-slate-300 focus:border-blue-500 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-600"
      />
    </div>
  );
}
