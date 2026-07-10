import { Question } from "../../../types/gameshows/Jepoardy";

export function makeQuestion(
  overrides: Partial<Question> & Pick<Question, "id" | "question" | "answer">,
): Question {
  return {
    category: "",
    points: 200,
    type: "TEXT",
    extra: "Active",
    answertype: "TEXT",
    state: "ACTIVE",
    finished: false,
    buzzedPlayers: [],
    ...overrides,
  };
}

// Helpers for specific question types
export const textQ = (
  id: number,
  question: string,
  answer: string,
  points = 200,
  extra: Partial<Question> = {},
) => makeQuestion({ id, type: "TEXT", question, answer, points, ...extra });

export const imageQ = (
  id: number,
  questionImage: string,
  answerImageOrText: string,
  points = 200,
  extra: Partial<Question> = {},
) =>
  makeQuestion({
    id,
    type: "IMAGE",
    question: questionImage,
    answer: answerImageOrText,
    points,
    ...extra,
  });

export const audioQ = (
  id: number,
  audioFile: string,
  answer: string,
  points = 200,
  extra: Partial<Question> = {},
) =>
  makeQuestion({
    id,
    type: "AUDIO",
    state: "INVISIBLE",
    question: audioFile,
    answer,
    points,
    ...extra,
  });

export const videoQ = (
  id: number,
  videoFile: string,
  answer: string,
  points = 200,
  extra: Partial<Question> = {},
) =>
  makeQuestion({
    id,
    type: "VIDEO",
    state: "INVISIBLE",
    question: videoFile,
    answer,
    points,
    ...extra,
  });

export const textAndImageQ = (
  id: number,
  text: string,
  answer: string,
  image: string,
  points = 200,
  extra: Partial<Question> = {},
) =>
  makeQuestion({
    id,
    type: "TEXTANDIMAGE",
    question: text,
    answer,
    points,
    info: image,
    ...extra,
  });
