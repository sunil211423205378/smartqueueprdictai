// Deterministic pseudo-QR made from a text seed. Purely decorative.
export function QRMock({ text, size = 160 }: { text: string; size?: number }) {
  const n = 21;
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < n * n; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push((h & 1) === 1);
  }
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7 &&
      !((r > br + 1 && r < br + 5) && (c > bc + 1 && c < bc + 5) && !(r === br + 3 && c === bc + 3));
    return inBox(0, 0) || inBox(0, n - 7) || inBox(n - 7, 0);
  };
  const cell = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-xl bg-white p-2">
      {Array.from({ length: n * n }).map((_, i) => {
        const r = Math.floor(i / n), c = i % n;
        const on = isFinder(r, c) ? isFinderOn(r, c, n) : cells[i];
        if (!on) return null;
        return <rect key={i} x={c * cell} y={r * cell} width={cell} height={cell} fill="#0F172A" />;
      })}
    </svg>
  );
}

function isFinderOn(r: number, c: number, n: number): boolean {
  const inBox = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
  const on = (br: number, bc: number) => {
    if (!inBox(br, bc)) return false;
    const rr = r - br, cc = c - bc;
    if (rr === 0 || rr === 6 || cc === 0 || cc === 6) return true;
    if (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4) return true;
    return false;
  };
  return on(0, 0) || on(0, n - 7) || on(n - 7, 0);
}

