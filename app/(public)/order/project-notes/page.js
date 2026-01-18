"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button, ThreeDotLoader } from "components";

import ArrowLeft from "public/assets/Arrows/Left.svg";
import StartArrow from "public/assets/Order/StartArrow.svg";
import Step3_Upload from "public/assets/Home/Step3_Upload.svg";
import UploadedIcon from "public/assets/Order/UploadedIcon.svg";

import styles from "styles/OrderForm.module.css";
import homeStyles from "styles/Home.module.css";
import utilStyles from "styles/utils.module.css";
import { useOrderForm } from "lib/orderForm";
import useFileUpload from "lib/useFileUpload";

const ProjectNotes = () => {
  const { formik } = useOrderForm();

  const nameVal = React.useMemo(() => formik.values.name, [formik.values.name]);
  const attachmentVal = React.useRef(formik.values.attachments);
  React.useEffect(() => {
    attachmentVal.current = formik.values.attachments;
  }, [formik.values.attachments]);
  const addAttachment = React.useCallback(
    (attachment) => {
      const prev = attachmentVal.current || [];
      formik.setFieldValue("attachments", [...prev, attachment]);
    },
    [formik.setFieldValue]
  );
  const [uploadData, dropzone] = useFileUpload(nameVal, addAttachment);
  const isUploadDisabled = uploadData?.state === "idle";
  const showUploadLoader =
    uploadData?.state === "idle" || uploadData?.state === "loading";

  return (
    <div className={styles.background}>
      <h2 className={styles.startHeader}>
        <Image
          src={StartArrow}
          alt={"Start Arrow"}
          className={styles.startArrow}
          aria-hidden={true}
        />
        Start your <span className={homeStyles.Underline1}>awesome</span>{" "}
        project:
      </h2>
      <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        <nav className={styles.formNav} aria-label="Order Form Navigation">
          <Link
            href="/order/size-breakdown"
            className={styles.formNav__prev}
            scroll={false}
          >
            <Image src={ArrowLeft} alt={"Arrow back to Size Breakdown"} />
          </Link>
        </nav>
        <Image
          src={Step3_Upload}
          alt="Upload logo to cloud"
          style={{ maxWidth: "9rem", height: "auto" }}
        />
        <h1 className={styles.stepTitle}>3. Upload your logo or idea</h1>
        <div className={styles.notesBlockContainer}>
          <div className={styles.notesBlock}>
            <div className={styles.formField}>
              <label htmlFor="name" className={styles.form__label}>
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.form__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email" className={styles.form__label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.form__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="phone" className={styles.form__label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={styles.form__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>
          </div>
          <div className={styles.notesBlock}>
            <div className={styles.formField}>
              <label htmlFor="notes" className={styles.form__label}>
                Project Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                className={styles.form__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
                rows={7}
                placeholder="Write a brief description of your design / concept."
              />
            </div>
          </div>
          <div className={styles.notesBlock}>
            <div className={styles.formField}>
              <label htmlFor="attachments" className={styles.form__label}>
                Attachments
              </label>
              {uploadData?.state === "success" && (
                <p className={styles.successMessage}>{uploadData.message}</p>
              )}
              <div
                className={[
                  styles.dropzoneBox,
                  isUploadDisabled && styles.dropzoneBoxIsDisabled,
                  formik.values.attachments?.length &&
                    styles.dropzoneBoxHasFiles,
                ]
                  .filter(Boolean)
                  .join(" ")}
                {...dropzone.getRootProps()}
              >
                <input
                  {...dropzone.getInputProps()}
                  disabled={isUploadDisabled}
                />
                {dropzone.isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag & drop or click to browse.</p>
                )}
              </div>
              {showUploadLoader && <ThreeDotLoader />}
              {uploadData?.state === "error" && (
                <>
                  <p style={{ color: "var(--danger)" }}>
                    {uploadData?.message || "Something went wrong."}
                  </p>
                  <small>
                    Please refresh and try again. If you get another error,
                    please submit this form without attachments and let our team
                    something went wrong.
                  </small>
                </>
              )}
            </div>
            {!!formik.values.attachments?.length && (
              <div className={styles.formField}>
                <label className={styles.form__label}>Uploaded Files</label>
                <ul className={styles.uploadDisplayContainer}>
                  {formik.values.attachments.map((fileData, i) => {
                    const extension = fileData.name.split(".").pop() || "";

                    return (
                      <li
                        key={i}
                        className={[
                          styles.uploadDisplay__item,
                          utilStyles.tooltipped,
                        ].join(" ")}
                        aria-label={fileData.name}
                      >
                        <Image
                          src={UploadedIcon}
                          alt="Hand-sketch of Uploaded File Icon"
                          style={{ width: "2rem", height: "auto" }}
                        />
                        <div className={styles.uploadDisplay__item__caption}>
                          <p className={styles.uploadDisplay__text}>
                            {extension.toUpperCase()}
                          </p>
                          <p className={styles.uploadDisplay__text}>
                            {fileData.size}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={styles.form__actions}>
          <Button type="submit" isSubmitting={formik.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectNotes;
