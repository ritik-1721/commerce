import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  CrossIcon,
  ArrowRight,
  ChevronRightIcon,
  ArrowLeft,
} from "@/components/icons";
import Drawer from "react-modern-drawer";
import { useDispatch, useSelector } from "react-redux";
import "react-modern-drawer/dist/index.css";
import { drawerAction } from "@/store/slice/drawerSlice";
import { useEffect } from "react";

const MenuItem = ({ title, subitems, categorySlug, onItemClick }) => {
  const router = useRouter();
  const handleItemClick = () => {
    if (subitems.length > 0) {
      onItemClick(subitems);
    } else {
      router.push(`/category/${categorySlug}`);
    }
  };
  return (
    <div className="border-t border-gray-200 px-4 py-6">
      <h3 className="-mx-2 -my-3 flow-root">
        <button
          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
          onClick={handleItemClick}
        >
          <span className="font-medium text-gray-900">{title}</span>
          {subitems?.length > 0 && (
            <span className="ml-6 flex items-center">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </button>
      </h3>
    </div>
  );
};

const Menu = ({ items, allItems, onItemClick }) => {
  const parentItem = allItems.find((i) => i.category_id === items[0].parent_id);
  return (
    <>
      {parentItem && (
        <MenuItem
          key={0}
          title={parentItem.category_name}
          subitems={[]}
          categorySlug={parentItem.category_slug}
          onItemClick={onItemClick}
          parentItem={parentItem}
        />
      )}
      {items.map((item, index) => (
        <MenuItem
          key={index}
          title={item.category_name}
          subitems={item.category_hierarchy}
          categorySlug={item.category_slug}
          onItemClick={onItemClick}
          parentItem={parentItem}
        />
      ))}
    </>
  );
};

const SideBar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const links = useSelector((state) => state.navLink.links);
  const isLoading = useSelector((state) => state.navLink.isLoading);
  const isError = useSelector((state) => state.navLink.isError);
  const toggleDrawer = () => {
    dispatch(drawerAction.toggleDrawer());
  };
  const [menuHistory, setMenuHistory] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    setMenuItems(links);
    setAllItems(links);
  }, [links]);

  //category_hierarchy
  const handleMenuItemClick = (subitems) => {
    setMenuHistory([...menuHistory, menuItems]); // Push current menu items to history
    setMenuItems(subitems);
  };

  const handleBackClick = () => {
    if (menuHistory.length > 0) {
      const previousMenu = menuHistory.pop(); // Pop the last item from history
      setMenuItems(previousMenu);
      setMenuHistory([...menuHistory]); // Update history
    }
  };

  return (
    <Drawer
      size="500"
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      className="bla bla bla"
    >
      <div
        id="drawer-right-example"
        className=" bg-white w-80 py-4 dark:bg-gray-800"
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <div className="flex items-center justify-between px-4">
          <h2 className="text-lg font-medium text-gray-900">Menu</h2>
          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            onClick={toggleDrawer}
          >
            <span className="sr-only">Close menu</span>
            <CrossIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 border-t border-gray-200 overflow-y-visible h-96 ">
          {menuHistory.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6">
              <h3 className="-mx-2 -my-3 flow-root">
                <button
                  className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                  onClick={handleBackClick}
                >
                  <span className="font-medium text-gray-900">Back</span>
                  <span className="ml-6 flex items-center">
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
                  </span>
                </button>
              </h3>
            </div>
          )}
          <Menu
            items={menuItems}
            allItems={allItems}
            onItemClick={handleMenuItemClick}
          />
          {menuHistory.length === 0 && (
            <>
              <div className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <button
                    className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                    //   onClick={handleBackClick}
                  >
                    <span className="font-medium text-gray-900">About</span>
                  </button>
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <button
                    className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                    //   onClick={handleBackClick}
                  >
                    <span className="font-medium text-gray-900">Contact</span>
                  </button>
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <div
        id="drawer-right-example"
        className=" bg-white w-80 dark:bg-gray-800"
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          {menuHistory.length > 0 && (
            <button onClick={handleBackClick} className="mb-4">
              Back
            </button>
          )}

          <Menu items={menuItems} onItemClick={handleMenuItemClick} />

          {/* <ul className="space-y-2">
          {LINK.map((item) => {
            return (<li key={item.name} >
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">{item.name}</span>
              </a>
            </li>);
          })}
          </ul> */}
      {/*
        </div>
      </div>
     */}
    </Drawer>
  );
};

export default SideBar;
