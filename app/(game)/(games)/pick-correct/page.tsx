'use client';

import Image from "next/image";
import Continue from "./continue";
import PickBoxes from "./pick-boxes";
import PickBox from "./pick-box";
import { getNextQuizQuestion } from "@/src/Game/quiz/quiz";
import React, { useEffect, useState } from "react";
import { quizData } from "@/src/Game/quiz/quizData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ToggleButtons from "./toggle-buttons";

const PickCorrectGamePage = () => {

    const router = useRouter();

    const [question, setQuestion] = useState<quizData | null>(null);
    const [quizLoaded, setQuizLoaded] = useState(false);
    const [answerCorrect, setAnswerCorrect] = useState(false);

    const answers1 = ["600", "6", "200", "100", "800"];
    const corrects1 = [true, false, false, false, false]

    const answers2 = ["10", "20", "30", "40", "50"];
    const corrects2 = [false, true, false, false, false];

    const [answers, setAnsers] = useState(answers1);
    const [corrects, setCorrects] = useState(corrects1);

    const [selected, setSelected] = useState<number | null>(null);

    const handleAnswerSelected = (index: number, isCorrect: boolean) => {
        setSelected(index);
        if (isCorrect) {
            setTimeout(loadNextQuestion, 1000);
        }
    }

    const loadNextQuestion = () => {
        setSelected(null);
        setAnsers(answers2);
        setCorrects(corrects2);
    }

    const checkCurrentAnswer = (index:number, event:React.MouseEvent<HTMLButtonElement | null>) => {
        if (question?.answer[index].Result){
            console.log("Answer is correct");
            setAnswerCorrect(true);
            //event.currentTarget.style={}
        } else {
            console.log("Answer is wrong");
            event.currentTarget.disabled = true;
        }
    }

    const continueQuiz = () =>{
        if (answerCorrect){
            router.push("/celebration");
        } else {
            router.push("/celebration");
        }
    }

    useEffect(() => {
        getNextQuizQuestion().then((value:quizData | null) => {
            setQuestion(value);
            if (value)
                setQuizLoaded(true);
        })
    }, []);


    return (
        <div>
        {quizLoaded && question && (
                <div className="flex flex-col items-center justify-center text-center space-y-5 border p-1">
                    <h1 className="text-2xl font-extrabold text-moneyconf-purple">
                        Click the correct answer
                    </h1>
                    <div className="flex flex-row items-center justify-center space-x-2 px-5">
                        <div className="animate-bounce animate-duration-[1300ms]">
                            <Image
                                src="./astronaut-holding-coins.svg"
                                alt="Astronaut Coins"
                                width={0}
                                height={0}
                                className="w-56 h-auto"
                            />
                        </div>                       
                        <div className="text-xl font-extrabold text-moneyconf-purple w-70 px-4 py-6 border-[2.5px] border-moneyconf-purple rounded-3xl">
                            <h2>{question!.question}</h2>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2 items-center justify-center">
                        <div className=" text-md space-y-1 rounded-full font-extrabold text-moneyconf-purple p-1 bg-moneyconf-gold"> 
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
                        {/*<Button variant={"quiz"} type="submit" onClick={(e) => checkCurrentAnswer(1, e)}>900</Button>
                        <Button variant={"quiz"} type="submit" onClick={(e) => checkCurrentAnswer(1, e)}>Press Me</Button>*/}
                        <ToggleButtons
                            answers={answers}
                            corrects={corrects}
                            selected={selected}
                            handleToggle={handleAnswerSelected}
                        />
                        {/*<PickBox index={0} click={checkCurrentAnswer} one={question!.answer[0].Answer!} />
                        <PickBoxes index = {2} click={checkCurrentAnswer} one={question!.answer[3].Answer!} two={question!.answer[4].Answer!} />*/}
                    </div>
                    <Continue text="Continue" click={continueQuiz} />
                </div>
            )}
        </div>
    );
}

export default PickCorrectGamePage;
