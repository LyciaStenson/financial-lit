//The bargain shopper question type

import { answer, quizData } from "../quiz/quizDataBase";

export interface dragBarQuestionAnswer extends Omit<answer, "result"> {}

export default interface dragBarQuestionData extends quizData<dragBarQuestionAnswer> {
    min:string;
    max:string;
    step:string;
    photo:string; //The photo location ie /game-images/ps5.webp
}   