"use client";

import Image from "next/image";
import ContinueButton from "../../continue-button";
import { getCurrentQuestion, getNextQuizQuestion, questions } from "@/src/Game/quiz/quiz";
import React, { useEffect, useState } from "react";
import { quizData } from "@/src/Game/quiz/quizData";
import { useRouter } from "next/navigation";
import ToggleButtons from "./toggle-buttons";
import { TopBar } from "../top-bar";

type PickCorrectQuestion = {
    question?: string,
    answers: { Answer: string, Result: boolean }[]
}

const QuizDataToQuestion = (data : quizData | null) : PickCorrectQuestion => {
    return {question: data?.question, answers: data?.answer}
}

const PickCorrectLongGamePage = () => {

    const [questionsComplete, setQuestionsComplete] = useState<number>(0);

    const router = useRouter();

    const [question, setCurrentQuestion] = useState<PickCorrectQuestion | null>(null);
    const [quizLoaded, setQuizLoaded] = useState(false);

    const [selected, setSelected] = useState<number | null>(null);

    const [frozen, setFrozen] = useState<boolean>(false);

    const handleAnswerSelected = (index: number, isCorrect: boolean) => {
        if (frozen) return;
        
        setFrozen(true);
        setSelected(index);
        if (isCorrect) {
            setTimeout(loadNextQuestion, 700);
        } else {
            setTimeout(incorrectAnswer, 700);
        }
    }

    const loadNextQuestion = () => {
        console.log("loadNextQuestion");
        setQuestionsComplete(1);
        setFrozen(false);
        setSelected(null);
        getNextQuizQuestion().then((value:quizData)=> {
            setCurrentQuestion(QuizDataToQuestion(value));
        });
    }

    const incorrectAnswer = () => {
        setFrozen(false);
        setSelected(null);
    }

    /*
    const checkCurrentAnswer = (index:number, event:React.MouseEvent<HTMLButtonElement | null>) => {
        if (question?.answers[index].Result){
            console.log("Answer is correct");
            setAnswerCorrect(true);
            //event.currentTarget.style={}
        } else {
            console.log("Answer is wrong");
            event.currentTarget.disabled = true;
        }
    }
    */

    useEffect(() => {
        setCurrentQuestion(QuizDataToQuestion(getCurrentQuestion()));
        console.log(getCurrentQuestion());
        setQuizLoaded(true);
    }, [getCurrentQuestion()]);

    return (
        <div>
        {quizLoaded && question && (
            <div className="flex flex-col items-center justify-center text-center space-y-2">
                <TopBar
                    percentage={(questionsComplete / questions.length) * 100}
                />
                <h1 className="text-2xl font-extrabold text-moneyconf-purple">
                    Click the correct answer
                </h1>
                <div className="flex flex-row items-center justify-center space-x-2 px-2 pt-5">
                    <div className="animate-bounce animate-duration-[1300ms]">
                        <Image
                            src="./astronaut-holding-coins.svg"
                            alt="Astronaut Coins"
                            width={0}
                            height={0}
                            className="w-56 h-auto"
                        />
                    </div>
                    <div className="text-xl font-extrabold text-moneyconf-purple px-2 py-6 border-[2.5px] border-moneyconf-purple rounded-2xl">
                        <h2>{question!.question}</h2>
                    </div>
                </div>
                <div className="flex flex-row space-x-2 items-center justify-center">
                    <div className=" text-md space-y-1 rounded-full font-extrabold text-moneyconf-purple p-2 bg-moneyconf-gold"> 
                        <h3 className="underline"> {"Currency Conversion Table"} </h3>
                        <h3> {"Every Pound is worth 200 Yen"} </h3>
                        <h3> {"£ 1 = ¥ 200"} </h3>
                    </div>
                    <Image
                        src="./calculator.svg"
                        alt="Calculator"
                        width={0}
                        height={0}
                        className="w-28 h-auto"
                    />
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <ToggleButtons
                        answers={question.answers}
                        selected={selected}
                        handleToggle={handleAnswerSelected}
                    />
                </div>
                <ContinueButton
                    text="Continue"
                    disabled={false}
                    click={() => router.push("/celebration")}
                />
            </div>
        )}
        </div>
    );
}

export default PickCorrectLongGamePage;
