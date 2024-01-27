import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "linear-gradient(to right, #4299e1, #1d4ed8)",
          color: "white",
          height: "2rem",
          width: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0.375rem",
        }}
      >
        IB
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
