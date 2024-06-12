'use client';

import Image from "next/image";
import ContinueButton from "../../continue-button";
import { Button } from "@/components/ui/button";
import TextBoxes from "./text-boxes";
import { useEffect, useState } from "react";
import { quizData } from "@/src/Game/quiz/quizData";
import { getNextQuizQuestion } from "@/src/Game/quiz/quiz";
import { useRouter } from "next/navigation";

const MoreOrLessGamePage = () => {

    const router = useRouter();
    
    const [question, setQuestion] = useState<quizData | null>(null);
    const [quizLoaded, setQuizLoaded] = useState(false);
    const [answerCorrect, setAnswerCorrect] = useState(false);

    const checkCurrentAnswer = (index:number, event:React.MouseEvent<HTMLButtonElement | null>) => {
        if(question?.answer[index].Result){
            console.log("Answer is correct");
            setAnswerCorrect(true);
        }else{
            console.log("Answer is wrong");
            event.currentTarget.disabled = true;
        }
    }

    const continueQuiz = () =>{
        if(answerCorrect){
            router.push("/celebration");
        }else{
            router.push("/celebration");
        }
    }

    useEffect(() => {
        getNextQuizQuestion().then((value:quizData | null) => {
            setQuestion(value);
            setQuizLoaded(true);
        })
    }, []);


    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5 border">
            <h1 className="text-2xl font-extrabold text-moneyconf-purple">
                Tap the correct box
            </h1>
            <div className="flex flex-row items-center space-x-10">
                <div className="animate-pulse">
                    <Image
                        src="./astronaut-choice.svg"
                        alt="Astronaut choice"
                        width={0}
                        height={0}
                        className="w-28 h-auto"
                    />
                </div>               
                <div className="text-lg font-extrabold text-moneyconf-purple w-48 h-24 border-[2.5px] flex flex-col items-center justify-center border-moneyconf-purple rounded-3xl">
                    <h2>Does it cost more</h2>
                    <h2>or less?</h2>
                </div>
            </div>
            <div className="flex flex-col space-y-10 items-center justify-center">
                <Button className="w-96 h-16 rounded-3xl flex items-center justify-center bg-moneyconf-green border-4 border-dashed border-moneyconf-purple">
                    <h3 className="text-2xl text-moneyconf-purple font-extrabold"> {"More"} </h3>
                </Button>
                <div className="flex flex-row space-x-10 items-center justify-center">
                    <div className="w-52 h-56 flex items-center justify-center rounded-3xl bg-moneyconf-grey border-4">
                    <Image
                        src="astronaut-choice.svg"
                        alt="Astronaut choice"
                        width={0}
                        height={0}
                        className="w-36 h-auto"
                    />
                    </div>                  
                    <TextBoxes text = "£250"/>
                </div>               
                <Button className="w-96 h-16 rounded-3xl flex items-center justify-center bg-moneyconf-red border-4 border-dashed border-moneyconf-purple">
                    <h3 className="text-2xl text-moneyconf-purple font-extrabold"> {"Less"} </h3>
                </Button>
            </div>
            <ContinueButton
                text="Continue"
                disabled={false}
                click={continueQuiz}
            />
        </div>
    )
}

export default MoreOrLessGamePage;