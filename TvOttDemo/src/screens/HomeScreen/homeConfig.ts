export const GAP = 10;
export const CARD_W = 210;
export const THUMB_H = Math.round(CARD_W * 1.4);
export const HEADER_SIDE_W = 56;
export const FOCUS_SCALE = 1.05;

const CARD_H_EST = THUMB_H + 60;
export const FOCUS_PAD_X = Math.ceil((CARD_W * (FOCUS_SCALE - 1)) / 2);
export const FOCUS_PAD_Y = Math.ceil((CARD_H_EST * (FOCUS_SCALE - 1)) / 2);
export const CELL_W = CARD_W + FOCUS_PAD_X * 2;

export const MIN_IMG = { w: 120, h: 120 };
