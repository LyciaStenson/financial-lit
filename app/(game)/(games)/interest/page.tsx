'use client';

import Image from "next/image";
import Continue from "./continue";
import TextBoxes from "./text-boxes";
import ScrollerBox from "./scroller";

const InterestGamePage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5 border">
            <h1 className="text-xl font-extrabold text-moneyconf-purple p-2">
              Scroll the dials to chose your interest!
            </h1>
            <div className="flex flex-row items-center space-x-10">
                <div className="animate-wiggle-more animate-infinite">
                  <Image
                    src="./astronaut-riding-rocket.svg"
                    alt="Astronaut rocket"
                    width={0}
                    height={0}
                    className="w-32 h-auto"
                />
                </div>
                <div className="text-lg font-extrabold text-moneyconf-purple w-48 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                    <h2>How much</h2>
                    <h2>interest will I</h2>
                    <h2>earn?</h2>
                </div>
            </div>
            <div className="flex flex-row items-start justify-center space-x-2">
              <div className="flex flex-col space-y-2">
                <TextBoxes text = "Bank balance"/>
                  <div className="text-lg font-extrabold text-moneyconf-purple w-28 h-12 flex items-center justify-center border-[2.5px] border-moneyconf-purple rounded-md bg-moneyconf-grey">
                      <h3 className="text-lg text-moneyconf-purple font-extrabold"> {500} </h3>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <TextBoxes text = "Interest rate"/>
                  <div className="text-lg font-extrabold text-moneyconf-purple w-28 h-12 flex items-center justify-center border-[2.5px] border-moneyconf-purple rounded-md bg-moneyconf-grey">
                       <h3 className="text-lg text-moneyconf-purple font-extrabold"> {10 + "%"} </h3>
                    </div>
                </div>
               <div className="flex flex-col items-center justify-center space-y-2">
                <TextBoxes text = "Interest earned in 1 year"/>
                  <ScrollerBox/>
                </div>
              </div>                    
            <div className="flex flex-row space-x-4">
            </div>
            <Continue text = "Lock in guess"/>
        </div>
    )
}

export default InterestGamePage;