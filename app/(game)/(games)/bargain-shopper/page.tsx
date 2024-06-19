"use client";

import Image from "next/image";
import ContinueButton from "../../continue-button";
import { useState } from 'react';
import Picker from 'react-mobile-picker';
import shuffle from "@/src/random/shuffle";
import { useRouter } from "next/navigation";

type Selections = {
	value: string[];
}

const ShuffleSelections = (selections: Selections) => {
	const shuffledSelections = selections;
	selections.value = shuffle(selections.value);
	return shuffledSelections;
}

const BargainShopperPage = () => {
	const CheckAnswer = () => {
		if (pickerValue.value == correctAnswer) {
			// Get next question here when using Firebase
			router.push("/celebration");
		}
	}

	const router = useRouter();

	const selections : Selections = { value: ["Water", "PlayStation 5", "McDonald's", "Netflix", "Prime", "A new scooter", "A new pencil case"]};

	const [shuffledSelections] = useState(ShuffleSelections(selections));

	const correctAnswer = "Water";

	const [pickerValue, setPickerValue] = useState({ value: "" });
	//value: selections.value[selections.value.length / 2]
	
	return (
		<div className="flex flex-col items-center justify-center text-center space-y-5">
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
					<h2>Which of these is a Need?</h2>
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
						{Object.keys(shuffledSelections).map((name: string) => (
							<Picker.Column key={name} name={name}>
								{shuffledSelections.value.map((option: string) => (
									<Picker.Item key={option} value={option}>
										{({ selected }) => (
											<div className={selected ? "text-moneyconf-purple" : "text-black text-opacity-40"}>
												{option}
											</div>
										)}
									</Picker.Item>
								))}
							</Picker.Column>
						))}
					</Picker>
				</div>
			</div>
			<ContinueButton
				text="Lock in guess"
				disabled={pickerValue.value == ""}
				click={CheckAnswer}
			/>
		</div>
	)
}

export default BargainShopperPage;