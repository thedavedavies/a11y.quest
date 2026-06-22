export function lockScroll(): () => void {
  const rootEl = document.documentElement;
  const prevOverflow = rootEl.style.overflow;
  const prevPadding = rootEl.style.paddingRight;
  const scrollbar = window.innerWidth - rootEl.clientWidth;
  rootEl.style.overflow = "hidden";
  if (scrollbar > 0) rootEl.style.paddingRight = `${scrollbar}px`;
  return () => {
    rootEl.style.overflow = prevOverflow;
    rootEl.style.paddingRight = prevPadding;
  };
}
