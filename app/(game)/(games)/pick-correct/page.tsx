import Image from "next/image";
import { TopBar } from "../top-bar";
import Continue from "./continue";
import PickBoxes from "./pick-boxes";
import PickBox from "./pick-box";

const PickCorrectGamePage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5">
            <TopBar />
            <h1 className="text-3xl font-extrabold text-moneyconf-purple">
                Click the correct answer
            </h1>
            <div className="flex flex-row items-center space-x-10">
                <Image
                    src="./astronaut-holding-coins.svg"
                    alt="Astronaut Coins"
                    width={0}
                    height={0}
                    className="w-40 h-auto"
                />
                <div className="text-2xl font-extrabold text-moneyconf-purple w-70 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                    <h2>How many Yen</h2>
                    <h2>would I get for...</h2>
                    <h2 className="text-5xl">£3</h2>
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-center justify-center">
                <div  className=" text-1xl space-y-2 rounded-full font-extrabold text-moneyconf-purple p-3 border-[2.5px] bg-moneyconf-gold">
                    <h3 className="underline"> {"Currency Conversion Table"} </h3>
                    <h3> {"Every Pound is worth 200 Yen"} </h3>
                    <h3> {"£ 1 = ¥ 200"} </h3>
                </div>
                <Image
                    src="./calculator.svg"
                    alt="Calculator"
                    width={0}
                    height={0}
                    className="w-40 h-auto"
                />
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
                <PickBoxes one = "600" two = "6"/>
                <PickBox one = "200"/>
                <PickBoxes one = "100" two = "800"/> 
            </div>
            <Continue text = "Continue"/>
        </div>
    )
}

export default PickCorrectGamePage;