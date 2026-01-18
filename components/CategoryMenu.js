"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import styles from "./CategoryMenu.module.css";

import { SEARCH_KEYS } from "./SearchBar";

const CategoryMenu = ({
  categories,
  activeCategory,
  activeSubCategory = {},
}) => {
  const searchParams = useSearchParams();
  const hasActiveSubCategory = !!activeSubCategory.ID;
  const searchQuery = {};
  for (const searchKey of SEARCH_KEYS) {
    const searchValue = searchParams.get(searchKey);
    if (searchValue) searchQuery[searchKey] = searchValue;
  }

  if (!!activeCategory) {
    return (
      <nav className={styles.nav}>
        <div className={styles.breadcrumbs}>
          <Link
            href={{ pathname: "/products", query: searchQuery }}
            className={styles.activeHelperLink}
          >
            Products
          </Link>
          {hasActiveSubCategory && (
            <Link
              href={{ pathname: activeCategory.href, query: searchQuery }}
              className={styles.activeHelperLink}
            >
              {activeCategory.Name}
            </Link>
          )}
        </div>

        <h1 className={styles.activeFilterTitle}>
          {hasActiveSubCategory ? activeSubCategory.Name : activeCategory.Name}
        </h1>
        {activeCategory.hasSubCategories && (
          <ul className={styles.subcategoriesList}>
            {activeCategory.SubCategories.map((subCat) =>
              subCat.ID === activeSubCategory.ID ? (
                <li
                  key={subCat.ID}
                  className={`${styles.subcategoriesList__option} ${styles.subcategoriesList__activeOption}`}
                >
                  <h2>{subCat.Name}</h2>
                </li>
              ) : (
                <li
                  key={subCat.ID}
                  className={styles.subcategoriesList__option}
                >
                  <Link href={{ pathname: subCat.href, query: searchQuery }}>
                    {subCat.Name}
                  </Link>
                </li>
              )
            )}
          </ul>
        )}
      </nav>
    );
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.categoriesList}>
        {categories.map((category) => (
          <li key={category.ID} className={styles.categoriesList__option}>
            <Link href={{ pathname: category.href, query: searchQuery }}>
              {category.Name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;
