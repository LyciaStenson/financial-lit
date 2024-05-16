import Image from "next/image";
import { TopBar } from "../top-bar";
import Continue from "./continue";
import { Slider } from "@/components/ui/slider"


const DragBarGamePage = () => {
    return (
        <div className="flex flex-col space-y-5 border">
            <TopBar />
            <h1 className="text-3xl font-extrabold text-moneyconf-purple items-center justify-center text-center ">
            Drag the circle to reach the correct number price
            </h1>
            <div className="flex flex-row space-x-10 items-center justify-center text-center">
                <Image
                    src="./astronaut-laying-on-coins.svg"
                    alt="Astronaut laying"
                    width={0}
                    height={0}
                    className="w-40 h-auto"
                />
                <div className="text-2xl font-extrabold text-moneyconf-purple w-70 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                    <h2 className="text-2xl">Guess the price!</h2>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6">
            </div>
            <div className="flex flex-row space-x-20 items-center justify-center text-center">
                <div className="flex flex-row space-x-10 items-center justify-center text-center">
                    <Slider defaultValue={[50]} max={100} step={1} className="w-5 h-56" orientation="vertical"/>
                </div>
                <Image
                    src="./trophy-gold.svg"
                    alt="Price item"
                    width={0}
                    height={0}
                    className="w-32 h-auto"
                />
            </div>
            <div className="flex items-center justify-center text-center">
                <div  className="w-56 h-24 rounded-3xl flex items-center justify-center text-center bg-moneyconf-grey border-4 border-dashed border-moneyconf-grey">
                    <h3 className="underline text-3xl font-extrabold text-moneyconf-purple"> {"£50"} </h3>
                </div>
            </div>
            
            <div className="flex items-center justify-center text-center" >
                <Continue text = "Lock in guess"/>
            </div>
        </div>
    )
}

export default DragBarGamePage;