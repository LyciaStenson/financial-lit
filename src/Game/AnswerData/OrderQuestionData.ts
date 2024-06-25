//The orderQuestinoData this only has one answer which does take in the bool as we only compare the list of words to the answer

import { answer, quizData } from "../quiz/quizDataBase";

export interface orderQuestionAnswer extends Omit<answer, "result">{
    word:string; //Added for the word that the question is based on such as APR
}

export default interface orderQuestionData extends quizData<orderQuestionAnswer> {}