import FeedbackModal from "@/components/Footer/FeedbackModal";

const HeaderNavLinks = () => (
  <div className="flex items-center gap-5 font-archivo-medium text-[13.5px] text-[#6B6456]">
    <button
      type="button"
      className="transition-colors hover:text-grey-moss-900"
      onClick={() => window.open("/manifesto", "_blank")}
    >
      Manifesto
    </button>
    <button
      type="button"
      className="transition-colors hover:text-grey-moss-900"
      onClick={() => window.open("/faq", "_blank")}
    >
      FAQ
    </button>
    <FeedbackModal />
  </div>
);

export default HeaderNavLinks;
