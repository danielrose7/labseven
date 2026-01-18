import { useState, useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";

export const SEARCH_KEYS = ["q", "sort"];

const SearchBar = ({ query, setQuery, debounceMs = 300 }) => {
  const [localSearch, setLocalSearch] = useState(query.q || "");
  const isFirstMount = useRef(true);

  // Sync local state when URL query changes externally
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setLocalSearch(query.q || "");
  }, [query.q]);

  // Debounce URL updates
  useEffect(() => {
    const resetPage = query.page && query.page != 1;
    const pageQuery = resetPage ? { page: 1 } : {};

    const handler = setTimeout(() => {
      if (localSearch !== (query.q || "")) {
        setQuery({ ...pageQuery, q: localSearch });
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [localSearch, debounceMs, setQuery, query.page, query.q]);

  const resetPage = query.page && query.page != 1;
  const pageQuery = resetPage ? { page: 1 } : {};

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__inputContainer}>
        <label htmlFor="sort_by">Sort</label>
        <select
          onChange={(event) =>
            setQuery({ ...pageQuery, sort: event.target.value })
          }
          value={query.sort || "default"}
        >
          {[
            ["Default", "default"],
            ["Brand: A → Z", "brandAZ"],
            ["Brand: Z → A", "brandZA"],
            ["Price: High → Low", "priceHighLow"],
            ["Price: Low → High", "priceLowHigh"],
          ].map(([label, value]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.searchBar__inputContainer}>
        <span role="img" aria-label="Magnifying Glass">
          <svg
            fill="currentColor"
            viewBox="0 0 13 13"
            height="15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.87 8.16l3.25 3.25-.7.71-3.26-3.25a5 5 0 1 1 .7-.7zM5 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
          </svg>
        </span>
        <input
          type="search"
          onChange={(event) => setLocalSearch(event.target.value)}
          value={localSearch}
          placeholder={"Search products..."}
        />
      </div>
    </div>
  );
};

export default SearchBar;
