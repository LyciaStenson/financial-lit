"use client";

import Image from "next/image";
import ContinueButton from "../../continue-button";
import { useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';
import shuffle from "@/src/random/shuffle";
import { useRouter } from "next/navigation";
import useDataCollection from "@/Hooks/LoadQuestionContext";
import bargainShopperQuestionData from "@/src/Game/AnswerData/BargainShopperQuestionData";
import usePersistantTimer from "@/Hooks/Timer";
import useUser from "@/Hooks/AuthUserContext";
import { useDataContext } from "@/Hooks/GetDataFromPage";
import { answer } from "@/src/Game/quiz/quizDataBase";
import useSound from "use-sound";

const BargainShopperPage = () => {
    const [value, loadingData, errorData] = useDataCollection("questions/year3/day1");

    const router = useRouter();

    const correctAnswer = "Water";

    const [pickerValue, setPickerValue] = useState({ value: "" });

    const [questions, setQuestions] = useState<bargainShopperQuestionData[]>([]);

    const [timerCount, timerStart, timerPause, timerReset] = usePersistantTimer(false, { updateFrequency: 1 });

    const [user, loading, error] = useUser();

    const { setValue } = useDataContext();

    const [totalQuestions, setTotalQuestions] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState<bargainShopperQuestionData | null>(null);

    const [quizLoaded, setQuizLoaded] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [totalIncorrectAttempts, setTotalIncorrectAttempts] = useState(0);
    const [isIncorrect, setIsIncorrect] = useState(false);

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

    const continueButton = () => {
        const isCorrect = currentQuestion?.answer!.some(element => {
            if (pickerValue.value === element.answer && element.result) {
                playOn();
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
            const updatedAnswers = currentQuestion?.answer!.filter(element => element.answer !== pickerValue.value);
            if (currentQuestion) {
                playOff();
                setCurrentQuestion({ ...currentQuestion, answer: updatedAnswers || [] });
                setIsIncorrect(true);
                setTotalIncorrectAttempts(totalIncorrectAttempts + 1);
                setTimeout(() => {
                    setIsIncorrect(false);
                }, 1000)            
            }
        }
    }

    useEffect(() => {
        if (value && user) {
            let newQuestions: bargainShopperQuestionData[] = [];

            value.docs.map((doc) => {
                const q = doc.data() as bargainShopperQuestionData;
                let answers: answer[] = shuffle(q.answer!);
                q.answer = answers;
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
        <div className="flex flex-col items-center justify-center text-center space-y-5">
            {quizLoaded && questions && (
                <div>
                    <h1 className="text-2xl font-extrabold text-moneyconf-purple">
                        Scroll the dial
                    </h1>
                    <div className="flex flex-row items-center space-x-5">
                        <div className="animate-wiggle-more animate-infinite animate-duration-1000">
                            <Image
                                src="./astronaut-shopping-trolley.svg"
                                alt="Astronaut shopping"
                                width={0}
                                height={0}
                                className="w-32 h-auto"
                            />
                        </div>
                        <div className="flex items-center text-lg w-48 h-28 px-2 border-[2.5px] font-extrabold text-moneyconf-purple border-moneyconf-purple rounded-3xl">
                            <h2>{currentQuestion?.question}</h2>
                        </div>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        <Image
                            src="./arrow-green.svg"
                            alt="Arrow Green"
                            width={0}
                            height={0}
                            className="w-11 h-auto"
                        />
                        <div className="w-72 text-lg font-extrabold text-moneyconf-purple border-[2.5px] border-moneyconf-purple rounded-3xl bg-moneyconf-grey">
                            <Picker value={pickerValue} onChange={setPickerValue}>
                                <Picker.Column key={"value"} name={"value"}>
                                    {currentQuestion?.answer!.map((option) => (
                                        <Picker.Item key={option.answer} value={option.answer}>
                                            {({ selected }) => (
                                                <div className={selected ? "text-moneyconf-purple" : "text-black text-opacity-40"}>
                                                    {option.answer}
                                                </div>
                                            )}
                                        </Picker.Item>
                                    ))}
                                </Picker.Column>
                            </Picker>
                        </div>
                    </div>
                    <ContinueButton
                        text="Lock in guess"
                        disabled={pickerValue.value == ""}
                        incorrect={isIncorrect}
                        click={continueButton}
                    />
                </div>
            )}
        </div>
    )
}

export default BargainShopperPage;
