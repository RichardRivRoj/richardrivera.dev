import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { render } from "react-email";

import { ContactEmail } from "@/app/components/emails/ContactEmail";
import { contactSchema } from "@/lib/validation/contact";
import { contactRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  /*
   * ======================================================
   * OBTENER IP
   * ======================================================
   */
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  /*
   * ======================================================
   * RATE LIMITING
   * ======================================================
   */
  const rateLimit = await contactRateLimit.limit(`contact:${ip}`);

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        error: "Has enviado demasiados mensajes. Intenta nuevamente más tarde.",
      },
      { status: 429 },
    );
  }

  /*
   * ======================================================
   * OBTENER BODY
   * ======================================================
   */
  const body = await request.json();

  /*
   * ======================================================
   * HONEYPOT
   * ======================================================
   */
  if (body.companyWebsite) {
    return NextResponse.json(
      { error: "Solicitud inválida website." },
      { status: 400 },
    );
  }

  /*
   * ======================================================
   * TIEMPO MÍNIMO
   * ======================================================
   */
  const formStartedAt = Number(body.formStartedAt);
  // eslint-disable-next-line react-hooks/purity
  const elapsedTime = Date.now() - formStartedAt;

  if (
    !Number.isFinite(formStartedAt) ||
    elapsedTime < 3000 ||
    elapsedTime > 24 * 60 * 60 * 1000
  ) {
    return NextResponse.json(
      { error: "Solicitud inválida tiempo." },
      { status: 400 },
    );
  }

  /*
   * ======================================================
   * VALIDACIÓN ZOD
   * ======================================================
   */
  const validation = contactSchema.safeParse(body);

  if (!validation.success) {
    const flattenedErrors = z.flattenError(validation.error);
    return NextResponse.json(
      {
        error: "Los datos enviados no son válidos.",
        fields: flattenedErrors.fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = validation.data;

  /*
   * ======================================================
   * VARIABLES DE ENTORNO
   * ======================================================
   */
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    console.error("Missing email environment variables.");
    return NextResponse.json(
      { error: "El servicio de correo no está configurado." },
      { status: 500 },
    );
  }

  /*
   * ======================================================
   * CONSTRUCCIÓN DEL JSX FUERA DEL TRY/CATCH
   * ======================================================
   */
  const emailElement = (
    <ContactEmail
      name={name}
      email={email}
      subject={subject}
      message={message}
    />
  );

  /*
   * ======================================================
   * INTENTO DE RENDER Y ENVÍO (TRY SOLO AQUÍ)
   * ======================================================
   */
  try {
    const emailHtml = await render(emailElement);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Portfolio Richard Rivera <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Nuevo contacto: ${subject}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "No fue posible enviar el correo." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Ocurrió un error inesperado." },
      { status: 500 },
    );
  }
}
