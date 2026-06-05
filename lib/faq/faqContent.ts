export interface FaqItem {
  question: string;
  answer: string;
}

export const faqSections = {
  main: [
    {
      question: "what is in process?",
      answer:
        "<strong>in process</strong> is a Web3-native platform for documenting and monetizing the <strong>creative journey</strong>—not just the final product. Artists, builders, and creatives can upload their work-in-progress (writing, music, visuals, links, embeds or video) and mint it onchain to a collective timeline.\n\n\nIt's a <strong>living archive</strong> of artistic evolution, where your community, fans and patrons can collect, comment, and support work as it unfolds.",
    },
    {
      question: "what makes in process different?",
      answer:
        "    • Focus on process, not polish\n    • Permanent, onchain documentation\n    • Monetization of in-progress work\n    • Decentralized, artist-owned timelines\n    • Support for both Web2 and Web3 users\n    • Cross-platform embedding of content (onchain + offchain)",
    },
    {
      question: "what kind of content can i post?",
      answer:
        "You can upload any part of your creative process:\n    • Journals, notes, poetry\n    • Demos, drafts, audio clips\n    • Sketches, moodboards, visuals\n    • Behind-the-scenes footage, vlogs\n    • External links + embeds (YouTube, NFTs, Instagram, Google Docs, etc.)",
    },
    {
      question: "can i date my posts?",
      answer:
        "Yes! Every post on In Process can be:\n    • <strong>Backdated</strong> (e.g., a sketch from 2021)\n    • <strong>Future-dated</strong> (e.g., a concept for a 2026 project)\n    • <strong>Time-stamped</strong> to the present\n\nThis makes your timeline <strong>a true reflection of your creative journey</strong>, no matter the order of when things are uploaded.",
    },
    {
      question: "what is the collective timeline?",
      answer:
        "The Collective Timeline is a shared feed where everyone's onchain creative process lives side-by-side. It's a decentralized, living archive of artistic culture across disciplines and styles.\n\nYour personal timeline feeds into the Collective Timeline (unless you choose to hide posts).",
    },
  ],
  additional: [
    {
      question: "how does monetization work?",
      answer:
        "    • Set a price per post (in crypto or USD)\n    • Collectors pay to own and support your process\n    • Proceeds go directly to your wallet",
    },
    {
      question: "do i need to know web3 to use this?",
      answer:
        "Nope. In Process is built with <strong>Privy onboarding</strong>, which means:\n\n    • You can log in using your email\n    • You don't need a wallet to get started\n    • You'll gain access to onchain features without friction\n\nIt's designed for <strong>both web2 and web3 creatives</strong>.",
    },
    {
      question: "who is in process for?",
      answer:
        "    • Artists (music, visual, literary, film)\n    • Builders and developers\n    • Web2 creatives transitioning into web3\n    • Fans, patrons and explorers who want to support artistic journeys and culture",
    },
    {
      question: "can i embed or link off-platform content?",
      answer:
        "Yes! In Process supports:\n    • Onchain content (NFTs, token links, DAOs)\n    • Offchain content (YouTube, Substack, Instagram, Google Docs)\n\nThis makes your timeline a hub for everything you create, no matter where it lives.",
    },
  ],
  telegram: [
    {
      question: "can i post moments via telegram?",
      answer:
        'Yes! In Process has a <strong>Telegram client</strong> — <a href="https://t.me/in_process_chat_bot" target="_blank" rel="noopener noreferrer">@in_process_chat_bot</a> — that lets you create moments directly from Telegram.\n\n<strong>Getting started:</strong>\n    1. Go to <a href="/manage/account">your account page</a> and set your <strong>Telegram username</strong>\n    2. Open Telegram and start a conversation with <a href="https://t.me/in_process_chat_bot" target="_blank" rel="noopener noreferrer">@in_process_chat_bot</a>\n    3. Send any photo, video, audio, or text — it will be minted as a moment on your timeline\n\n<strong>Commands:</strong>\n    • <strong>/start</strong> – verify your Telegram and connect it to your In Process account\n    • <strong>/collections</strong> – choose which collection your next moments will be minted into\n    • <strong>/remind</strong> – toggle nudges on/off; when on, the bot will remind you if you haven\'t posted in a while (every day, every 3 days, or every week)\n    • <strong>/notify</strong> – toggle airdrop notifications on/off; get alerted when someone sends your wallet an airdrop\n    • <strong>/me</strong> – view the email address linked to your In Process account',
    },
  ],
  final: [
    {
      question: "what tech powers in process?",
      answer:
        "    • <strong>base</strong> – fast, affordable l2 blockchain\n    • <strong>zora protocol</strong> – for minting and managing posts\n    • <strong>next.js & vercel</strong> – smooth mobile-first ux\n    • <strong>privy</strong> – web2 login with web3 access\n    • <strong>crypto + card payments</strong> – for collectors everywhere",
    },
  ],
  join: [
    {
      question: "how do i join?",
      answer: "",
    },
  ],
  community: [
    {
      question: "looking for community?",
      answer: "connect with us on social\n     • x\n\n     • farcaster",
    },
  ],
  wallet: [
    {
      question: "how do i connect or disconnect an external wallet?",
      answer:
        'You can connect or disconnect an external wallet to your account at any time from the <a href="/manage/account">account page</a>.\n\n<strong>To connect:</strong>\n    1. Click <strong>"Connect wallet"</strong>\n    2. Choose your wallet provider from the list\n    3. Approve the connection in your wallet extension or app\n\n<strong>To disconnect:</strong>\n    1. Find the wallet under the <strong>linked wallets</strong> section\n    2. Click <strong>"Disconnect"</strong> next to the wallet address\n    3. Confirm the action\n\n<strong>Note:</strong> Disconnecting a wallet does not delete your In Process account or any of your onchain content. It only removes the link between that wallet and your account.',
    },
  ],
};
