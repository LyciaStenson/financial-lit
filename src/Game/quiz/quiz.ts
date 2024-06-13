import { getQuizCollection } from "@/src/FirebaseBridge/firestore/getData";
import { quizData, quizYear } from "./quizData";
import setData from "@/src/FirebaseBridge/firestore/setData";
import { uuidv4 } from "@firebase/util";

export let questions: quizData[] = [];
export let currentQuestion: quizData | null = null;

let questionLength:number = 0;
let hasQuestionsLoaded = false;

export async function loadQuiz(){
    if(!hasQuestionsLoaded){
        if(!hasQuestionsLoaded){
            await getAllQuizQuestions();
            console.log("Loaded all questions");
        }
        hasQuestionsLoaded = true;

        console.log(questions);

        questionLength = questions.length - 1;

        currentQuestion = questions.pop()!;

        console.log("Current Questions >> ", currentQuestion);
    }
}

export function getCurrentQuestion() {
    return currentQuestion;
}

export async function getNextQuizQuestion(){
    currentQuestion = questions.pop()!;
    questionLength--;
    console.log(questionLength);
    return currentQuestion;
}

export async function getAllQuizQuestions(): Promise<quizData[]> {
    try {
        const data = await getQuizCollection("questions/year3/pick/");
        data.forEach((item) => {
            console.log(item);
            questions.push({
                UUID: item.UUID,
                question: item.question,
                type: item.type,
                year: item.year,
                answer: item.answer,
            });
        });
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
    }

    return questions;
}

export function setQuizQuestion(data: quizData) {
    data.year = quizYear.year3;
    data.UUID = uuidv4();
    setData("questions/" + data.year + "/" + data.type, data.UUID, data);
}
