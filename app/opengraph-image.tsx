import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "linear-gradient(135deg, #2c1e26, #3d2833 55%, #1c1116)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 170,
            height: 170,
            background: "#d7ae82",
            borderRadius: "50% 50% 50% 0%",
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 110,
            left: 240,
            width: 56,
            height: 56,
            background: "#e6b3ae",
            opacity: 0.6,
            borderRadius: "50% 50% 50% 0%",
            transform: "rotate(30deg)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 100,
            right: 260,
            width: 76,
            height: 76,
            background: "#e6b3ae",
            opacity: 0.5,
            borderRadius: "50% 50% 50% 0%",
            transform: "rotate(-20deg)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 220,
            right: 160,
            width: 34,
            height: 34,
            background: "#ecd3ab",
            opacity: 0.7,
            borderRadius: "50% 50% 50% 0%",
            transform: "rotate(60deg)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
