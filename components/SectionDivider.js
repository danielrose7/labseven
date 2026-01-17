import styles from "./SectionDivider.module.css";

const SectionDivider = () => (
  <div className={styles.SectionDivider}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1728 180"
      aria-hidden="true"
    >
      <path
        style={{ fill: "var(--background)" }}
        d="m1727.46,0v108.35c-123.61,55.23-287.83,56.6-426.96,33.57-1.06-.18-2.12-.35-3.18-.53C1088.47,106.6,897.29,24.8,682.64,7.07c-117.45-9.7-229.84,1.15-342.55,36.38-60.86,19.03-118.02,46.94-178.34,67.28-13.02,4.39-94.7,27.54-161.75,40.32V0h1727.46Z"
      />
    </svg>
  </div>
);

export default SectionDivider;
