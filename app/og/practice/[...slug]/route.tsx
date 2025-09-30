import {
  getQuestionBySlug,
  getAllQuestions,
} from "@/server/functions/questions";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { truncateText } from "@/utils/helpers";
import { LogoIcon } from "@/components/global/Logo";

const size = {
  width: 1200,
  height: 630,
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;

  // Remove 'image.png' from the end of the slug array
  const actualSlug = slug.slice(0, -1).join("/");

  const question = await getQuestionBySlug(actualSlug);

  if (!question) notFound();

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "#22c55e"; // Green
      case "Medium":
        return "#f59e0b"; // Orange
      case "Hard":
        return "#ef4444"; // Red
      default:
        return "#6b7280"; // Gray
    }
  };

  const difficultyColor = getDifficultyColor(question.difficulty);

  try {
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
              background: `linear-gradient(135deg, ${difficultyColor}08 0%, ${difficultyColor}15 50%, white 100%)`,
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
              {/* Header with badges */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                {/* <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#7c3aed",
                    background:
                      "linear-gradient(135deg, #7c3aed20 0%, #7c3aed10 100%)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid #7c3aed30",
                    boxShadow: "0 2px 8px #7c3aed20",
                  }}
                >
                  Practice Challenge
                </span> */}

                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: difficultyColor,
                    background: `linear-gradient(135deg, ${difficultyColor}20 0%, ${difficultyColor}10 100%)`,
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: `1px solid ${difficultyColor}30`,
                  }}
                >
                  {question.difficulty}
                </span>

                {question.timeLimit && (
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#6b7280",
                      background:
                        "linear-gradient(135deg, #6b728020 0%, #6b728010 100%)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "1px solid #6b728030",
                    }}
                  >
                    {question.timeLimit} min
                  </span>
                )}
              </div>

              {/* Question Title */}
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
                {truncateText(question.title, 60)}
              </h1>

              {/* Tags */}
              {question.tags && question.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {question.tags.slice(0, 4).map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#374151",
                        background:
                          "linear-gradient(135deg, #f3f4f620 0%, #f3f4f610 100%)",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                  {question.tags.length > 4 && (
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#6b7280",
                        padding: "4px 10px",
                      }}
                    >
                      +{question.tags.length - 4} more
                    </span>
                  )}
                </div>
              )}


              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "auto",
                  marginBottom: "4px",
                  background: `linear-gradient(90deg, transparent 0%, ${difficultyColor}08 50%, transparent 100%)`,
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: `1px solid ${difficultyColor}15`,
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

            {/* Border decorations */}
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
      { ...size },
    );
  } catch (error) {
    console.error("Error generating Open Graph image for question:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function generateStaticParams() {
  try {
    const questions = await getAllQuestions();
    return questions.map((question) => ({
      slug: [question.slug, "image.png"],
    }));
  } catch (error) {
    console.error(
      "Error generating static params for question OG images:",
      error,
    );
    return [];
  }
}
