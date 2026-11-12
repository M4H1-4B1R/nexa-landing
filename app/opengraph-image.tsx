import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "The Nexagents pixel N logo on a black background";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PIXELS = ["10001", "11001", "10101", "10011", "10001"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          background: "#000000",
          color: "#f2f3ff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {PIXELS.map((row, y) => (
            <div key={y} style={{ display: "flex" }}>
              {row.split("").map((cell, x) => (
                <div key={x} style={{ width: 40, height: 40, background: cell === "1" ? "#818cf8" : "#000000" }} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 96, letterSpacing: -4 }}>Nexagents</div>
          <div style={{ fontSize: 32, color: "#a4a9d2" }}>People and AI agents, working side by side</div>
        </div>
      </div>
    ),
    size,
  );
}
