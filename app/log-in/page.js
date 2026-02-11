"use client";

import * as React from "react";
import { useActionState } from "react";

import { Button } from "components";

import { adminLogin } from "./actions";

import styles from "app/admin/admin.module.css";

const AdminLoginPage = () => {
  const [formState, formAction] = useActionState(adminLogin, {});

  return (
    <form className={styles.adminContainer} action={formAction}>
      <input type="password" name="password" placeholder="password..." />
      <Button type="submit">Authenticate</Button>
      {formState?.message && (
        <p aria-live="polite" role="status" style={{ color: "var(--danger)" }}>
          {formState?.message}
        </p>
      )}
    </form>
  );
};

export default AdminLoginPage;
