import Image from "next/image";
import { TopBar } from "../top-bar";
import Continue from "./continue";
import { Button } from "@/components/ui/button";
import TextBoxes from "./text-boxes";

const MoreOrLessGamePage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5 border">
            <TopBar />
            <h1 className="text-2xl font-extrabold text-moneyconf-purple">
                Tap the correct box
            </h1>
            <div className="flex flex-row items-center space-x-10">
                <Image
                    src="./astronaut-choice.svg"
                    alt="Astronaut choice"
                    width={0}
                    height={0}
                    className="w-28 h-auto"
                />
                <div className="text-lg font-extrabold text-moneyconf-purple w-48 h-24 border-[2.5px] flex flex-col items-center justify-center border-moneyconf-purple rounded-3xl">
                    <h2>Does it cost more</h2>
                    <h2>or less?</h2>
                </div>
            </div>
            <div className="flex flex-col space-y-10 items-center justify-center">
                <Button className="w-96 h-16 rounded-3xl flex items-center justify-center bg-moneyconf-green border-4 border-dashed border-moneyconf-purple">
                    <h3 className="text-2xl text-moneyconf-purple font-extrabold"> {"More"} </h3>
                </Button>
                <div className="flex flex-row space-x-10 items-center justify-center">
                    <div className="w-52 h-56 flex items-center justify-center rounded-3xl bg-moneyconf-grey border-4">
                    <Image
                        src="./astronaut-choice.svg"
                        alt="Astronaut choice"
                        width={0}
                        height={0}
                        className="w-28 h-auto"
                    />
                    </div>                  
                    <TextBoxes text = "£250"/>
                </div>               
                <Button className="w-96 h-16 rounded-3xl flex items-center justify-center bg-moneyconf-red border-4 border-dashed border-moneyconf-purple">
                    <h3 className="text-2xl text-moneyconf-purple font-extrabold"> {"Less"} </h3>
                </Button>
            </div>
            <Continue text = "Continue"/>
        </div>
    )
}

export default MoreOrLessGamePage;