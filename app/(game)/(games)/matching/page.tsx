import Image from "next/image";
import MatchingBoxes from "./matching-boxes";
import Continue from "./continue";

const MatchingGamePage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5 border">
            <h1 className="text-2xl font-extrabold text-moneyconf-purple">
                Tap the matching boxes
            </h1>
            <div className="flex flex-row items-center space-x-10">
                <Image
                    src="./astronaut-money-bags.svg"
                    alt="Astronaut Kick"
                    width={0}
                    height={0}
                    className="w-32 h-auto"
                />
                <div className="text-lg font-extrabold text-moneyconf-purple w-44 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                    <h2>Match the charity</h2>
                    <h2>logo with its</h2>
                    <h2>description</h2>
                </div>
            </div>
            <div className="flex flex-row space-x-4">
                <MatchingBoxes one = "Match" two = "Match" three = "Match" four = "Match"/>
                <MatchingBoxes one = "07" two = "07" three = "07" four = "07"/> 
            </div>
            <Continue text = "Continue"/>
        </div>
    )
}

export default MatchingGamePage;