export interface FaqItem {
  question: string;
  answer: string;
  /** Optional hash target for deep links, e.g. /faq#file-types */
  id?: string;
}

export const faqSections = {
  main: [
    {
      id: "what-is-in-process",
      question: "What is in process?",
      answer:
        "<strong>in process</strong> is a Web3-native platform for documenting and monetizing the <strong>creative journey</strong>—not just the final product. Artists, builders, and creatives can upload their work-in-progress (writing, music, visuals, links, embeds or video) and mint it onchain to a collective timeline.\n\n\nIt's a <strong>living archive</strong> of artistic evolution, where your community, fans and patrons can collect, comment, and support work as it unfolds.",
    },
    {
      id: "what-makes-in-process-different",
      question: "What makes in process different?",
      answer:
        "    • Focus on process, not polish\n    • Permanent, onchain documentation\n    • Monetization of in-progress work\n    • Decentralized, artist-owned timelines\n    • Support for both Web2 and Web3 users\n    • Cross-platform embedding of content (onchain + offchain)",
    },
    {
      id: "content-types",
      question: "What kind of content can I post?",
      answer:
        "You can upload any part of your creative process:\n    • Journals, notes, poetry\n    • Demos, drafts, audio clips\n    • Sketches, moodboards, visuals\n    • Behind-the-scenes footage, vlogs\n    • External links + embeds (YouTube, NFTs, Instagram, Google Docs, etc.)",
    },
    {
      id: "file-types",
      question: "What file types and upload limits are supported?",
      answer:
        '<strong>On the website</strong> (<a href="/create">/create</a>), you can upload:\n    • <strong>Images</strong> — JPG, JPEG, PNG, GIF, WebP, HEIC, and other common image formats\n    • <strong>Video</strong> — MP4, MOV, WebM, and other common video formats\n    • <strong>Audio</strong> — MP3, WAV, M4A, AAC, FLAC, OGG, WMA, and other common audio formats\n    • <strong>PDF</strong>\n    • <strong>3D models</strong> — GLB, GLTF\n\nYou can also create <strong>writing</strong> moments and moments from <strong>links / embeds</strong> (no file upload required).\n\n<strong>Upload size limits:</strong>\n    • <strong>Website:</strong> up to <strong>222MB</strong> per file\n    • <strong>Telegram bot:</strong> up to <strong>20MB</strong> per file (for larger files, use the website)',
    },
    {
      id: "dating-posts",
      question: "Can I date my posts?",
      answer:
        "Yes! Every post on In Process can be:\n    • <strong>Backdated</strong> (e.g., a sketch from 2021)\n    • <strong>Future-dated</strong> (e.g., a concept for a 2026 project)\n    • <strong>Time-stamped</strong> to the present\n\nThis makes your timeline <strong>a true reflection of your creative journey</strong>, no matter the order of when things are uploaded.",
    },
    {
      id: "collective-timeline",
      question: "What is the collective timeline?",
      answer:
        "The Collective Timeline is a shared feed where everyone's onchain creative process lives side-by-side. It's a decentralized, living archive of artistic culture across disciplines and styles.\n\nYour personal timeline feeds into the Collective Timeline (unless you choose to hide posts).",
    },
  ],
  additional: [
    {
      id: "monetization",
      question: "How does monetization work?",
      answer:
        "    • Set a price per post (in crypto or USD)\n    • Collectors pay to own and support your process\n    • Proceeds go directly to your wallet",
    },
    {
      id: "web3-onboarding",
      question: "Do I need to know Web3 to use this?",
      answer:
        "Nope. In Process is built with <strong>Privy onboarding</strong>, which means:\n\n    • You can log in using your email\n    • You don't need a wallet to get started\n    • You'll gain access to onchain features without friction\n\nIt's designed for <strong>both Web2 and Web3 creatives</strong>.",
    },
    {
      id: "who-is-it-for",
      question: "Who is in process for?",
      answer:
        "    • Artists (music, visual, literary, film)\n    • Builders and developers\n    • Web2 creatives transitioning into Web3\n    • Fans, patrons and explorers who want to support artistic journeys and culture",
    },
    {
      id: "embeds-and-links",
      question: "Can I embed or link off-platform content?",
      answer:
        "Yes! In Process supports:\n    • Onchain content (NFTs, token links, DAOs)\n    • Offchain content (YouTube, Substack, Instagram, Google Docs)\n\nThis makes your timeline a hub for everything you create, no matter where it lives.",
    },
  ],
  telegram: [
    {
      id: "telegram",
      question: "Can I post moments via Telegram?",
      answer:
        'Yes! In Process has a <strong>Telegram client</strong> — <a href="https://t.me/in_process_chat_bot" target="_blank" rel="noopener noreferrer">@in_process_chat_bot</a> — that lets you create moments directly from Telegram.\n\n<strong>Getting started:</strong>\n    1. Open Telegram and start a conversation with <a href="https://t.me/in_process_chat_bot" target="_blank" rel="noopener noreferrer">@in_process_chat_bot</a>\n    2. If your Telegram isn\'t connected yet, the bot will ask for the email you use for In Process\n    3. Reply with your email — you\'ll receive a 6-digit verification code\n    4. Reply with the code to confirm it\'s you\n\nIf you already have an In Process account, your Telegram gets connected to it. If you don\'t have one yet, an account is created for you automatically — no need to sign up on the site first.\n\nOnce connected, you can create moments by sending:\n    • <strong>Photo, video, or audio</strong> (with an optional caption) — minted as a media / music moment (files up to <strong>20MB</strong>; for larger uploads use the website)\n    • <strong>YouTube link</strong> — minted as a link moment\n    • <strong>Plain text</strong> — the bot asks <strong>“Is this a text post?”</strong> with <strong>Yes</strong> / <strong>No</strong> buttons. Tap <strong>Yes</strong> to mint it as a text (writing) moment with no media attached; tap <strong>No</strong> to cancel\n\n<strong>Commands:</strong>\n    • <strong>/start</strong> – if your Telegram isn\'t linked yet, starts account connect (asks for your In Process email, then a 6-digit verification code; creates an account if needed). If already connected, shows a welcome confirming you\'re linked and ready to post\n    • <strong>/collections</strong> – choose which collection your next moments will be minted into\n    • <strong>/remind</strong> – toggle posting nudges on/off; when turning on, pick every day / every 3 days / every week\n    • <strong>/notify</strong> – toggle airdrop notifications on/off; get alerted when someone sends your wallet an airdrop\n    • <strong>/me</strong> – view the email address linked to your In Process account\n    • <strong>/help</strong> – show a table of all available commands',
    },
  ],
  final: [
    {
      id: "tech",
      question: "What tech powers in process?",
      answer:
        "    • <strong>Base</strong> – fast, affordable L2 blockchain\n    • <strong>Zora Protocol</strong> – for minting and managing posts\n    • <strong>Next.js & Vercel</strong> – smooth mobile-first UX\n    • <strong>Privy</strong> – Web2 login with Web3 access\n    • <strong>Crypto + card payments</strong> – for collectors everywhere",
    },
  ],
  join: [
    {
      id: "join",
      question: "How do I join?",
      answer: "",
    },
  ],
  community: [
    {
      id: "community",
      question: "Looking for community?",
      answer: "Connect with us on social",
    },
  ],
  wallet: [
    {
      id: "connect-wallet",
      question: "How do I connect or disconnect an external wallet?",
      answer:
        'You can connect or disconnect an external wallet to your account at any time from the <a href="/manage/account">account page</a>.\n\n<strong>To connect:</strong>\n    1. Click <strong>"Connect wallet"</strong>\n    2. Choose your wallet provider from the list\n    3. Approve the connection in your wallet extension or app\n\n<strong>To disconnect:</strong>\n    1. Find the wallet under the <strong>linked wallets</strong> section\n    2. Click <strong>"Disconnect"</strong> next to the wallet address\n    3. Confirm the action\n\n<strong>Note:</strong> Disconnecting a wallet does not delete your In Process account or any of your onchain content. It only removes the link between that wallet and your account.',
    },
    {
      id: "withdraw",
      question: "How do I withdraw from smart wallet?",
      answer:
        'Sales proceeds land in your <strong>In Process smart wallet</strong>. To send funds to an external address:\n\n    1. Go to <a href="/manage/payment">Manage → payment</a>\n    2. Click <strong>Withdraw</strong>\n    3. Choose <strong>USDC</strong> or <strong>ETH</strong>\n    4. Enter a recipient address (or use your linked external wallet if connected)\n    5. Enter an amount — or click <strong>Max</strong> for your full available balance — then confirm\n\nYou can withdraw any positive balance. An external wallet is not required; you can paste any valid <strong>0x</strong> address you control.',
    },
  ],
};

export const allFaqItems: FaqItem[] = Object.values(faqSections).flat();

export const faqItemKey = (item: FaqItem, fallback: string) => item.id ?? fallback;

export const faqSearchFlatText = (item: FaqItem): string =>
  `${item.question} ${item.answer}`.replace(/<[^>]+>/g, " ").toLowerCase();
