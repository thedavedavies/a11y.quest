import type { Question } from "../../data/questions";
import { difficultyTag } from "../DifficultyTag/DifficultyTag";
import { topicTag } from "../TopicTag/TopicTag";
import { questionCounter } from "../QuestionCounter/QuestionCounter";
import styles from "./QuestionMeta.module.css";

export function questionMeta(q: Question, questionNumber: number): string {
  return (
    `<div class="${styles.meta}">` +
    `<div class="${styles.tags}">${difficultyTag(q.difficulty)}${topicTag(q.topic)}</div>` +
    questionCounter(questionNumber) +
    `</div>`
  );
}
