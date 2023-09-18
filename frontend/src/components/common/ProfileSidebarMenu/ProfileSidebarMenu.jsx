import Link from "next/link";

import React from "react";

const menuConfig = [
  {
    sectionTitle: "ACCOUNT",
    items: [
      { text: "Profile", link: "/profile", active: true },
      { text: "Edit", link: "/edit", active: false },
      { text: "Orders", link: "/orders", active: false },
      { text: "Address", link: "/address", active: false },
      { text: "Change Password", link: "/change-password", active: false },
    ],
  },
  {
    sectionTitle: "LEGAL",
    items: [
      {
        text: "Terms and Conditions",
        link: "/terms-and-conditions",
        active: false,
      },
      { text: "Licensing", link: "/licensing", active: false },
      { text: "Privacy Policy", link: "/privacy-policy", active: false },
      { text: "Log Out", link: "/logout", active: false },
    ],
  },
];

export default function ProfileSidebarMenu({ activeLink }) {
  return (
    <aside className="w-72 bg-[#ffffff] min-h-full h-screen flex flex-col border-r-2 border-gray-300 items-center pt-5 pb-2 space-y-7">
      {menuConfig.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
        >
          <div className="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase">
            {section.sectionTitle}
          </div>

          {section.items.map((item, itemIndex) => (
            <Link
              key={itemIndex}
              href={item.link}
              className="w-full flex items-center gap-x-1.5 group select-none"
            >
              <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                <div
                  className={`absolute top-0 left-0 w-full h-[102%] ${
                    item.link === activeLink ? "" : "translate-y-full"
                  } bg-green-200 transition-all duration-300`}
                ></div>
              </div>
              <div
                className={`group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 text-sm ${
                  item.link === activeLink ? "text-green-200" : ""
                }`}
              >
                <span className="font-QuicksandMedium">{item.text}</span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
