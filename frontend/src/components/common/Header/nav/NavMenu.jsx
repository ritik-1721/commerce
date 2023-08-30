import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLinks } from "@/store/thunks/navLinkThunk";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import SubNavLink from "./SubNavLink";
import WebNavLinks from "./WebNavLinks";
import NavMenuSkeleton from "@/components/skeleton/NavMenuSkeleton";

const NavMenu = () => {
  const links = useSelector((state) => state.navLink.links);
  const isLoading = useSelector((state) => state.navLink.isLoading);
  const isError = useSelector((state) => state.navLink.isError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

  if (isLoading || isError) {
    return <NavMenuSkeleton itemCount={5} />;
  }

  return (
    <NavigationMenu.Root className="relative z-[1]">
      <NavigationMenu.List className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
        <SubNavLink categoryLinks={links} />
        <WebNavLinks />
      </NavigationMenu.List>
      <div className="z-[1] perspective-[2000px] absolute top-full left-0 flex justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

export default NavMenu;
