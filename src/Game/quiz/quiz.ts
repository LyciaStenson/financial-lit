import { getQuizCollection } from "@/src/FirebaseBridge/firestore/getData";
import { quizData, quizYear } from "./quizData";
import setData from "@/src/FirebaseBridge/firestore/setData";
import { uuidv4 } from "@firebase/util";

export let quizDataList: quizData[] = [];
export let currentQuestion: quizData | null = null;

export function getCurrentQuestion() {
    return currentQuestion;
}

export async function getNextQuizQuestion():Promise<quizData | null> {
    let currentQuestion:quizData | null = null;
    quizDataList = [];
    if (quizDataList.length === 0) {
        quizDataList = await getAllQuizQuestions();
        console.log(quizDataList);
    }

    if (quizDataList.length > 0) {
        currentQuestion = quizDataList.pop()!;
        return currentQuestion;
    }

    return currentQuestion;
}

export async function getAllQuizQuestions(): Promise<quizData[]> {
    let d: quizData[] = [];
    try {
        const data = await getQuizCollection("questions/year3/pick/");
        data.forEach((item) => {
            d.push({
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

    return d;
}

export function setQuizQuestion(data: quizData) {
    data.year = quizYear.year3;
    data.UUID = uuidv4();
    setData("questions/" + data.year + "/" + data.type, data.UUID, data);
}
