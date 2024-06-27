"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import MatchingButtons from "./matching-buttons";
import ContinueButton from "../../continue-button";

import { Item, Pair } from "./types";
import useUser from "@/Hooks/AuthUserContext";
import useDataCollection from "@/Hooks/LoadQuestionContext";
import { useDataContext } from "@/Hooks/GetDataFromPage";
import matchingQuestionData, { matchingQuestionAnswer, pair } from "@/src/Game/AnswerData/MatchingQuestionData";
import usePersistantTimer from "@/Hooks/Timer";
import shuffle from "@/src/random/shuffle";
import useSound from "use-sound";

const MatchingGamePage = () => {

	const [user, loading, error] = useUser();

	const [questions, setQuestions] = useState<matchingQuestionData[]>([]);

	const [timerCount, timerStart, timerPause, timerReset] = usePersistantTimer(false, { updateFrequency: 1 });

	const [value, loadingData, errorData] = useDataCollection("questions/year3/day6");

	const { setValue } = useDataContext();

	const router = useRouter();

	const [totalQuestions, setTotalQuestions] = useState(0);

	const [currentQuestion, setCurrentQuestion] = useState<matchingQuestionData | null>(null);

	const [quizLoaded, setQuizLoaded] = useState(false);

	const [selected, setSelected] = useState<number | null>(null);

	const [frozen, setFrozen] = useState<boolean>(false);

	const [incorrectAttempts, setIncorrectAttempts] = useState(0);
    const [totalIncorrectAttempts, setTotalIncorrectAttempts] = useState(0);
	const [questionStartTime, setQuestionStartTime] = useState<number>(0);

	const [pairs, setPairs] = useState<pair[]>([]);

	//Answer Data
	//const pairs: Pair[] = [ 
	//	{ id: 1, left: "A", right: "1" },
	//	{ id: 2, left: "B", right: "2" },
	//	{ id: 3, left: "C", right: "3" },
	//	{ id: 4, left: "D", right: "4" }
	//];

	const [shuffledLeft, setShuffledLeft] = useState<Item[]>([]);
	const [shuffledRight, setShuffledRight] = useState<Item[]>([]);

	const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
	const [selectedRight, setSelectedRight] = useState<number | null>(null);
	const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

	const [questionsComplete, setQuestionsComplete] = useState<boolean>(false);

    const correctPath = "./sounds/correct.mp3"

    const [playOn] = useSound(
        correctPath,
        { volume: 0.25 }
    );

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
		if (questionsComplete == true) {
			playOn();
			const finalScore = calculateFinalScore();
            setValue({
                points:finalScore,
                time:Math.round(timerCount / 1000),
                totalQuestions:totalQuestions,
                totalInccorrect:totalIncorrectAttempts,
                day:7, //The current day - 1 for the array
            })
    
            router.push("/celebration")		
		}else{
            setTotalIncorrectAttempts(totalIncorrectAttempts + 1);
		}
	}

	useEffect(() => {
		if (value && user) {
			let newQuestions: matchingQuestionData[] = [];
	
			value.docs.forEach(doc => {
				const q = doc.data() as matchingQuestionData;
				newQuestions.push(q);
			});
	
			newQuestions = shuffle(newQuestions);
	
			setQuestions(newQuestions);
			setTotalQuestions(newQuestions.length);
			const initialQuestion = newQuestions.pop() || null;
			setCurrentQuestion(initialQuestion);
			if (initialQuestion) {
				setPairs(initialQuestion?.answer?.answers!);
				const leftItems = initialQuestion?.answer?.answers.map(pair => ({ id: pair.id, text: pair.left }));
				const rightItems = initialQuestion?.answer?.answers.map(pair => ({ id: pair.id, text: pair.right }));
	
				setShuffledLeft(shuffleArray(leftItems!));
				setShuffledRight(shuffleArray(rightItems!));
			}
	
			setQuizLoaded(true);
	
			timerReset();
		}
	}, [value, user]);

	const shuffleArray = <T,>(array: T[]): T[] => {
		return array
			.map(value => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	};

	const handleLeftClick = (id: number) => {
		setSelectedLeft(id);
		checkMatch(id, selectedRight);
	}

	const handleRightClick = (id: number) => {
		setSelectedRight(id);
		checkMatch(id, selectedLeft);
	}

	const checkMatch = (leftId: number | null, rightId: number | null) => {
		if (leftId !== null && rightId !== null) {
			const leftPair = pairs.find(pair => pair.id === leftId);
			const rightPair = pairs.find(pair => pair.id === rightId);
			if (leftPair && rightPair && leftPair.right === rightPair.right) {
				const newMatchedPairs = [...matchedPairs, leftPair.id];
				console.log("newMatchedPairs.length > ", newMatchedPairs.length);
				console.log("pairs.length > ", pairs.length);
				setMatchedPairs(newMatchedPairs);
				if (newMatchedPairs.length == pairs.length) {
					setQuestionsComplete(true);
				}
			}
			setSelectedLeft(null);
			setSelectedRight(null);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center text-center space-y-5">
			{quizLoaded && currentQuestion && (
				<div>
					<h1 className="text-2xl font-extrabold text-moneyconf-purple">
						Tap the matching boxes
					</h1>
					<div className="flex flex-row items-center justify-center space-x-6 py-5">
						<div className="animate-jump animate-infinite animate-duration-1000">
							<Image
								src="./astronaut-money-bags.svg"
								alt="Astronaut Kick"
								width={0}
								height={0}
								className="w-32 h-auto"
							/>
						</div>
						<div className="text-auto font-extrabold text-moneyconf-purple flex items-center w-52 h-32 border-[2.5px] border-moneyconf-purple rounded-3xl">
							<h2>{currentQuestion.question}</h2>
						</div>
					</div>
					<div className="flex flex-row space-x-2 pb-2">
						<MatchingButtons
							items={shuffledLeft}
							selectedId={selectedLeft}
							matchedIds={matchedPairs}
							onItemClick={handleLeftClick}
						/>
						<MatchingButtons
							items={shuffledRight}
							selectedId={selectedRight}
							matchedIds={matchedPairs}
							onItemClick={handleRightClick}
						/>
					</div>
					<ContinueButton
						text="Continue"
						disabled={!questionsComplete}
						incorrect={false} //Will never not be incorrect
						click={lockInGuess}
					/>
				</div>
			)}
		</div>
	)
}

export default MatchingGamePage;