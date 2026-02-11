"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { purgeCache } from "../actions";

import { Button } from "components";

const initialState = { message: "" };

function PurgeCacheButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isSubmitting={pending}>
      Purge Cache
    </Button>
  );
}

export function PurgeCacheForm({ projectId }) {
  const [state, formAction] = useActionState(purgeCache, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={projectId} />
      <PurgeCacheButton />
      {state?.message && (
        <p aria-live="polite" role="status" style={{ color: "var(--danger)" }}>
          {state?.message}
        </p>
      )}
    </form>
  );
}

export default PurgeCacheForm;
