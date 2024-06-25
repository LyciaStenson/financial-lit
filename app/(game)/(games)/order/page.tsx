'use client';

import Image from "next/image";
import ContinueButton from "../../continue-button";
import { useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';
import shuffle from "@/src/random/shuffle";
import { useRouter } from "next/navigation";
import useDataCollection from "@/Hooks/LoadQuestionContext";
import { quizData } from "@/src/Game/quiz/quizDataBase";
import usePersistantTimer from "@/Hooks/Timer";
import useUser from "@/Hooks/AuthUserContext";
import { useDataContext } from "@/Hooks/GetDataFromPage";
import PickBoxes from "./pick-boxes";

type OrderQuestion = {
    question?: string,
    word?: string,
    answers: { Answer: string, Result: boolean }[]
}

const QuizDataToQuestion = (data: quizData | null, word?: string): OrderQuestion => {
    return { question: data?.question, word: word, answers: data?.answer }
}

const OrderGamePage = () => {

    const [value, loadingData, errorData] = useDataCollection("questions/year3/day4");

    const router = useRouter();

    const [pickerValue, setPickerValue] = useState({ value: "" });

    const [questions, setQuestions] = useState<quizData[]>([]);

    const [timerCount, timerStart, timerPause, timerReset] = usePersistantTimer(false, { updateFrequency: 1 });

    const [user, loading, error] = useUser();

    const { setValue } = useDataContext();

    const [totalQuestions, setTotalQuestions] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState<OrderQuestion | null>(null);

    const [quizLoaded, setQuizLoaded] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [totalIncorrectAttempts, setTotalIncorrectAttempts] = useState(0);

    const continueButton = () => {
        const isCorrect = currentQuestion?.answers.some(element => {
            if (pickerValue.value === element.Answer && element.Result) {
                console.log("Correct Answer");
                setValue({
                    points: finalScore,
                    time: Math.round(timerCount / 1000),
                    totalQuestions: totalQuestions,
                    totalInccorrect: totalIncorrectAttempts,
                    day: 0, // The current day - 1 for the array
                });

                router.push("/celebration");
                return true;
            }
            return false;
        });

        if (!isCorrect) {
            // Remove the incorrect answer from the question's answers array
            const updatedAnswers = currentQuestion?.answers.filter(element => element.Answer !== pickerValue.value);
            if (currentQuestion) {
                setCurrentQuestion({ ...currentQuestion, answers: updatedAnswers || [] });
                setTotalIncorrectAttempts(totalIncorrectAttempts + 1);
            }
        }
    }

    useEffect(() => {
        if (value && user) {
            let newQuestions: quizData[] = [];

            value.docs.forEach((doc) => {
                const q = doc.data() as quizData;
                const word = doc.data().word;
                let answers: any[] = shuffle(QuizDataToQuestion(q, word).answers);
                q.answer = answers;
                newQuestions.push(q);
            });

            newQuestions = shuffle(newQuestions);

            // Get the last question from newQuestions array
            const lastQuestion = newQuestions.pop() || null;

            if (lastQuestion) {
                const word = lastQuestion.word; // Assign word from the last question
                setCurrentQuestion(QuizDataToQuestion(lastQuestion, word));
            }

            setQuestions(newQuestions);
            setTotalQuestions(newQuestions.length);
            setQuizLoaded(true);
            timerReset();
        }
    }, [value, user]);



    return (
        <div>
            {quizLoaded && questions && (
                <div className="flex flex-col space-y-5 border p-1">
                    <h1 className="text-2xl font-extrabold text-moneyconf-purple items-center justify-center text-center">
                        Tap the boxes to put it in order below
                    </h1>
                    <div className="flex flex-row space-x-10 items-center justify-center text-center ">
                        <div className="animate-bounce animate-duration-1000">
                            <Image
                                src="./astronaut-laptop-coin.svg"
                                alt="Astronaut Laptop"
                                width={0}
                                height={0}
                                className="w-20 h-auto"
                            />
                        </div>
                        <div className="text-2xl font-extrabold text-moneyconf-purple w-70 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                            <h2 className="text-2xl">{currentQuestion?.question}</h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <PickBoxes one={currentQuestion?.answers[0].Answer!} two={currentQuestion?.answers[1].Answer!} three={currentQuestion?.answers[2].Answer!} />
                        <PickBoxes one={currentQuestion?.answers[5].Answer!} two={currentQuestion?.answers[4].Answer!} three={currentQuestion?.answers[3].Answer!} />
                        <PickBoxes one={currentQuestion?.answers[6].Answer!} two={currentQuestion?.answers[7].Answer!} three={currentQuestion?.answers[8].Answer!} />
                    </div>

                    <div className="flex space-x-1 font-extrabold text-moneyconf-purple p-3 border-[2.5px] bg-moneyconf-grey place-items-center justify-start text-start px-2">
                        <h3 className="text-xl font-extrabold text-moneyconf-purple px-3">
                            {currentQuestion?.word} =   </h3>
                        <h3 className="underline"> {"Place"} </h3>
                        <h3 className="underline"> {"holder"} </h3>
                        <h3 className="underline"> {"text"} </h3>
                    </div>
                    <div className="flex items-center justify-center text-center" >
                        <ContinueButton
                            text="Lock in guess"
                            disabled={false}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderGamePage;

