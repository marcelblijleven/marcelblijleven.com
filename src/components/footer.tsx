import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "./social-icons";
import ThemeSwitcher from "@/components/theme-switcher";
import { Inconsolata } from "next/font/google";

const font = Inconsolata({
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <footer className={font.className}>
      <div className="mb-4 mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
