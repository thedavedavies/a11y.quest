import { escapeHtml } from "../../lib/escape";
import { icon } from "../../lib/icon";
import styles from "./TopicTag.module.css";

const TOPIC_LABELS: Record<string, string> = {
  "semantic-html": "Semantic HTML",
  aria: "ARIA",
  contrast: "Colour contrast",
  images: "Images",
  keyboard: "Keyboard",
  forms: "Forms",
  "screen-readers": "Screen readers",
  "name-role-value": "Name, role, value",
  vpat: "VPAT",
  atag: "ATAG",
  sdlc: "SDLC",
  wcag2ict: "WCAG2ICT",
  "en-301-549": "EN 301 549",
  "pause-stop-hide": "Pause, stop, hide",
};

function humanize(slug: string): string {
  if (TOPIC_LABELS[slug]) return TOPIC_LABELS[slug];
  const words = slug.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function topicTag(topic: string): string {
  return (
    `<p class="${styles.tag}">` +
    `<span class="${styles.icon}">${icon("topic", 15)}</span>` +
    `<span class="visually-hidden">Topic: </span>` +
    `<span>${escapeHtml(humanize(topic))}</span>` +
    `</p>`
  );
}

export { humanize };
