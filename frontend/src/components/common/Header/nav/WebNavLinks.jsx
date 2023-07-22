import Link from "next/link";
import { BASE_URL } from "@/utils/constants";

const WebNavLink = [
  { name: "About", href: "about" },
  { name: "Contact", href: "contact" },
];

const WebNavLinks = () => {
  return WebNavLink.map((item, index) => (
    <li key={index}>
      <Link
        href={BASE_URL + item.href}
        className="block py-2 pl-3 pr-4 text-balck rounded hover: hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-500 md:p-0"
      >
        {item.name}
      </Link>
    </li>
  ));
};

export default WebNavLinks;
