import {
  FacebookIcon,
  InstagramIcon,
  GithubIcon,
  TwitterIcon,
  DribbbleIcon,
} from "@/components/icons";

import { cn } from "@/utils/cn";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="grid grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
        <FooterLinksSection
          title="Company"
          links={[
            { label: "About", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Brand Center", href: "#" },
            { label: "Blog", href: "#" },
          ]}
        />
        <FooterLinksSection
          title="Help center"
          links={[
            { label: "Discord Server", href: "#" },
            { label: "Twitter", href: "#" },
            { label: "Facebook", href: "#" },
            { label: "Contact Us", href: "#" },
          ]}
        />
        <FooterLinksSection
          title="Legal"
          links={[
            { label: "Privacy Policy", href: "#" },
            { label: "Licensing", href: "#" },
            { label: "Terms & Conditions", href: "#" },
          ]}
        />
        <FooterLinksSection
          title="Download"
          links={[
            { label: "iOS", href: "#" },
            { label: "Android", href: "#" },
            { label: "Windows", href: "#" },
            { label: "MacOS", href: "#" },
          ]}
        />
      </div>
      <FooterBottomSection />
    </footer>
  );
};

const FooterLinksSection = ({ title, links }) => {
  return (
    <div
    // className="mb-6 md:mb-0 md:w-1/4"
    >
      <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase">
        {title}
      </h2>

      <ul className="text-gray-500">
        {links.map((link) => (
          <li className="mb-4" key={link.label}>
            <a href={link.href} className="hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FooterBottomSection = () => {
  return (
    <div className="px-4 py-6 bg-gray-100  md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500  sm:text-center">
        © 2023 The Sassy Babe By HV ™ / Powered by{" "}
        <a
          href="https://synques.in/"
          className="hover:text-red-600 hover:underline"
        >
          SynQues
        </a>
        .
      </span>
      <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
        {renderSocialLink(
          "#",
          <FacebookIcon />,
          "Facebook page",
          "hover:text-blue-800"
        )}
        {renderSocialLink(
          "#",
          <InstagramIcon />,
          "Instagram page",
          "hover:text-rose-500"
        )}
        {renderSocialLink(
          "#",
          <TwitterIcon />,
          "Twitter page",
          "hover:text-sky-500"
        )}
        {renderSocialLink(
          "#",
          <GithubIcon />,
          "GitHub account",
          "hover:text-gray-900"
        )}
        {renderSocialLink(
          "#",
          <DribbbleIcon />,
          "Dribbble account",
          "hover:text-rose-500"
        )}
      </div>
    </div>
  );
};

const renderSocialLink = (href, icon, label, hoverColor) => {
  return (
    <SocialLink href={href} icon={icon} label={label} hoverColor={hoverColor} />
  );
};

const SocialLink = ({ href, icon, label, hoverColor }) => {
  return (
    <a
      href={href}
      className={cn("text-gray-400", hoverColor && `${hoverColor}`)}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </a>
  );
};

export default Footer;
