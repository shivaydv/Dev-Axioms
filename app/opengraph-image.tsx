import { LogoIcon } from "@/components/Logo";
import { ImageResponse } from "next/og";

export const alt = "Open Graph Image for Dev Axioms Web Dev";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const primaryColor = "#3b82f6"; // Blue

  return new ImageResponse(
    (
      <div 
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
      }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            position: "relative",
            background: `linear-gradient(135deg, ${primaryColor}08 0%, ${primaryColor}15 50%, white 100%)`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              position: "relative",
              textAlign: "left",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "40px 40px 20px 40px",
            }}
          >
            <div
              style={{
                fontSize: "60px",
                fontWeight: "bolder",
                color: "black",
                textAlign: "left",
                lineHeight: "1.2",
                margin: "0 0 20px 0",
                maxHeight: "300px",
                overflow: "hidden",
              }}
            >
              Ace Your Dev Interviews
            </div>

            <p
              style={{
                fontSize: "28px",
                color: "rgba(0,0,0,0.7)",
                textAlign: "left",
                lineHeight: "1.4",
                margin: "0 0 auto 0",
                maxHeight: "140px",
                overflow: "hidden",
              }}
            >
              Dev Axioms is your all-in-one platform for interview preparation,
              offering comprehensive theory and playgrounds to practice.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "auto",
                marginBottom: "4px",
                background: `linear-gradient(90deg, transparent 0%, ${primaryColor}08 50%, transparent 100%)`,
                padding: "16px 20px",
                borderRadius: "12px",
                border: `1px solid ${primaryColor}15`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <LogoIcon width={48} height={48} />
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  Dev Axioms
                </span>
              </div>

              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#374151",
                }}
              >
                ~ By Shiva Yadav
              </span>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: "60px",
              left: 0,
              right: 0,
              height: "1px",
              background: "rgba(0,0,0,0.3)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: 0,
              right: 0,
              height: "1px",
              background: "rgba(0,0,0,0.3)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "60px",
              width: "1px",
              background: "rgba(0,0,0,0.3)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: "60px",
              width: "1px",
              background: "rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
