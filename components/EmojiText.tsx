import twemoji from "@twemoji/api";

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

type EmojiTextProps = {
  text: string;
  className?: string;
};

/** Renders plain text with Twemoji SVGs so ZWJ sequences (e.g. 🙂‍↔️) work across browsers. */
export function EmojiText({ text, className }: EmojiTextProps) {
  const html = twemoji.parse(escapeHtml(text), {
    folder: "svg",
    ext: ".svg",
    className: "emoji inline h-[1.15em] w-[1.15em] align-[-0.15em]",
  });

  return <p className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
