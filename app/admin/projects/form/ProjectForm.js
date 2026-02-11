"use client";

import { upload } from "@vercel/blob/client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { createProject, updateProject } from "app/admin/projects/actions";

import { Button, ThreeDotLoader } from "components";

import styles from "app/admin/admin.module.css";
import Image from "next/image";

const ErrorMessage = ({ message }) => {
  if (!message) return;

  return <p style={{ color: "var(--danger)" }}>{message}</p>;
};

const FormFields = ({ formState = {}, submitText = "Submit" }) => {
  const { pending } = useFormStatus();
  const [primaryUploading, setPrimaryUploading] = useState(false);
  const [primaryPreviewUrl, setPrimaryPreviewUrl] = useState(
    formState.data?.primary_blob_url
  );
  const [secondaryUploading, setSecondaryUploading] = useState(false);
  const [secondaryPreviewUrl, setSecondaryPreviewUrl] = useState(
    formState.data?.secondary_blob_url
  );

  const uploading = primaryUploading || secondaryUploading;

  return (
    <>
      <div className={styles.inputWrapper}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={formState.data?.name}
          required
        />
        <ErrorMessage message={formState.errors?.name} />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={formState.data?.description}
        />
        <ErrorMessage message={formState.errors?.description} />
      </div>
      <div className={styles.inputWrapper} style={{ "--inputWidth": "660px" }}>
        <label htmlFor="name">Project Path</label>
        <input
          id="productPath"
          name="productPath"
          type="text"
          defaultValue={formState.data?.productPath}
          required
        />
        <small>
          Hint: https://www.labseven.co
          <span style={{ backgroundColor: "var(--primary)" }}>
            /product/american-apparel-6456/purple
          </span>
        </small>
        <ErrorMessage message={formState.errors?.productPath} />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="primaryBlob">Primary Image</label>
        <input
          id="primaryBlob"
          name="primaryBlob"
          type="file"
          onChange={async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            try {
              setPrimaryUploading(true);
              const newBlob = await upload(file.name, file, {
                access: "public",
                handleUploadUrl: "/api/project/upload",
              });
              setPrimaryPreviewUrl(newBlob.url);
            } catch (err) {
              console.error("Upload error", err);
            } finally {
              setPrimaryUploading(false);
            }
          }}
        />
        {primaryUploading && <ThreeDotLoader />}
        {!primaryUploading && primaryPreviewUrl && (
          <Image src={primaryPreviewUrl} width={125} height={185} />
        )}
        <input
          type="hidden"
          name="primary_blob_url"
          value={primaryPreviewUrl}
        />
        <ErrorMessage message={formState.errors?.primary_blob_url} />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="secondaryBlob">Hover Image</label>
        <input
          id="secondaryBlob"
          name="secondaryBlob"
          type="file"
          onChange={async (event) => {
            const file = event.target.files[0];
            if (!file) return;
            try {
              setSecondaryUploading(true);
              const newBlob = await upload(file.name, file, {
                access: "public",
                handleUploadUrl: "/api/project/upload",
              });
              setSecondaryPreviewUrl(newBlob.url);
            } catch (err) {
              console.error("Upload error", err);
            } finally {
              setSecondaryUploading(false);
            }
          }}
        />
        {secondaryUploading && <ThreeDotLoader />}
        {!secondaryUploading && secondaryPreviewUrl && (
          <Image src={secondaryPreviewUrl} width={123} height={185} />
        )}
        <input
          type="hidden"
          name="secondary_blob_url"
          value={secondaryPreviewUrl}
        />
        <ErrorMessage message={formState.errors?.secondary_blob_url} />
      </div>
      <hr />
      <Button type="submit" isSubmitting={pending} disabled={uploading}>
        {submitText}
      </Button>
    </>
  );
};

export const ProjectForm = ({ initialState, submitText, projectId }) => {
  const action = projectId
    ? updateProject.bind(null, projectId)
    : createProject;
  const [formState, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className={styles.adminForm}>
      <FormFields formState={formState} submitText={submitText} />
    </form>
  );
};
