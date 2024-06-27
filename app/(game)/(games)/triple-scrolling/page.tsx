'use client';

import Image from "next/image";
import ContinueButton from "../../continue-button";
import TextBoxes from "./text-boxes";
import ScrollerBox from "./scroller";

const TripleScrollingGamePage = () => {
	return (
		<div className="flex flex-col items-center justify-center text-center space-y-5 border">
			<h1 className="text-xl font-extrabold text-moneyconf-purple p-2">
				Scroll the dials to chose your budget!
			</h1>
			<div className="flex flex-row items-center space-x-10">
				<div className="animate-jump animate-infinite animate-duration-1000">
					<Image
						src="./astronaut-laptop.svg"
						alt="Astronaut laptop"
						width={0}
						height={0}
						className="w-32 h-auto"
					/>
				</div>
				<div className="text-lg font-extrabold text-moneyconf-purple w-48 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
					<h2>Remaining</h2>
					<h2>monthly salary =</h2>
					<h2>£ 2500</h2>
				</div>
			</div>
			<div className="flex flex-row items-center justify-center space-x-2">
				<div className="flex flex-col items-center justify-center space-y-2">
					<TextBoxes text="Needs" />
					<ScrollerBox />
				</div>
				<div className="flex flex-col items-center justify-center space-y-2">
					<TextBoxes text="Wants" />
					<ScrollerBox />
				</div>
				<div className="flex flex-col items-center justify-center space-y-2">
					<TextBoxes text="Savings" />
					<ScrollerBox />
				</div>
			</div>
			<div className="flex flex-row space-x-4">
			</div>
			<ContinueButton
				text="Lock in guess"
				disabled={false}
				incorrect={false}
			/>
		</div>
	)
}

export default TripleScrollingGamePage;