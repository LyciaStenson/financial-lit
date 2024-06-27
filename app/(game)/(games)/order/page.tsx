'use client';

import Image from "next/image";
import ContinueButton from "../../continue-button";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import useDataCollection from "@/Hooks/LoadQuestionContext";
import usePersistantTimer from "@/Hooks/Timer";
import useUser from "@/Hooks/AuthUserContext";
import { useDataContext } from "@/Hooks/GetDataFromPage";
import PickBoxes from "./pick-boxes";
import orderQuestionData from "@/src/Game/AnswerData/OrderQuestionData";
import shuffle from "@/src/random/shuffle";
import { Banner } from "../../activity/banner";
import { Button } from "@/components/ui/button";
import useSound from "use-sound";

interface clicked {
    clicked: boolean;
    word: string;
}

const OrderGamePage = () => {

    const [value, loadingData, errorData] = useDataCollection("questions/year3/day4");

    const router = useRouter();

    const [index, setIndex] = useState(0);
    const [word, setWord] = useState<string[]>([]);

    const [clicked, setClicked] = useState<clicked[]>(
        Array.from({ length: 9 }, (_, index) => ({ clicked: false, word:"" }))
    );

    const [questions, setQuestions] = useState<orderQuestionData[]>([]);

    const [timerCount, timerStart, timerPause, timerReset] = usePersistantTimer(false, { updateFrequency: 1 });

    const [user, loading, error] = useUser();

    const { setValue } = useDataContext();

    const [totalQuestions, setTotalQuestions] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState<orderQuestionData | null>(null);

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

    const addWordToFinal = (word: string, id: number) => {
        if (index > 2) return;

        setWord(prevWords => [...prevWords, word]);
        setClicked(prevClicked => {
            const newClicked = [...prevClicked];
            newClicked[id].clicked = true;
            newClicked[id].word = word;
            return newClicked;
        });
        setIndex(index + 1);
    };

    const removeWordFromFinal = (wordIndex: number) => {
        setWord(prevWords => prevWords.filter((_, i) => i !== wordIndex));

        setClicked(prevClicked => {
            const newClicked = [...prevClicked];
            const clickedArray = newClicked.map((item):clicked[] => {
                let newClickedArray:clicked[] = [];
                if(item.word == word[wordIndex]){
                    if(item.clicked){
                        item.clicked = false;
                        item.word = "";
                        newClickedArray.push(item);   
                    }else{
                        newClickedArray.push(item);   
                    }
                }

                return newClickedArray
            });
            
            return newClicked;
        });

        setIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const calculateFinalScore = () => {
        const baseScore = 1000;

        const flooredTime = Math.floor(Math.round(timerCount / 1000));

        console.log(timerCount);

        const timePenalty = (flooredTime / 30) * 50;

        const incorrectPenalty = totalIncorrectAttempts * 100; // Adjust as needed

        console.log(baseScore - timePenalty - incorrectPenalty);

        return baseScore - timePenalty - incorrectPenalty;
    }


    const lockInGuess = () =>{
        const finalWord = word.join(" "); // joins the word array to create the answer word
        console.log("Final: ", finalWord);
        console.log("Answer Word: ", currentQuestion?.answer?.answer);
        if(currentQuestion?.answer?.answer == finalWord){
            playOn();
            const finalScore = calculateFinalScore();
            setFinalScore(finalScore);
            setValue({
                points:finalScore,
                time:Math.round(timerCount / 1000),
                totalQuestions:totalQuestions,
                totalInccorrect:totalIncorrectAttempts,
                day:5, //The current day - 1 for the array
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

    useEffect(() => {
        if (value && user) {
            let newQuestions: orderQuestionData[] = [];

            value.docs.map((doc) => {
                const q = doc.data() as orderQuestionData;
                const words = shuffle(q.words);
                q.words = words;
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

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Banner title="Loading your account"
                    description={"We are gathering your details... Please be patient"} />
            </div>
        )
    }

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
                    <div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {currentQuestion?.words.map((word, index) => (
                            <Button className=" w-28 h-16 rounded-3xl flex items-center justify-center bg-moneyconf-grey border-4 border-dashed border-moneyconf-green disabled:border-moneyconf-grey-dark" key={index} onClick={() => addWordToFinal(word, index)} disabled={clicked[index].clicked}>{word}</Button>
                        ))}
                    </div>

                    <div className="flex space-x-1 font-extrabold text-moneyconf-purple p-3 border-[2.5px] bg-moneyconf-grey place-items-center justify-start text-start px-2">
                        <h3 className="text-xl font-extrabold text-moneyconf-purple px-3">
                            {currentQuestion?.answer?.word} =   </h3>
                        <button onClick={() => removeWordFromFinal(0)} className="underline"> {word[0]} </button>
                        <button onClick={() => removeWordFromFinal(1)} className="underline"> {word[1]} </button>
                        <button onClick={() => removeWordFromFinal(2)} className="underline"> {word[2]} </button>
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

export default OrderGamePage;

