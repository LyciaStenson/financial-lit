"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import MatchingButtons from "./matching-buttons";
import ContinueButton from "../../continue-button";

import { Item, Pair } from "./types";

const MatchingGamePage = () => {

	const router = useRouter();

	const pairs: Pair[] = [
		{ id: 1, left: "A", right: "1" },
		{ id: 2, left: "B", right: "2" },
		{ id: 3, left: "C", right: "3" },
		{ id: 4, left: "D", right: "4" }
	];

	const [shuffledLeft, setShuffledLeft] = useState<Item[]>([]);
	const [shuffledRight, setShuffledRight] = useState<Item[]>([]);

	const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
	const [selectedRight, setSelectedRight] = useState<number | null>(null);
	const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

	const [questionsComplete, setQuestionsComplete] = useState<boolean>(false);

	useEffect(() => {
		const leftItems = pairs.map(pair => ({ id: pair.id, text: pair.left }));
		const rightItems = pairs.map(pair => ({ id: pair.id, text: pair.right }));

		setShuffledLeft(shuffleArray(leftItems));
		setShuffledRight(shuffleArray(rightItems));
	}, []);

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
			<h1 className="text-2xl font-extrabold text-moneyconf-purple">
				Tap the matching boxes
			</h1>
			<div className="flex flex-row items-center space-x-7">
				<div className="animate-jump animate-infinite animate-duration-1000">
					<Image
						src="./astronaut-money-bags.svg"
						alt="Astronaut Kick"
						width={0}
						height={0}
						className="w-32 h-auto"
					/>
				</div>
				<div className="text-lg font-extrabold text-moneyconf-purple flex items-center w-52 h-32 border-[2.5px] border-moneyconf-purple rounded-3xl">
					<h2>Match the charity logo with its description</h2>
				</div>
			</div>
			<div className="flex flex-row space-x-4">
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
				click={() => router.push("/celebration")}
			/>
		</div>
	)
}

export default MatchingGamePage;