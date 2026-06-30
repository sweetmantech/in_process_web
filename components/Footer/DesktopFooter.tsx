import FooterNavLinks from "./FooterNavLinks";
import FooterSocialIcons from "./FooterSocialIcons";
import FooterLogo from "./FooterLogo";

const DesktopFooter = () => {
  return (
    <main className="relative z-[10] mx-auto w-screen overflow-x-hidden px-4 pb-16 md:px-10 md:py-16">
      <div className="flex w-full items-start gap-4">
        <FooterLogo />
        <FooterNavLinks />
        <FooterSocialIcons />
      </div>
    </main>
  );
};

export default DesktopFooter;
