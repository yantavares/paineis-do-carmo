function cssVar(name: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

function isDarkTheme(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute("data-theme") === "dark";
}

const colors = {
  get mainColor() {
    return isDarkTheme() ? cssVar("--brand-main", "#AA1703") : "#AA1703";
  },
  get darkMain() {
    return isDarkTheme() ? cssVar("--brand-main-dark", "#691c12") : "#691c12";
  },
  get lightMain() {
    return isDarkTheme() ? cssVar("--brand-main-light", "#F75B39") : "#F75B39";
  },
  get gray() {
    return isDarkTheme() ? cssVar("--color-muted", "#666666") : "#666666";
  },
  get black() {
    return "#1c1110";
  },
  get white() {
    // Light: preserve original off-white background used across the app
    // Dark: use true white for readable text when components rely on this color
    return isDarkTheme() ? "#ffffff" : "#f9f8f3";
  },
  get lightGray() {
    return isDarkTheme() ? cssVar("--color-muted", "#707272") : "#707272";
  },
  get yellow() {
    return "#FFD700";
  },
  get red() {
    return "#FF0000";
  },
  get lightYellow() {
    return "#FFD700";
  },
  get lightRed() {
    return "#FF0000";
  },
  get lightBlue() {
    return "#0000FF";
  },
  get green() {
    return "#588157";
  },
  get darkGreen() {
    return "#3A5A40";
  },
  get lightGreen() {
    return "#A3B18A";
  },
};

export default colors;
