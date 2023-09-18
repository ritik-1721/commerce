import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useSelector } from "react-redux";
import { LogOutIcon, PersonProfileIcon, SettingIcon } from "@/components/icons";
import Avatar from "@/components/ui/Avatar/Avatar";

function ProfileDropdownTrigger({ userDetails }) {
  return (
    <DropdownMenu.Trigger asChild>
      <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        className=" relative inline-flex items-center justify-center p-2 h-6 w-6 text-sm mt-2 border-2 border-gray-950 hover:border-gray-500 text-gray-800 bg-gray-100  rounded-full hover:text-gray-500 focus:outline-none dark:text-gray-400 hover:scale-105 overflow-hidden"
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <Avatar name={`${userDetails?.fname} ${userDetails?.lname}`} />
      </button>
    </DropdownMenu.Trigger>
  );
}

function ProfileDropdownContent({ userDetails }) {
  return (
    <DropdownMenu.Content
      className="z-[1] min-w-[220px] bg-slate-50 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade m-3"
      sideOffset={5}
    >
      
      <Link href="/profile">
      <DropdownMenu.Item className="group font-medium leading-none text-balck rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none transform transition-colors duration-200 border-r-4 border-transparent hover:font-medium hover:text-gray-500 hover:border-slate-300">
        <div className="mr-2">
          <PersonProfileIcon className="w-4 h-4" />
        </div>
        Hello&apos; {userDetails?.fname}
      </DropdownMenu.Item>
      </Link>
      <DropdownMenu.Separator className="h-[1px] bg-slate-400 m-[5px]" />
      <Link href="/orders">
        <DropdownMenu.Item className="group font-small leading-none text-balck rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none transform transition-colors duration-200 border-r-4 border-transparent hover:font-medium hover:text-gray-500 hover:border-slate-300">
         Orders
        </DropdownMenu.Item>
      </Link>
      <Link href="/wishlist">
        <DropdownMenu.Item className="group font-small leading-none text-balck rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none transform transition-colors duration-200 border-r-4 border-transparent hover:font-medium hover:text-gray-500 hover:border-slate-300">
          Wishlist
        </DropdownMenu.Item>
      </Link>
      <Link href="/contact">
        <DropdownMenu.Item className="group font-small leading-none text-balck rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none transform transition-colors duration-200 border-r-4 border-transparent hover:font-medium hover:text-gray-500 hover:border-slate-300">
          Contact Us
        </DropdownMenu.Item>
      </Link>
      <DropdownMenu.Separator className="h-[1px] bg-slate-400 m-[5px]" />
      <Link href="/edit">
        <DropdownMenu.Item className="group font-small leading-none text-balck rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none transform transition-colors duration-200 border-r-4 border-transparent hover:font-medium hover:text-gray-500 hover:border-slate-300">
          <div className="mr-2">
            <SettingIcon className="w-4 h-4" />
          </div>
          Edit Profile
        </DropdownMenu.Item>
      </Link>
      <Link href="/logout">
        <DropdownMenu.Item className="group font-small leading-none text-balck rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none transform transition-colors duration-200 border-r-4 border-transparent hover:font-medium hover:text-red-500 hover:border-red-300">
          <div className="mr-2">
            <LogOutIcon className="w-4 h-4" />
          </div>{" "}
          Logout
        </DropdownMenu.Item>
      </Link>
      <DropdownMenu.Arrow className="fill-white" />
    </DropdownMenu.Content>
  );
}

export default function ProfileDropdownMenu() {
  const userDetails = useSelector((state) => state.auth.userDetails);

  return (
    <DropdownMenu.Root>
      <ProfileDropdownTrigger userDetails={userDetails} />
      <DropdownMenu.Portal>
        <ProfileDropdownContent userDetails={userDetails} />
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
