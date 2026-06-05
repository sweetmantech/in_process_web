import FeedbackModal from "./FeedbackModal";

const FooterNavLinks = () => {
  return (
    <div className="text-md flex flex-col items-start space-y-1 text-left font-archivo-bold md:ml-auto md:items-end md:text-right">
      <button type="button" onClick={() => window.open("/manifesto", "_blank")}>
        manifesto
      </button>
      <button type="button" onClick={() => window.open("/faq", "_blank")}>
        faq
      </button>
      <FeedbackModal />
    </div>
  );
};

export default FooterNavLinks;
