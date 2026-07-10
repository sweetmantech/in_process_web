import { baseSepolia, base } from "viem/chains";
import { Address } from "viem";

export const IS_TESTNET = process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? true : false;

export const IN_PROCESS_API = `${IS_TESTNET ? "https://in-process-api-git-test-sweetmantechs-projects.vercel.app" : "https://api.inprocess.world"}/api`;

// Wagmi
export const EXPLORER_URL = IS_TESTNET ? "https://sepolia.basescan.org" : "https://basescan.org";
export const CHAIN = IS_TESTNET ? baseSepolia : base;
export const CHAIN_ID = CHAIN.id;
// Zora
export const REFERRAL_RECIPIENT = "0x749B7b7A6944d72266Be9500FC8C221B6A7554Ce";
// IPFS
const ONE_MB = 1024 * 1024;
export const MAX_FILE_SIZE = 222 * ONE_MB;
// TELEGRAM
export const TELEGRAM_MAX_FILE_SIZE = 50 * 1024 * 1024;

export const PERMISSION_BIT_ADMIN = 2;

export const USDC_ADDRESS: Record<number, Address> = {
  [base.id]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  [baseSepolia.id]: "0x14196F08a4Fa0B66B7331bC40dd6bCd8A1dEeA9F",
} as const;

export const SITE_ORIGINAL_URL = IS_TESTNET
  ? "https://in-process-git-test-sweetmantechs-projects.vercel.app"
  : "https://inprocess.world";

export const TIMLINE_STEP_OFFSET = 12;
export const Z_BEHIND_PRIVY = 999999;

export const PDFJS_DIST_VERSION = "2.16.105";

/**
 * Comprehensive list of event handler attributes to forbid
 * Includes all on* event handlers to prevent XSS via event handlers
 * Especially important: animation/transition handlers that can enable CSS-based XSS
 */
export const FORBIDDEN_EVENT_HANDLERS = [
  // Mouse events
  "onclick",
  "ondblclick",
  "onmousedown",
  "onmouseup",
  "onmouseover",
  "onmousemove",
  "onmouseout",
  "onmouseenter",
  "onmouseleave",
  "oncontextmenu",
  "onauxclick",
  // Keyboard events
  "onkeydown",
  "onkeyup",
  "onkeypress",
  // Form events
  "onchange",
  "oninput",
  "onsubmit",
  "onreset",
  "onselect",
  "oninvalid",
  "onsearch",
  // Focus events
  "onfocus",
  "onblur",
  "onfocusin",
  "onfocusout",
  // Load/error events
  "onload",
  "onerror",
  "onabort",
  "onbeforeunload",
  "onunload",
  // Media events
  "onplay",
  "onpause",
  "onplaying",
  "onended",
  "onseeked",
  "onseeking",
  "onstalled",
  "onsuspend",
  "onwaiting",
  "onvolumechange",
  "ontimeupdate",
  "onratechange",
  "ondurationchange",
  "oncanplay",
  "oncanplaythrough",
  "onloadeddata",
  "onloadedmetadata",
  "onloadstart",
  "onprogress",
  // CSS Animation/Transition events (critical for CSS-based XSS)
  "onanimationstart",
  "onanimationend",
  "onanimationiteration",
  "onanimationcancel",
  "ontransitionstart",
  "ontransitionend",
  "ontransitionrun",
  "ontransitioncancel",
  // Touch events
  "ontouchstart",
  "ontouchend",
  "ontouchmove",
  "ontouchcancel",
  // Pointer events
  "onpointerdown",
  "onpointerup",
  "onpointermove",
  "onpointerover",
  "onpointerout",
  "onpointerenter",
  "onpointerleave",
  "onpointercancel",
  "ongotpointercapture",
  "onlostpointercapture",
  // Drag and drop events
  "ondrag",
  "ondragend",
  "ondragenter",
  "ondragleave",
  "ondragover",
  "ondragstart",
  "ondrop",
  // Clipboard events
  "oncopy",
  "oncut",
  "onpaste",
  // Selection events
  "onselectstart",
  "onselectionchange",
  // Scroll events
  "onscroll",
  "onscrollend",
  // Wheel events
  "onwheel",
  // Window events
  "onresize",
  "onhashchange",
  "onpopstate",
  "onpageshow",
  "onpagehide",
  "onbeforeprint",
  "onafterprint",
  "onlanguagechange",
  "onmessage",
  "onmessageerror",
  "onoffline",
  "ononline",
  "onrejectionhandled",
  "onunhandledrejection",
  "onstorage",
  "onvisibilitychange",
  // Other events
  "ontoggle",
  "onshow",
  "onsort",
  "onwebkitfullscreenchange",
  "onwebkitfullscreenerror",
];
