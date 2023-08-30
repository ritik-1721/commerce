import { Fragment, useState, useEffect, useCallback } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import ProductGrid from "@/components/product/ProductGrid";
import { getProductsByCategorySlugApi } from "@/utils/service";
import NotFound from "@/components/common/NotFound/NotFound";

import {
  Squares2X2Icon,
  PlusIcon,
  ChevronDownIcon,
  MinusIcon,
  FunnelIcon,
  CrossIcon,
} from "@/components/icons";
// import NotFound from "../NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import ProductGridSkeleton from "@/components/skeleton/ProductGridSkeleton";
import {
  fetchSubCategorys,
  fetchCategoryAttributeValues,
} from "@/store/thunks/categoryFiltersThunk";
import Link from "next/link";
import { BASE_URL } from "@/utils/constants";
import CategoryFiltersSkeleton from "@/components/skeleton/CategoryFiltersSkeleton";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MobileFilterDialog({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  subCategories,
  categoryAttrVals,
  handleCheckboxChange,
  filterAttrValues,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <CrossIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {subCategories.isLoading || subCategories.isError ? (
                  <></>
                ) : (
                  <Disclosure
                    as="div"
                    // key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Category
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {subCategories.list.map((category, optionIdx) => (
                              <div
                                key={optionIdx}
                                className="flex items-center"
                              >
                                <Link
                                  href={`${BASE_URL}category/${category.category_slug}`}
                                  // className="block px-2 py-1"
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {category.category_name}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}

                {categoryAttrVals.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.attribute_id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.attribute_name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.attribute_values.map(
                              (option, optionIdx) => (
                                <div
                                  key={option.attribute_value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.attribute_id}-${optionIdx}`}
                                    name={`${section.attribute_id}[]`}
                                    defaultValue={option.attribute_value}
                                    type="checkbox"
                                    onClick={() =>
                                      handleCheckboxChange(
                                        section.attribute_id,
                                        option.attribute_value_id
                                      )
                                    }
                                    checked={
                                      filterAttrValues[section.attribute_id][
                                        option.attribute_value_id
                                      ]
                                    }
                                    defaultChecked={/*option.checked*/ false}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.attribute_id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.attribute_value_description}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function CategoryList({ subCategories }) {
  if (subCategories.isLoading || subCategories.isError) {
    return;
  }
  return (
    <>
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Category</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {subCategories.list.map((category, optionIdx) => (
                  <div key={optionIdx} className="flex items-center">
                    <Link
                      href={`${BASE_URL}category/${category.category_slug}`}
                      // className="block px-2 py-1"
                      className="ml-3 text-sm text-gray-600"
                    >
                      {category.category_name}
                    </Link>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

function FilterSection({ section, handleCheckboxChange, filterAttrValues }) {
  return (
    <Disclosure
      as="div"
      key={section.attribute_id}
      className="border-b border-gray-200 py-6"
    >
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">
                {section.attribute_name}
              </span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {section.attribute_values.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`filter-${section.attribute_id}-${optionIdx}`}
                    name={`${section.attribute_id}[]`}
                    defaultValue={option.attribute_value_id}
                    type="checkbox"
                    defaultChecked={/*option.checked*/ false}
                    checked={
                      filterAttrValues?.[section.attribute_id]?.[
                        option.attribute_value_id
                      ]
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onClick={() =>
                      handleCheckboxChange(
                        section.attribute_id,
                        option.attribute_value_id
                      )
                    }
                  />
                  <label
                    htmlFor={`filter-${section.attribute_id}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.attribute_value_description}
                  </label>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function SortMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Sort
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <a
                    href={option.href}
                    className={classNames(
                      option.current
                        ? "font-medium text-gray-900"
                        : "text-gray-500",
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {option.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function GridSection({ products }) {
  return (
    <div className="lg:col-span-3">
      {products.loading === true && <ProductGridSkeleton />}
      {products.error !== null && <NotFound view="NO_PRODUCT_FOUND_VIEW" />}
      {products.error === null && products.loading === false && (
        <ProductGrid productList={products.productList} />
      )}
    </div>
  );
}

export default function CategoryFilters({ categoryId, categoryName, slug }) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const subCategories = useSelector(
    (state) => state.categoryFilters.subCategories
  );
  const categoryAttrVals = useSelector(
    (state) => state.categoryFilters.categoryAttrVals.list
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filterAttrValues, setFilterAttrValues] = useState({});

  const handleCheckboxChange = (filterAttr, filterValue) => {
    setFilterAttrValues((prevFilters) => ({
      ...prevFilters,
      [filterAttr]: {
        ...prevFilters[filterAttr],
        [filterValue]: !prevFilters[filterAttr][filterValue],
      },
    }));
  };

  useEffect(() => {
    const initialFilters = {};
    categoryAttrVals?.map((attrs) => {
      initialFilters[attrs.attribute_id] = {};
      attrs.attribute_values.map((vals) => {
        initialFilters[attrs.attribute_id][vals.attribute_value_id] = false;
      });
    });
    setFilterAttrValues(initialFilters);
  }, [categoryAttrVals]);

  const [products, setProducts] = useState({
    loading: true,
    productList: [],
    error: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const formatFiltersForAPI = (selectedFilters) => {
    const formattedFilters = {};

    for (const filterType in selectedFilters) {
      if (selectedFilters.hasOwnProperty(filterType)) {
        formattedFilters[filterType] = Object.keys(
          selectedFilters[filterType]
        ).filter((item) => selectedFilters[filterType][item]);
      }
    }

    return formattedFilters;
  };

  const getProductGrid = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.set(
        "filter",
        JSON.stringify(formatFiltersForAPI(filterAttrValues))
      );
      const req = await getProductsByCategorySlugApi(
        `${slug}?user_id=${userDetails ? userDetails.user_id : 0}`,
        formData
      );
      const data = await req.json();
      if (data.ok === false) {
        setProducts({
          ...products,
          loading: false,
          error: data.message,
        });
      } else {
        setProducts({
          ...products,
          loading: false,
          error: null,
          productList: data.productList,
        });
      }
    } catch (error) {
      console.log(error);
      setProducts({
        ...products,
        loading: false,
        error: "something went wrong.",
      });
    }
  }, [slug, userDetails, filterAttrValues]);

  useEffect(() => {
    getProductGrid();
  }, [getProductGrid]);

  useEffect(() => {
    dispatch(fetchSubCategorys(categoryId));
    dispatch(fetchCategoryAttributeValues(categoryId));
  }, [dispatch, categoryId]);

  if (isLoading) {
    return <CategoryFiltersSkeleton />;
  }

  return (
    <div className="bg-white">
      <div>
        <MobileFilterDialog
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          subCategories={subCategories}
          categoryAttrVals={categoryAttrVals}
          handleCheckboxChange={handleCheckboxChange}
          filterAttrValues={filterAttrValues}
        />

        <main className="mx-auto max-w-full px-1 sm:px-2 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {categoryName}
            </h1>

            <div className="flex items-center">
              <SortMenu />

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <button
                      className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                    >
                      <span className="font-medium text-gray-900">Filter</span>
                    </button>
                  </h3>
                </div>
                <h3 className="sr-only">Categories</h3>

                <CategoryList subCategories={subCategories} />

                {categoryAttrVals?.map((section, index) => (
                  <FilterSection
                    section={section}
                    key={index}
                    handleCheckboxChange={handleCheckboxChange}
                    filterAttrValues={filterAttrValues}
                  />
                ))}
              </form>

              <GridSection products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
