import { ReactNode } from "react";

export interface QuestionCategory {
    title: string;
    questions: Question[];
}

export interface Question {
    title: string;
    filling: ReactNode;
}