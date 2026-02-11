import { SiteFooter, SiteNav } from "components";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getTodaysCookie } from "./utils";

import styles from "app/admin/admin.module.css";

const AdminLayout = async ({ children }) => {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(getTodaysCookie())?.value === "YES";

  if (isAdmin) {
    return redirect("/admin");
  }

  return (
    <>
      <SiteNav />
      <div
        className={styles.container}
        style={{ paddingTop: `var(--navHeight)` }}
      >
        {children}
      </div>
      <SiteFooter />
    </>
  );
};

export default AdminLayout;
