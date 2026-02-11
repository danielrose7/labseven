import { ProjectForm } from "app/admin/projects/form/ProjectForm";

import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export default async function PageWrapper({ params }) {
  const { id } = await params;

  const { rows } = await sql`SELECT * from projects WHERE id = ${id}`;
  const project = rows[0];

  return (
    <>
      <h2>Update Project {id}</h2>
      <ProjectForm
        initialState={{
          data: {
            name: project.name,
            description: project.description,
            productPath: project.product_path,
            primary_blob_url: project.primary_blob_url,
            secondary_blob_url: project.secondary_blob_url,
          },
          errors: {},
        }}
        projectId={id}
        submitText="Update"
      />
    </>
  );
}
