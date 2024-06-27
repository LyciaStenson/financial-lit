'use client'

import Image from "next/image";
import ContinueButton from "../../continue-button";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from "react";

import dragBarQuestionData from "@/src/Game/AnswerData/DragBarQuestionData";
import usePersistantTimer from "@/Hooks/Timer";
import useUser from "@/Hooks/AuthUserContext";
import useDataCollection from "@/Hooks/LoadQuestionContext";
import { useDataContext } from "@/Hooks/GetDataFromPage";
import { useRouter } from "next/navigation";
import shuffle from "@/src/random/shuffle";
import useSound from "use-sound";

const DragBarGamePage = () => {
    const [SliderValue, setSliderValue] = useState(0)

    const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);

    const [questions, setQuestions] = useState<dragBarQuestionData[]>([]);

    const [timerCount, timerStart, timerPause, timerReset] = usePersistantTimer(false, { updateFrequency: 1 });

    const [user, loading, error] = useUser();

    const [value, loadingData, errorData] = useDataCollection("questions/year3/day5");

    const { setValue } = useDataContext();

    const router = useRouter();

    const [totalQuestions, setTotalQuestions] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState<dragBarQuestionData | null>(null);

    const [quizLoaded, setQuizLoaded] = useState(false);

    const [selected, setSelected] = useState<number | null>(null);

    const [frozen, setFrozen] = useState<boolean>(false);

    const [questionsComplete, setQuestionsComplete] = useState<boolean>(false);

    const [incorrectAttempts, setIncorrectAttempts] = useState(0);
    const [totalIncorrectAttempts, setTotalIncorrectAttempts] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState<number>(0);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [defaultValue, setDefualtValue] = useState<number | undefined>(0);

    const correctPath = "./sounds/correct.mp3"
    const inccorrectPath = "./sounds/incorrect.mp3"

    const [playOn] = useSound(
        correctPath,
        { volume: 0.25 }
    );
    const [playOff] = useSound(
        inccorrectPath,
        { volume: 0.25 }
    );

    const valuetext = (value: number, index: number): string => {
        setSliderValue(value);
        return "";
    }   

    const calculateFinalScore = () => {
        const baseScore = 1000;

        const flooredTime = Math.floor(Math.round(timerCount / 1000));

        console.log(timerCount);

        const timePenalty = (flooredTime / 30) * 50;

        const incorrectPenalty = totalIncorrectAttempts * 100; // Adjust as needed

        console.log(baseScore - timePenalty - incorrectPenalty);

        return baseScore - timePenalty - incorrectPenalty;
    }

    const lockInGuess = () => {
        if(parseInt(currentQuestion?.answer?.answer!)== SliderValue){
            const finalScore = calculateFinalScore();
            playOn();
            setValue({
                points:finalScore,
                time:Math.round(timerCount / 1000),
                totalQuestions:totalQuestions,
                totalInccorrect:totalIncorrectAttempts,
                day:6, //The current day - 1 for the array
            })
    
            router.push("/celebration")
        }else{
            playOff();
            setIsIncorrect(true);
            setTotalIncorrectAttempts(totalIncorrectAttempts + 1);
            setTimeout(() => {
                setIsIncorrect(false);
            }, 1000)
        }
    }

    React.useEffect(() => {
        if (value && user) {
            let newQuestions: dragBarQuestionData[] = [];

            value.docs.map((doc) => {
                const q = doc.data() as dragBarQuestionData;
                newQuestions.push(q);
            });

            newQuestions = shuffle(newQuestions);

            setQuestions(newQuestions);
            setTotalQuestions(newQuestions.length);
            setCurrentQuestion(newQuestions.pop() || null);

            setQuizLoaded(true);
            timerReset();
        }
    }, [value, user]);

    return (
        <div className="flex flex-col space-y-5 border">
            {quizLoaded && currentQuestion && (
                <div>
                    <h1 className="text-3xl font-extrabold text-moneyconf-purple items-center justify-center text-center ">
                        Drag the circle to reach the correct number price
                    </h1>
                    <div className="flex flex-row space-x-5 items-center justify-center text-center">
                        <div className="animate-jump animate-thrice animate-delay-300 animate-duration-1000">
                            <Image
                                src="./astronaut-laying-on-coins.svg"
                                alt="Astronaut laying"
                                width={0}
                                height={0}
                                className="w-40 h-auto"
                            />
                        </div>
                        <div className="text-2xl font-extrabold text-moneyconf-purple w-48 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                            <h2 className="text-2xl">{currentQuestion?.question}!</h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-6">
                    </div>
                    <div className="flex flex-row space-x-5 items-center justify-center text-center">
                        <div className="flex flex-row space-x-5 items-center justify-center text-center rounded-3xl bg-moneyconf-grey border-4">
                            <Box sx={{ height: 300 }}>
                                <Slider
                                    aria-label="Price"
                                    defaultValue={defaultValue}
                                    getAriaValueText={valuetext}
                                    shiftStep={30}
                                    step={parseInt(currentQuestion?.step!)}
                                    marks
                                    min={parseInt(currentQuestion?.min!)}
                                    max={parseInt(currentQuestion?.max!)}
                                    orientation="vertical"
                                    color='secondary'
                                />
                            </Box>
                        </div>
                        <div className="w-72 h-72 flex items-center justify-center rounded-3xl bg-moneyconf-grey border-4">
                            <Image
                                src={currentQuestion?.photo!}
                                alt="Price item"
                                width={500}
                                height={500}
                                className="w-auto h-auto"
                            />
                        </div>

                    </div>
                    <div className="flex items-center justify-center text-center">
                        <div className="w-56 h-16 rounded-3xl flex items-center justify-center text-center bg-moneyconf-grey border-4">
                            <h3 className="underline text-3xl font-extrabold text-moneyconf-purple"> {"£" + SliderValue} </h3>
                        </div>
                    </div>

                    <div className="flex items-center justify-center text-center" >
                        <ContinueButton
                            text="Lock in guess"
                            disabled={false}
                            incorrect={isIncorrect}
                            click={lockInGuess}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default DragBarGamePage;