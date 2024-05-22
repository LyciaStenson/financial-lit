'use client';

import Image from "next/image";
import { TopBar } from "../top-bar";
import Continue from "./continue";
import PickBoxes from "./pick-boxes";
import PickBox from "./pick-box";
import { getCurrentQuestion, getNextQuizQuestion } from "@/src/Game/quiz/quiz";
import { useEffect, useState } from "react";
import { quizData } from "@/src/Game/quiz/quizData";

const PickCorrectGamePage = () => {

    const [question, setQuestion] = useState<quizData | null>(null);
    const [quizLoaded, setQuizLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching next quiz question...");
            await getNextQuizQuestion();
            const current = getCurrentQuestion();
            console.log("Current question:", current);
            setQuestion(current);
            setQuizLoaded(true);
        };

        fetchData().catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    return (
        <div>
        {/*{quizLoaded && question && (*/}
                <div className="flex flex-col items-center justify-center text-center space-y-5 border p-1">
                    <TopBar />
                    <h1 className="text-2xl font-extrabold text-moneyconf-purple">
                        Click the correct answer
                    </h1>
                    <div className="flex flex-row items-center space-x-10">
                        <Image
                            src="./astronaut-holding-coins.svg"
                            alt="Astronaut Coins"
                            width={0}
                            height={0}
                            className="w-32 h-auto"
                        />
                        <div className="text-xl font-extrabold text-moneyconf-purple w-70 p-4 border-[2.5px] border-moneyconf-purple rounded-3xl">
                            <h2>How many Yen</h2>
                            <h2>would I get for...</h2>
                            <h2 className="text-3xl">£3</h2>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2 items-center justify-center">
                        <div className=" text-md space-y-1 rounded-full font-extrabold text-moneyconf-purple p-1 border-[2.5px] bg-moneyconf-gold">
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
                        {/*<PickBoxes one={question.UUID!} two="6" />*/}
                        <PickBoxes one={"600"} two="6" />
                        <PickBox one="200" />
                        <PickBoxes one="100" two="800" />
                    </div>
                    <Continue text="Continue" />
                </div>
            {/*})}*/}
        </div>
    );
}

export default PickCorrectGamePage;
