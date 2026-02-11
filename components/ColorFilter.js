import { CANONICAL_COLORS } from "lib/colorFilter";
import styles from "./ColorFilter.module.css";

const ColorFilter = ({ query, setQuery, className }) => {
  const activeColor = query.color || "";

  const handleClick = (colorKey) => {
    const resetPage = query.page && query.page != 1;
    const pageQuery = resetPage ? { page: 1 } : {};

    if (activeColor === colorKey) {
      setQuery({ ...pageQuery, color: "" });
    } else {
      setQuery({ ...pageQuery, color: colorKey });
    }
  };

  return (
    <div
      className={`${styles.colorFilter}${className ? ` ${className}` : ""}`}
    >
      <label className={styles.colorFilter__label}>
        Color
        <span className={styles.colorFilter__tooltip}>
          ?
          <span className={styles.colorFilter__tooltipText}>
            Approximate color matching to help narrow down our large inventory.
            Results may include similar shades.
          </span>
        </span>
      </label>
      <div className={styles.colorFilter__swatches}>
        {CANONICAL_COLORS.map((color) => {
          const isActive = activeColor === color.key;
          const isWhite = color.key === "white";

          return (
            <button
              key={color.key}
              type="button"
              title={color.name}
              className={`${styles.swatch}${
                isActive ? ` ${styles.swatchActive}` : ""
              }`}
              onClick={() => handleClick(color.key)}
            >
              <span
                className={styles.swatch__color}
                style={{
                  backgroundColor: `#${color.hex}`,
                  border:
                    isWhite && !isActive
                      ? "1px solid var(--hr)"
                      : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorFilter;
