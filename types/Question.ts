export interface Question {
  id: string;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  content: string;
  starterCode: any;
  solution: string | null;
  timeLimit: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export type QuestionFormData = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  content: string;
  starterCode: Record<string, any>;
  solution?: string;
  timeLimit: number; // in minutes
};

// Legacy question type for backwards compatibility
export interface LegacyQuestion {
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
