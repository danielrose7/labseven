import { FixedFooter, SiteFooter, SiteNav, HowToSteps, WaveCta } from "components";

const GalleryLayout = ({ children }) => {
  return (
    <>
      <SiteNav />
      <div style={{ paddingTop: "var(--navHeight)" }}>{children}</div>
      <HowToSteps
        title={"Ready to get started?"}
        titleAccent="get started?"
        noBottomOverlay
      />
      <WaveCta />
      <SiteFooter />
      <FixedFooter />
    </>
  );
};

export default GalleryLayout;
