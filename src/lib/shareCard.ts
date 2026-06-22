import type { RunState } from "./run";
import {
  CARD_H,
  CARD_W,
  cardStats,
  paletteFor,
  TILE_FILL,
  TILE_INK,
  type CardTheme,
  type Palette,
} from "./shareCardData";

export { CARD_H, CARD_W, cardStats, paletteFor, shareSummary } from "./shareCardData";
export type { CardTheme } from "./shareCardData";

const SCALE = 2;

interface CardFonts {
  display: string;
  body: string;
}

const FALLBACK_DISPLAY = '"Bricolage Grotesque", system-ui, sans-serif';
const FALLBACK_BODY = "Inter, system-ui, sans-serif";

function resolveFonts(): CardFonts {
  if (typeof document === "undefined" || !document.documentElement) {
    return { display: FALLBACK_DISPLAY, body: FALLBACK_BODY };
  }
  const root = getComputedStyle(document.documentElement);
  return {
    display: root.getPropertyValue("--font-display").trim() || FALLBACK_DISPLAY,
    body: root.getPropertyValue("--font-body").trim() || FALLBACK_BODY,
  };
}

async function ensureFonts(fonts: CardFonts): Promise<void> {
  const set = (typeof document !== "undefined" && document.fonts) || null;
  if (!set?.load) return;
  const specs = [
    `800 160px ${fonts.display}`,
    `800 56px ${fonts.display}`,
    `800 46px ${fonts.display}`,
    `700 24px ${fonts.body}`,
    `600 26px ${fonts.body}`,
  ];
  try {
    await Promise.race([
      Promise.allSettled(specs.map((s) => set.load(s))),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]);
  } catch {}
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawSparkTile(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
  roundRect(ctx, x, y, size, size, size * 0.28);
  ctx.fillStyle = TILE_FILL;
  ctx.fill();
  ctx.lineWidth = size * 0.09;
  ctx.strokeStyle = TILE_INK;
  ctx.stroke();

  const star = new Path2D("M22 0l6 14 16 6-16 6-6 14-6-14-16-6 16-6z");
  ctx.save();
  ctx.translate(x + size * 0.16, y + size * 0.155);
  const s = (size / 64) * 0.72;
  ctx.scale(s, s);
  ctx.fillStyle = TILE_INK;
  ctx.fill(star);
  ctx.restore();
}

function drawFlame(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  colour: string,
): void {
  const flame = new Path2D(
    "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  );
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = colour;
  ctx.lineWidth = 2.25;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke(flame);
  ctx.restore();
}

function drawCard(ctx: CanvasRenderingContext2D, run: RunState, p: Palette, fonts: CardFonts): void {
  const s = cardStats(run);

  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  const px = 44;
  const py = 44;
  const pw = CARD_W - px * 2;
  const ph = CARD_H - py * 2;
  const radius = 32;
  roundRect(ctx, px + 14, py + 16, pw, ph, radius);
  ctx.fillStyle = p.shadow;
  ctx.fill();
  roundRect(ctx, px, py, pw, ph, radius);
  ctx.fillStyle = p.panel;
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = p.line;
  ctx.stroke();

  const cx = px + 56;

  const tile = 66;
  const tileY = py + 52;
  drawSparkTile(ctx, cx, tileY, tile);
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.font = `800 46px ${fonts.display}`;
  const markX = cx + tile + 22;
  const markY = tileY + tile / 2 + 2;
  ctx.fillStyle = p.text;
  ctx.fillText("a11y", markX, markY);
  const a11yW = ctx.measureText("a11y").width;
  ctx.fillStyle = p.dot;
  ctx.fillText(".", markX + a11yW, markY);
  const dotW = ctx.measureText(".").width;
  ctx.fillStyle = p.text;
  ctx.fillText("quest", markX + a11yW + dotW, markY);
  ctx.textBaseline = "alphabetic";

  const heroLabelY = py + 220;
  ctx.font = `700 24px ${fonts.body}`;
  ctx.fillStyle = p.muted;
  ctx.fillText("ACCURACY", cx, heroLabelY);
  ctx.font = `800 160px ${fonts.display}`;
  ctx.fillStyle = p.hero;
  ctx.fillText(s.accuracy, cx - 4, heroLabelY + 150);

  const colX = px + pw - 56;
  const rows: Array<{ label: string; value: string; flame?: boolean }> = [
    { label: "Answered", value: s.answered },
    { label: "Correct", value: s.correct },
    { label: "Best streak", value: s.bestStreak, flame: true },
  ];
  let rowY = py + 150;
  const rowGap = 108;
  ctx.textAlign = "right";
  for (const row of rows) {
    ctx.font = `700 24px ${fonts.body}`;
    ctx.fillStyle = p.muted;
    ctx.fillText(row.label, colX, rowY);
    ctx.font = `800 56px ${fonts.display}`;
    ctx.fillStyle = p.text;
    ctx.fillText(row.value, colX, rowY + 56);
    if (row.flame) {
      const valW = ctx.measureText(row.value).width;
      drawFlame(ctx, colX - valW - 52, rowY + 16, 44, p.flame);
    }
    rowY += rowGap;
  }
  ctx.textAlign = "left";

  ctx.font = `600 26px ${fonts.body}`;
  ctx.fillStyle = p.muted;
  ctx.fillText("Sharpen your accessibility skills at a11y.quest", cx, py + ph - 44);
}

export async function renderShareCard(
  canvas: HTMLCanvasElement,
  run: RunState,
  theme: CardTheme,
): Promise<void> {
  canvas.width = CARD_W * SCALE;
  canvas.height = CARD_H * SCALE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const fonts = resolveFonts();
  await ensureFonts(fonts);
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  drawCard(ctx, run, paletteFor(theme), fonts);
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    try {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    } catch {
      resolve(null);
    }
  });
}
