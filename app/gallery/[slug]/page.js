"use server";

import { Suspense } from "react";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { notFound } from "next/navigation";

import styles from "../gallery.module.css";
import productStyles from "styles/product.module.css";

import ItemGallery from "./ItemGallery";

import OtherProjects, { OtherProjectsSkeleton } from "./OtherProjects";
import LinkedProduct from "./LinkedProduct";
import ProjectDescription from "./ProjectDescription";
import { ThreeDotLoader } from "components";

export default async function PageWrapper({ params: { slug } }) {
  const { rows } = await sql`SELECT * from projects WHERE slug = ${slug}`;
  const project = rows[0];
  if (!project) {
    return notFound();
  }

  return (
    <>
      <div className={productStyles.breadcrumbs}>
        <Link href="/gallery">Gallery</Link>
        <Link href={`/gallery/${project.slug}`}>{project.name}</Link>
      </div>
      <div className={productStyles.pageContainer}>
        <div className={productStyles.title}>
          <h1>{project.name}</h1>
          <Suspense fallback={<ThreeDotLoader />}>
            <LinkedProduct project={project} />
          </Suspense>
        </div>
        <ItemGallery project={project} />
        <div className={productStyles.details}>
          <Suspense fallback={<ThreeDotLoader />}>
            <ProjectDescription project={project} />
          </Suspense>
          <div className={styles.otherProjectContainer}>
            <h4>You Might Also Like</h4>
            <Suspense fallback={<OtherProjectsSkeleton />}>
              <OtherProjects project={project} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
