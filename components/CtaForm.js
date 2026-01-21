import { usePathname } from "next/navigation";

import styles from "./CtaForm.module.css";
import { Button } from ".";
import { useSubmit } from "../lib/customHooks";

const CtaForm = () => {
  const [formState, onSubmit] = useSubmit();
  const pathname = usePathname();

  if (formState === "submitted") {
    return (
      <>
        <h4>Awesome!</h4>
        <p>
          Our sales team will reach out to discuss your project. Thank you for
          giving us the opportunity to earn your business! We are excited to
          work with you!
        </p>
      </>
    );
  }

  return (
    <form className={styles.CtaForm} onSubmit={onSubmit}>
      {formState === "error" ? (
        <p style={{ color: "var(--danger)" }}>
          Oh no! An error occurred. If this problem continues please let our
          team know.
        </p>
      ) : (
        <p>
          If you're curious about custom apparel, need graphic design feedback,
          or have any questions about the ordering process,{" "}
          <strong>
            Our friendly apparel experts are happy to talk you through your next
            project!
          </strong>
        </p>
      )}
      {[
        { type: "hidden", name: "__title", value: "schedule_consult" },
        { type: "hidden", name: "page_url", value: pathname },
        { type: "text", name: "full_name", label: "Full Name", required: true },
        { type: "email", name: "email", label: "Email", required: true },
        {
          type: "tel",
          name: "phone_number",
          label: "Phone Number",
          styles: { flexBasis: "auto" },
        },
        {
          type: "text",
          name: "zip_code",
          label: "Zip Code",
          styles: { flexBasis: 160 },
        },
        {
          type: "text",
          name: "organization",
          label: "Company / Organization",
        },
      ].map((field) => {
        const id = `CtaForm_${field.name}`;

        return (
          <div key={id} className={styles.inputWrapper} style={field.styles}>
            <label htmlFor={id}>{field.label}</label>
            <input
              id={id}
              name={field.name}
              type={field.type}
              value={field.value}
              required={field.required || false}
            />
          </div>
        );
      })}
      <div className={styles.CtaForm__actions}>
        <Button type={"submit"} isSubmitting={formState === "submitting"}>
          Schedule a Call!
        </Button>
      </div>
    </form>
  );
};

export default CtaForm;
