import { webdev, web3, blog } from "@/lib/source"; // Import both sources
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { truncateText } from "@/lib/truncate";
import { LogoIcon } from "@/components/Logo";

const size = {
  width: 1200,
  height: 630,
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ section: string; slug: string[] }> }
) {
  const { section, slug } = await params;

  // Remove 'image.png' from the end of the slug array
  const actualSlug = slug.slice(0, -1);
  let page;
  let siteName;
  let primaryColor;

  // Determine which source to use based on section
  switch (section) {
    case "web-dev":
      page = webdev.getPage(actualSlug);
      siteName = "Web Dev";
      primaryColor = "#3b82f6"; // Blue
      break;
    case "web3":
      page = web3.getPage(actualSlug);
      siteName = "Web 3";
      primaryColor = "#8b5cf6"; // Purple
      break;
    case "blog":
      page = blog.getPage(actualSlug);
      siteName = "Blog";
      primaryColor = "#8b5cf6"; // Purple
      break;
    default:
      notFound();
  }

  if (!page) notFound();

  const category = actualSlug.length > 1 ? actualSlug[0] : null;

  const getBreadcrumb = () => {
    if (!category) return siteName;
    const categoryDisplay =
      category.charAt(0).toUpperCase() + category.slice(1);
    return siteName + " - " + categoryDisplay;
  };

  const breadcrumb = getBreadcrumb();

  try {
    return new ImageResponse(
      (
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
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: primaryColor,
                  background: `linear-gradient(135deg, ${primaryColor}20 0%, ${primaryColor}10 100%)`,
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: `1px solid ${primaryColor}30`,
                  boxShadow: `0 2px 8px ${primaryColor}20`,
                }}
              >
                {breadcrumb || "Docs"}
              </span>
            </div>

            <h1
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
              {truncateText(page.data.title, 60)}
            </h1>

            {page.data.description && (
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
                {truncateText(page.data.description, 100)}
              </p>
            )}

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
                <LogoIcon width={48} height={48}/>
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
      ),
      { ...size }
    );
  } catch (error) {
    console.error("Error generating Open Graph image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export function generateStaticParams() {
  return [
    // Generate params for web-dev section
    ...webdev.generateParams().map((page) => ({
      section: "web-dev",
      slug: [...page.slug, "image.png"],
    })),
    // Generate params for web3 section
    ...web3.generateParams().map((page) => ({
      section: "web3",
      slug: [...page.slug, "image.png"],
    })),
    // Blog params
    ...blog.generateParams().map((page) => ({
      section: "blog",
      slug: [...page.slug, "image.png"],
    })),
  ];
}
