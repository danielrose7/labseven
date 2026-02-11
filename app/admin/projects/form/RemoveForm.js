"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { deleteProject } from "../actions";

import { Button } from "components";

const initialState = { message: "" };

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="ButtonDanger" type="submit" isSubmitting={pending}>
      Delete
    </Button>
  );
}

export function RemoveProjectForm({ projectId }) {
  const [state, formAction] = useActionState(deleteProject, initialState);

  return (
    <form
      action={(...args) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this project?"
        );
        if (confirmed) {
          return formAction(...args);
        }
      }}
    >
      <input type="hidden" name="id" value={projectId} />
      <DeleteButton />
      {state?.message && (
        <p aria-live="polite" role="status" style={{ color: "var(--danger)" }}>
          {state?.message}
        </p>
      )}
    </form>
  );
}

export default RemoveProjectForm;
