'use client';

import Image from "next/image";
import ContinueButton from "../../continue-button";
import { Button } from "@/components/ui/button";
import TextBoxes from "./text-boxes";
import { useEffect, useState } from "react";
import { answer, quizData } from "@/src/Game/quiz/quizDataBase";
import { useRouter } from "next/navigation";

const TutorialPage = () => {

    const router = useRouter();
    
    const [question, setQuestion] = useState<quizData<answer>[]>([]);
    const [quizLoaded, setQuizLoaded] = useState(false);
    const [answerCorrect, setAnswerCorrect] = useState(false);

    const checkCurrentAnswer = (index:number, event:React.MouseEvent<HTMLButtonElement | null>) => {
        //if(question?.answer[index].Result){
            //console.log("Answer is correct");
            //setAnswerCorrect(true);
        //}else{
            //console.log("Answer is wrong");
            //event.currentTarget.disabled = true;
        //}
    }

    const continueQuiz = () =>{
        if(answerCorrect){
            router.push("/celebration");
        }else{
            router.push("/celebration");
        }
    }

    //useEffect(() => {
        //getNextQuizQuestion().then((value:quizData | null) => {
            //setQuestion(value);
            //setQuizLoaded(true);
        //})
    //}, []);


    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5 border py-5">
            <div className="w-72 h-16 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple space-x-2">
                <h1 className="text-xl font-extrabold">
                    Day 4
                </h1>
            </div>
            <div className="flex flex-col space-y-10 items-center justify-center">
                <div className="w-80 h-96 flex items-center justify-center rounded-3xl bg-moneyconf-grey border-4">
                    <Image
                        src="/order.gif"
                        alt="Astronaut choice"
                        width={0}
                        height={0}
                        className="w-72 h-auto"
                    />
                </div>                      
            </div>
            <ContinueButton
                text="Return to Home Screen"
                disabled={false}
                incorrect={false}
                click={() => router.push("/home")}
            />
            <ContinueButton
                text="Continue"
                disabled={false}
                incorrect={false}
                click={continueQuiz}
            />
        </div>
    )
}

export default TutorialPage;