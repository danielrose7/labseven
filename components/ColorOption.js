import Link from "next/link";
import styles from "./ColorOption.module.css";

const ColorOption = ({ style, isActive = false, replace = false }) => {
  const isWhite =
    style.Name.toLowerCase() === "white" || style.HtmlColor1 === "FFFFFF";

  return (
    <li key={style.ID}>
      <Link
        href={style.href}
        replace={replace}
        scroll={!replace}
        title={style.Name}
        onClick={(e) => e.stopPropagation()}
        className={`${styles.styleOption}${
          isActive ? ` ${styles.styleOptionActive}` : ""
        }`}
      >
        <span
          className={styles.styleOption__color}
          style={{
            backgroundColor: `#${style.HtmlColor1}`,
            border: isWhite && !isActive ? `1px solid var(--hr)` : undefined,
          }}
        >
          {Boolean(style.HtmlColor2) && (
            <span
              className={styles.styleOption__color2}
              style={{ "--color": `#${style.HtmlColor2}` }}
            />
          )}
        </span>
      </Link>
    </li>
  );
};

export default ColorOption;
