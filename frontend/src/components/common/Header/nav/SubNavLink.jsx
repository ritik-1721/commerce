import { Fragment } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { BASE_URL } from "@/utils/constants";
import { CaretDownIcon } from "@radix-ui/react-icons";

function CategoryLink({ categorySlug, categoryName, hasHierarchy, hierarchy }) {
  const triggerClassName = `group items-center justify-between py-2 pl-3 pr-4 text-balck rounded hover: hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-500 md:p-0 flex`;

  if (!hasHierarchy) {
    return (
      <Fragment>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={triggerClassName}>
            <Link href={`${BASE_URL}category/${categorySlug}`}>
              {categoryName}
            </Link>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger className={triggerClassName}>
          {categoryName}
          <CaretDownIcon
            className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
            aria-hidden
          />
        </NavigationMenu.Trigger>
        <NestedCategories
          categorySlug={categorySlug}
          categoryName={categoryName}
          hierarchy={hierarchy}
        />
      </NavigationMenu.Item>
    </Fragment>
  );
}

function NestedCategories({ categorySlug, categoryName, hierarchy }) {
  const contentClassName = "absolute top-0 left-0 w-full sm:w-auto bg-slate-50";
  const linkClassName =
    "hover:bg-mauve3 block select-none text-[16px] leading-none no-underline outline-none transition-colors text-balck px-6 font-bold md:hover:text-gray-500 mt-5";
  const ulClassName =
    "one m-0 w-full grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]";

  return (
    <NavigationMenu.Content
      className={contentClassName}
      style={{ width: "576px" }}
    >
      <Link
        href={`${BASE_URL}category/${categorySlug}`}
        className={linkClassName}
        key="category-link"
      >
        {categoryName}
      </Link>
      <ul className={ulClassName} style={{ width: "100%" }}>
        {hierarchy.map((subitem, subindex) => (
          <NestedCategory
            key={`subitem-${subindex}`}
            subitem={subitem}
            subindex={subindex}
            categorySlug={categorySlug}
          />
        ))}
      </ul>
    </NavigationMenu.Content>
  );
}

function NestedCategory({ subitem, subindex, categorySlug }) {
  const {
    category_slug: subitemSlug,
    category_name: subitemName,
    category_hierarchy: subCategoryHierarchy,
  } = subitem;
  const hasSubitemHierarchy = subCategoryHierarchy.length > 0;

  const linkClassName = `block text-balck rounded hover: hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-500 md:p-0 `;

  return (
    <Fragment key={`subitem-${subindex}`}>
      <Link
        href={`${BASE_URL}category/${subitemSlug}`}
        className={`${linkClassName} ${
          hasSubitemHierarchy && "font-medium pb-4 "
        }`}
        key={`subitem-link-${subindex}`}
      >
        {subitemName}
      </Link>
      {hasSubitemHierarchy && (
        <Link
          href={`${BASE_URL}category/${subitemSlug}`}
          className={linkClassName}
          key={`subitem-link2-${subindex}`}
        >
          {"  "}
        </Link>
      )}
      {subCategoryHierarchy.map((subCategory, subIndex) => (
        <Link
          key={`subitem-${subIndex}`}
          href={`${BASE_URL}category/${subCategory.category_slug}`}
          className={linkClassName}
        >
          {subCategory.category_name}
        </Link>
      ))}
    </Fragment>
  );
}

function SubNavLink({ categoryLinks }) {
  if (!categoryLinks || categoryLinks.length === 0) {
    return null;
  }

  return categoryLinks.map((item, index) => (
    <CategoryLink
      key={`category-link-${index}`}
      categorySlug={item.category_slug}
      categoryName={item.category_name}
      hasHierarchy={item.category_hierarchy.length > 0}
      hierarchy={item.category_hierarchy}
    />
  ));
}

export default SubNavLink;
