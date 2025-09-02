export interface Question {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
    tags?: string[];
  category: string;
  timeLimit: number;
  description: string;
  requirements: string[];
  starterCode: Record<string, { code: string; active?: boolean }>;
}
