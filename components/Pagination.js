"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import pageStyles from "./Pagination.module.css";

import ArrowLeft from "public/assets/Arrows/Left.svg";
import ArrowRight from "../public/assets/Arrows/Right.svg";

const PageItem = ({ pageNumber, active, children, placeholder = false }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Build new URL with updated page param
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", pageNumber);
  const href = `${pathname}?${params.toString()}`;

  return (
    <li
      className={`${pageStyles.pageItem} ${
        active ? pageStyles.pageItemIsActive : ""
      } ${placeholder ? pageStyles.pageItemWithNoAction : ""}`}
    >
      {placeholder ? (
        <a>{children}</a>
      ) : (
        <Link href={href} replace scroll={false}>
          {children}
        </Link>
      )}
    </li>
  );
};

const PageNumber = ({ pageNumber, currentPage }) => {
  return (
    <PageItem pageNumber={pageNumber} active={pageNumber == currentPage}>
      {pageNumber}
    </PageItem>
  );
};

const Pagination = ({ pagination }) => {
  // hide if page undefined or irrelevant
  if (!pagination || !pagination.totalPages || pagination.totalPages === 1) {
    return null;
  }

  return (
    <ul className={pageStyles.pagination}>
      {/* back arrow */}
      {pagination.currentPage != 1 && (
        <PageItem pageNumber={pagination.prevPage}>
          <Image src={ArrowLeft} width={16} alt={"Arrow to previous page"} />
        </PageItem>
      )}

      {/* first page */}
      <PageNumber pageNumber={1} currentPage={pagination.currentPage} />
      {/* build range of pageNumbers from start + 1 --> end - 1 */}
      {Array(pagination.totalPages - 2)
        .fill("")
        .map((_, i) => {
          let pageNumber = i + 2;
          let diff = Math.abs(pageNumber - pagination.currentPage);
          let distanceFromEnd = pagination.totalPages - pagination.currentPage;
          let spacer =
            pagination.currentPage < 5 // on left end
              ? 6 - pagination.currentPage
              : distanceFromEnd < 4 // on right end
              ? 5 - distanceFromEnd
              : 2; // typical case

          // skip if not close to currentPage
          if (diff > spacer) {
            return null;
          }
          // render '...' if 2 away (typically) and not first or last in range
          if (
            diff === spacer &&
            ![2, pagination.totalPages - 1].includes(pageNumber)
          ) {
            return (
              <PageItem placeholder key={pageNumber}>
                ...
              </PageItem>
            );
          }

          // render page number
          return (
            <PageNumber
              key={pageNumber}
              pageNumber={pageNumber}
              currentPage={pagination.currentPage}
            />
          );
        })}
      {/* last page */}
      <PageNumber
        pageNumber={pagination.totalPages}
        currentPage={pagination.currentPage}
      />
      {/* next page */}
      {pagination.currentPage != pagination.totalPages && (
        <PageItem pageNumber={pagination.nextPage || pagination.totalPages}>
          <Image src={ArrowRight} width={16} alt={"Arrow to Next Page"} />
        </PageItem>
      )}
    </ul>
  );
};

export default Pagination;
