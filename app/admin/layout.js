import { FixedFooter, SiteFooter, SiteNav } from "components";

import styles from "./admin.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getTodaysCookie } from "../log-in/utils";
import FlashMessages from "app/flash-messages";
import { Suspense } from "react";

const AdminLayout = async ({ children }) => {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(getTodaysCookie())?.value === "YES";

  if (!isAdmin) {
    redirect("/log-in");
  }

  return (
    <>
      <SiteNav />
      <div
        className={styles.container}
        style={{ paddingTop: `var(--navHeight)` }}
      >
        <div className={styles.adminGrid}>
          <div className={styles.adminNav}>
            <h1>AdminZone</h1>
            <nav>
              <ul className={styles.adminNav__nav__list}>
                <li>
                  <Link href="/admin">Home</Link>
                </li>
                <li>
                  <Link href="/admin/projects">Projects</Link>
                </li>
                <li>
                  <Link href="/admin/log-out">Log out</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Suspense>
            <FlashMessages />
          </Suspense>
          {children}
        </div>
      </div>
      <SiteFooter />
      <FixedFooter />
    </>
  );
};

export default AdminLayout;
