//The orderQuestinoData this only has one answer which does take in the bool as we only compare the list of words to the answer

import { answer, quizData } from "../quiz/quizDataBase";

export interface orderQuestionAnswer extends Omit<answer, "result">{
    word:string; 
}

export default interface orderQuestionData extends quizData<orderQuestionAnswer> {
    words:string[];//The list of words ie Placement, Regulatory ect
}