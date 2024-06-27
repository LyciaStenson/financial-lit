//The bargain shopper question type

import { answer, quizData } from "../quiz/quizDataBase";

export type item = {
    id: number;
    text: string;
};

export interface pair {
    id:number;
    left:string;
    right:string;
}

export interface matchingQuestionAnswer extends Omit<answer, keyof answer> {
    answers:pair[]
}

export default interface matchingQuestionData extends quizData<matchingQuestionAnswer> {}   