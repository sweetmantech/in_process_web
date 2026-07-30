/** Mobile footer bar height (px), excluding safe-area inset. */
export const MOBILE_FOOTER_HEIGHT_PX = 74;

/** Center create FAB size (px). Keep in sync with Footer `h-20 w-20`. */
export const MOBILE_CREATE_FAB_SIZE_PX = 80;

/** FAB lift above footer top (`-translate-y-[26%]` on the create button). */
export const MOBILE_CREATE_FAB_LIFT_RATIO = 0.26;

/** How far the create FAB sticks above the footer top edge. */
export const MOBILE_CREATE_FAB_PROTRUSION_PX = Math.round(
  MOBILE_CREATE_FAB_SIZE_PX * MOBILE_CREATE_FAB_LIFT_RATIO
);

/**
 * Horizontal gutter reserved for the centered create FAB in bars stacked
 * directly above the footer (price left, actions right).
 */
export const MOBILE_CREATE_FAB_GUTTER_PX = MOBILE_CREATE_FAB_SIZE_PX + 8;

export const mobileFooterBottomStyle = {
  bottom: `calc(${MOBILE_FOOTER_HEIGHT_PX}px + env(safe-area-inset-bottom, 0px))`,
} as const;
