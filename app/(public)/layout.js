import { FixedFooter, SiteFooter, SiteNav } from "components";

const PublicLayout = ({ children }) => {
  return (
    <>
      <SiteNav />
      <div style={{ paddingTop: "var(--navHeight)" }}>{children}</div>
      <SiteFooter />
      <FixedFooter />
    </>
  );
};

export default PublicLayout;
