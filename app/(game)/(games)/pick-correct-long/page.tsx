"use client";

import Image from "next/image";
import ContinueButton from "../../continue-button";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import ToggleButtons from "./toggle-buttons";
import { TopBar } from "../top-bar";
import useUser from "@/Hooks/AuthUserContext";
import { isDayCompleted, setDayCompleted, setScore } from "@/src/FirebaseBridge/Auth/currentUser";
import { Banner } from "../../activity/banner";
import useDataCollection from "@/Hooks/LoadQuestionContext";
import usePersistantTimer from "@/Hooks/Timer";
import shuffle from "@/src/random/shuffle";
import { useDataContext } from "@/Hooks/GetDataFromPage";
import pickCorrectQuestionData from "@/src/Game/AnswerData/PickCorrectQuestionData";

const PickCorrectGamePage = () => {

	const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);

	const [questions, setQuestions] = useState<pickCorrectQuestionData[]>([]);

	const [timerCount, timerStart, timerPause, timerReset] = usePersistantTimer(false, { updateFrequency: 1 });

	const [user, loading, error] = useUser();

	const [value, loadingData, errorData] = useDataCollection("questions/year3/day3");

	const { setValue } = useDataContext();

	const router = useRouter();

	const [totalQuestions, setTotalQuestions] = useState(0);

	const [currentQuestion, setCurrentQuestion] = useState<pickCorrectQuestionData | null>(null);

	const [quizLoaded, setQuizLoaded] = useState(false);

	const [selected, setSelected] = useState<number | null>(null);

	const [frozen, setFrozen] = useState<boolean>(false);

	const [disabledAnswers, setDisabledAnswers] = useState<boolean[]>([false, false, false, false, false]);

	const [questionsComplete, setQuestionsComplete] = useState<boolean>(false);

	const [incorrectAttempts, setIncorrectAttempts] = useState(0);
	const [totalIncorrectAttempts, setTotalIncorrectAttempts] = useState(0);
	const [questionStartTime, setQuestionStartTime] = useState<number>(0);

	const [finalScore, setFinalScore] = useState(0);

	const handleAnswerSelected = (index: number, isCorrect: boolean) => {
		if (frozen) return;

		setFrozen(true);
		setSelected(index);

		if (isCorrect) {
			setQuestionStartTime(timerCount);
			setIncorrectAttempts(0);
			setTimeout(loadNextQuestion, 700);
		} else {
			setTimeout(() => incorrectAnswer(index), 700);
		}
	}

	const loadNextQuestion = () => {
		setSelected(null);
		setFrozen(false);
		setDisabledAnswers([false, false, false, false, false]);
		setQuestionStartTime(timerCount);

		if (questions.length > 0) {
			setQuestionsCompleted(questionsCompleted + 1);
			setCurrentQuestion(questions.pop() || null);
		} else {
			setQuestionsComplete(true);
		}
	}

	const incorrectAnswer = (index: number) => {
		setFrozen(false);
		setSelected(null);
		const nextDisabledAnswers = disabledAnswers.map((c, i) => {
			if (i === index) {
				return true;
			} else {
				return c;
			}
		});
		setDisabledAnswers(nextDisabledAnswers);
		setIncorrectAttempts(prevAttempts => prevAttempts + 1);
		setTotalIncorrectAttempts(prevTotal => prevTotal + 1);
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

	const continueButton = () => {
		setValue({
			points: finalScore,
			time: Math.round(timerCount / 1000),
			totalQuestions: totalQuestions,
			totalInccorrect: totalIncorrectAttempts,
			day: 2, //The current day - 1 for the array
		})

		router.push("/celebration")
	}

	useEffect(() => {
		if (value && user) {
			let newQuestions: pickCorrectQuestionData[] = [];

			value.docs.map((doc) => {
				const q = doc.data() as pickCorrectQuestionData;
				let answers: any[] = shuffle(q.answer!);
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

	useEffect(() => {
		if (questionsComplete) {
			if (!isDayCompleted(user!, 1)) {
				const finalScore = calculateFinalScore();
				setFinalScore(finalScore);
			}
		}
	}, [questionsComplete]);

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
			{quizLoaded && currentQuestion && (
				<div className="flex flex-col items-center justify-center text-center space-y-2">
					<TopBar
						percentage={(questionsCompleted /  questions.length) * 100}
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
								priority={true}
							/>
						</div>
						<div className="flex items-center px-2 h-40 border-[2.5px] rounded-2xl text-xl font-extrabold text-moneyconf-purple border-moneyconf-purple">
							<h2>{currentQuestion!.question}</h2>
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
							priority={true}
						/>
					</div>
					<div className="flex flex-col items-center justify-center space-y-1">
						<ToggleButtons
							answers={currentQuestion.answer!}
							selected={selected}
							disabledButtons={disabledAnswers}
							disabled={questionsComplete}
							handleToggle={handleAnswerSelected}
						/>
					</div>
					<ContinueButton
						text="Continue"
						disabled={!questionsComplete}
						click={continueButton}
					/>
				</div>
			)}
		</div>
	);
}

export default PickCorrectGamePage;
