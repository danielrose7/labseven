const CANONICAL_COLORS = [
  { key: "black", name: "Black", hex: "000000" },
  { key: "white", name: "White", hex: "FFFFFF" },
  { key: "grey", name: "Grey", hex: "808080" },
  { key: "red", name: "Red", hex: "CC0000" },
  { key: "maroon", name: "Maroon", hex: "800000" },
  { key: "orange", name: "Orange", hex: "FF6600" },
  { key: "yellow", name: "Yellow", hex: "FFD700" },
  { key: "green", name: "Green", hex: "008000" },
  { key: "teal", name: "Teal", hex: "008080" },
  { key: "blue", name: "Blue", hex: "0066CC" },
  { key: "navy", name: "Navy", hex: "001F3F" },
  { key: "purple", name: "Purple", hex: "6B0080" },
  { key: "pink", name: "Pink", hex: "FF69B4" },
  { key: "brown", name: "Brown", hex: "8B4513" },
];

const DELTA_E_THRESHOLD = 35;

function hexToLab(hex) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const toLinear = (c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const rl = toLinear(r);
  const gl = toLinear(g);
  const bl = toLinear(b);

  let x = rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375;
  let y = rl * 0.2126729 + gl * 0.7151522 + bl * 0.072175;
  let z = rl * 0.0193339 + gl * 0.119192 + bl * 0.9503041;

  x /= 0.95047;
  y /= 1.0;
  z /= 1.08883;

  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const L = 116 * f(y) - 16;
  const a = 500 * (f(x) - f(y));
  const bLab = 200 * (f(y) - f(z));

  return [L, a, bLab];
}

function deltaE(lab1, lab2) {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
      (lab1[1] - lab2[1]) ** 2 +
      (lab1[2] - lab2[2]) ** 2
  );
}

// Pre-compute canonical LAB values
const CANONICAL_LABS = new Map(
  CANONICAL_COLORS.map((c) => [c.key, hexToLab(c.hex)])
);

function productMatchesColors(product, colorKeys) {
  if (!product.Styles) return false;
  const targetLabs = colorKeys
    .map((key) => CANONICAL_LABS.get(key))
    .filter(Boolean);
  if (!targetLabs.length) return false;
  return product.Styles.some((style) => {
    if (!style.HtmlColor1) return false;
    const styleLab = hexToLab(style.HtmlColor1);
    return targetLabs.some(
      (tLab) => deltaE(styleLab, tLab) <= DELTA_E_THRESHOLD
    );
  });
}

function findMatchingStyleIndex(product, colorKey) {
  if (!product.Styles) return 0;
  const targetLab = CANONICAL_LABS.get(colorKey);
  if (!targetLab) return 0;
  let bestIndex = 0;
  let bestDelta = Infinity;

  product.Styles.forEach((style, index) => {
    if (!style.HtmlColor1) return;
    const styleLab = hexToLab(style.HtmlColor1);
    const d = deltaE(styleLab, targetLab);
    if (d < bestDelta) {
      bestDelta = d;
      bestIndex = index;
    }
  });

  return bestIndex;
}

module.exports = {
  CANONICAL_COLORS,
  productMatchesColors,
  findMatchingStyleIndex,
};
