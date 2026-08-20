import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Nuevo mensaje de {name} desde tu portafolio.
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* ================================================= */}
          {/* HEADER                                            */}
          {/* ================================================= */}

          <Section style={styles.header}>
            <Text style={styles.logo}>RR</Text>

            <Text style={styles.headerLabel}>
              PORTFOLIO · CONTACT
            </Text>
          </Section>

          {/* ================================================= */}
          {/* INTRO                                             */}
          {/* ================================================= */}

          <Section style={styles.content}>
            <Text style={styles.eyebrow}>
              NUEVO MENSAJE
            </Text>

            <Heading style={styles.heading}>
              Alguien quiere ponerse en contacto contigo.
            </Heading>

            <Text style={styles.description}>
              Has recibido un nuevo mensaje a través del formulario
              de contacto de tu portafolio profesional.
            </Text>
          </Section>

          <Hr style={styles.divider} />

          {/* ================================================= */}
          {/* CONTACT INFORMATION                               */}
          {/* ================================================= */}

          <Section style={styles.content}>
            <Text style={styles.sectionLabel}>
              INFORMACIÓN DEL CONTACTO
            </Text>

            <Section style={styles.infoBlock}>
              <Text style={styles.label}>
                NOMBRE
              </Text>

              <Text style={styles.value}>
                {name}
              </Text>
            </Section>

            <Section style={styles.infoBlock}>
              <Text style={styles.label}>
                EMAIL
              </Text>

              <Link
                href={`mailto:${email}`}
                style={styles.emailLink}
              >
                {email}
              </Link>
            </Section>

            <Section style={styles.infoBlock}>
              <Text style={styles.label}>
                ASUNTO
              </Text>

              <Text style={styles.value}>
                {subject}
              </Text>
            </Section>
          </Section>

          {/* ================================================= */}
          {/* MESSAGE                                           */}
          {/* ================================================= */}

          <Section style={styles.messageSection}>
            <Text style={styles.sectionLabel}>
              MENSAJE
            </Text>

            <Section style={styles.messageBox}>
              <Text style={styles.message}>
                {message}
              </Text>
            </Section>
          </Section>

          {/* ================================================= */}
          {/* ACTION                                            */}
          {/* ================================================= */}

          <Section style={styles.actionSection}>
            <Link
              href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`}
              style={styles.button}
            >
              Responder al remitente →
            </Link>
          </Section>

          {/* ================================================= */}
          {/* FOOTER                                            */}
          {/* ================================================= */}

          <Hr style={styles.divider} />

          <Section style={styles.footer}>
            <Text style={styles.footerLogo}>
              RR
            </Text>

            <Text style={styles.footerText}>
              Este mensaje fue enviado desde el formulario de
              contacto de tu portafolio.
            </Text>

            <Text style={styles.footerCopyright}>
              © {new Date().getFullYear()} Richard Rivera
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ========================================================= */
/* STYLES                                                    */
/* ========================================================= */

const styles = {
  body: {
    margin: "0",
    padding: "40px 20px",
    backgroundColor: "#f8fafc",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    color: "#0f172a",
  },

  container: {
    maxWidth: "620px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
  },

  header: {
    padding: "28px 36px",
    borderBottom: "1px solid #e2e8f0",
  },

  logo: {
    margin: "0",
    fontSize: "26px",
    lineHeight: "1",
    fontWeight: "800",
    letterSpacing: "-1px",
    color: "#2563eb",
  },

  headerLabel: {
    margin: "8px 0 0",
    fontSize: "9px",
    lineHeight: "1",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#94a3b8",
  },

  content: {
    padding: "34px 36px 10px",
  },

  eyebrow: {
    margin: "0 0 12px",
    fontSize: "9px",
    lineHeight: "1",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#2563eb",
  },

  heading: {
    margin: "0",
    fontSize: "27px",
    lineHeight: "1.25",
    fontWeight: "700",
    letterSpacing: "-0.6px",
    color: "#0f172a",
  },

  description: {
    margin: "14px 0 0",
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#64748b",
  },

  divider: {
    margin: "28px 36px",
    borderColor: "#e2e8f0",
  },

  sectionLabel: {
    margin: "0 0 20px",
    fontSize: "9px",
    lineHeight: "1",
    fontWeight: "700",
    letterSpacing: "1.8px",
    color: "#94a3b8",
  },

  infoBlock: {
    marginBottom: "18px",
  },

  label: {
    margin: "0 0 5px",
    fontSize: "9px",
    lineHeight: "1.2",
    fontWeight: "700",
    letterSpacing: "1.5px",
    color: "#94a3b8",
  },

  value: {
    margin: "0",
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "500",
    color: "#1e293b",
  },

  emailLink: {
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "500",
    color: "#2563eb",
    textDecoration: "none",
  },

  messageSection: {
    padding: "10px 36px 0",
  },

  messageBox: {
    padding: "20px",
    backgroundColor: "#f8fafc",
    borderLeft: "3px solid #2563eb",
  },

  message: {
    margin: "0",
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#334155",
    whiteSpace: "pre-wrap" as const,
  },

  actionSection: {
    padding: "32px 36px",
  },

  button: {
    display: "inline-block",
    padding: "13px 20px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontSize: "13px",
    lineHeight: "1",
    fontWeight: "600",
    textDecoration: "none",
  },

  footer: {
    padding: "0 36px 32px",
    textAlign: "center" as const,
  },

  footerLogo: {
    margin: "0",
    fontSize: "18px",
    lineHeight: "1",
    fontWeight: "800",
    color: "#2563eb",
  },

  footerText: {
    maxWidth: "400px",
    margin: "10px auto 0",
    fontSize: "11px",
    lineHeight: "1.6",
    color: "#94a3b8",
  },

  footerCopyright: {
    margin: "12px 0 0",
    fontSize: "10px",
    color: "#cbd5e1",
  },
};

export default ContactEmail;