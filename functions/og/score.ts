import { ImageResponse, loadGoogleFont } from "workers-og";
import { decodeRun } from "../../src/lib/shareCode";
import { cardStats, paletteFor, TILE_FILL, TILE_INK, type CardTheme } from "../../src/lib/shareCardData";

const FALLBACK_IMAGE = "/og-image.png";

const SPARK_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
  `<rect x="3" y="3" width="58" height="58" rx="18" fill="${TILE_FILL}" stroke="${TILE_INK}" stroke-width="6"/>` +
  `<g transform="translate(16.6 18) scale(0.7)"><path fill="${TILE_INK}" d="M22 0l6 14 16 6-16 6-6 14-6-14-16-6 16-6z"/></g>` +
  `</svg>`;

const dataUri = (svg: string): string => `data:image/svg+xml;base64,${btoa(svg)}`;

const flameUri = (colour: string): string =>
  dataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" ` +
      `stroke="${colour}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">` +
      `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>` +
      `</svg>`,
  );

const DISPLAY = "Bricolage Grotesque";
const BODY = "Inter";

function statBlock(label: string, value: string, p: ReturnType<typeof paletteFor>, flame?: string): string {
  const valueRow = flame
    ? `<div style="display:flex;align-items:center;gap:12px;">` +
      `<img src="${flame}" width="40" height="40" />` +
      `<span style="display:flex;font-family:'${DISPLAY}';font-size:56px;font-weight:800;color:${p.text};">${value}</span>` +
      `</div>`
    : `<div style="display:flex;font-family:'${DISPLAY}';font-size:56px;font-weight:800;color:${p.text};">${value}</div>`;
  return (
    `<div style="display:flex;flex-direction:column;align-items:flex-end;">` +
    `<div style="display:flex;font-size:24px;font-weight:600;color:${p.muted};">${label}</div>` +
    valueRow +
    `</div>`
  );
}

function cardHtml(token: string, theme: CardTheme): string {
  const run = decodeRun(token)!;
  const s = cardStats(run);
  const p = paletteFor(theme);
  return (
    `<div style="display:flex;width:1200px;height:630px;padding:44px;background:${p.bg};font-family:'${BODY}';">` +
    `<div style="display:flex;flex-direction:column;width:1112px;height:542px;padding:56px;` +
    `background:${p.panel};border:6px solid ${p.line};border-radius:32px;box-shadow:14px 16px 0 ${p.shadow};">` +
    `<div style="display:flex;align-items:center;gap:22px;">` +
    `<img src="${dataUri(SPARK_SVG)}" width="66" height="66" />` +
    `<div style="display:flex;font-family:'${DISPLAY}';font-size:46px;font-weight:800;color:${p.text};">` +
    `a11y<span style="color:${p.dot};">.</span>quest</div>` +
    `</div>` +
    `<div style="display:flex;flex:1;align-items:center;justify-content:space-between;">` +
    `<div style="display:flex;flex-direction:column;">` +
    `<div style="display:flex;font-size:24px;font-weight:600;letter-spacing:2px;color:${p.muted};">ACCURACY</div>` +
    `<div style="display:flex;font-family:'${DISPLAY}';font-size:160px;font-weight:800;line-height:1;color:${p.hero};">${s.accuracy}</div>` +
    `</div>` +
    `<div style="display:flex;flex-direction:column;align-items:flex-end;gap:20px;">` +
    statBlock("Answered", s.answered, p) +
    statBlock("Correct", s.correct, p) +
    statBlock("Best streak", s.bestStreak, p, flameUri(p.flame)) +
    `</div>` +
    `</div>` +
    `<div style="display:flex;font-size:26px;font-weight:600;color:${p.muted};">Sharpen your accessibility skills at a11y.quest</div>` +
    `</div>` +
    `</div>`
  );
}

interface FontSpec {
  name: string;
  data: ArrayBuffer;
  weight: 600 | 800;
  style: "normal";
}

async function brandFonts(): Promise<FontSpec[] | undefined> {
  try {
    const [display, body] = await Promise.all([
      loadGoogleFont({ family: DISPLAY, weight: 800 }),
      loadGoogleFont({ family: BODY, weight: 600 }),
    ]);
    return [
      { name: DISPLAY, data: display, weight: 800, style: "normal" },
      { name: BODY, data: body, weight: 600, style: "normal" },
    ];
  } catch {
    return undefined;
  }
}

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("s") ?? "";
  const theme: CardTheme = url.searchParams.get("t") === "dark" ? "dark" : "light";

  const run = decodeRun(token);
  if (!run || run.answered <= 0) {
    return Response.redirect(new URL(FALLBACK_IMAGE, url.origin).href, 302);
  }

  try {
    const fonts = await brandFonts();
    const image = new ImageResponse(cardHtml(token, theme), {
      width: 1200,
      height: 630,
      format: "png",
      ...(fonts ? { fonts } : {}),
    });
    const headers = new Headers(image.headers);
    headers.set("cache-control", "public, max-age=86400, s-maxage=604800, immutable");
    return new Response(image.body, { status: image.status, headers });
  } catch {
    return Response.redirect(new URL(FALLBACK_IMAGE, url.origin).href, 302);
  }
};
