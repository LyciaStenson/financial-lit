'use client';

import Image from "next/image";
import Continue from "./continue";
import TextBoxes from "./text-boxes";
import { Banner } from "./banner";
import { Button } from "@/components/ui/button";
import { getRandom } from "@/src/random/randomNumberGenerator";
import { useState } from "react";
import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { TopBar } from "@/components/top-bar";

const ActivityGamePage = () => {

  const [number, setNumber] = useState<string[]>();

  const getMorePoints = (event:React.MouseEvent<HTMLButtonElement | null>) => {
    let numb = getRandom();
    let digits = ("" + numb).split("");
    if(digits.length <= 2){
      digits.unshift("0")
    }
    console.log(digits);
    setNumber(digits);
    event.currentTarget.disabled = true;
  }

  console.log("streak:"+ getCurrentUser()?.streak!)

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-5 border">
      <TopBar streak = {getCurrentUser()?.streak!}/>
      <Banner title="Day 6" description="Adam's money Confidence" />
      <div className="flex flex-row items-end justify-center space-x-2">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image
            src="./tick-symbol.svg"
            alt="Tick"
            width={0}
            height={0}
            className="w-auto h-20"
          />
          <h3 className="text-sm text-moneyconf-purple font-extrabold"> Correct answers </h3>
          <TextBoxes text="4 out of 6" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image
            src="./stopwatch.svg"
            alt="Clock"
            width={0}
            height={0}
            className="w-auto h-20"
          />
          <h3 className="text-sm text-moneyconf-purple font-extrabold"> Time </h3>
          <TextBoxes text="2 min 26 secs" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image
            src="./astronaut-holding-coins.svg"
            alt="Astronaut coins"
            width={0}
            height={0}
            className="w-auto h-20"
          />
          <h3 className="text-sm text-moneyconf-purple font-extrabold"> Points earned </h3>
          <TextBoxes text="1,153" />
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="text-lg font-extrabold text-moneyconf-purple w-72 border-[2.5px] border-moneyconf-purple rounded-md stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2">
          <h3 className="text-sm text-moneyconf-purple font-extrabold"> You’ve smashed today’s challenge! </h3>
          <h3 className="text-sm text-moneyconf-purple font-extrabold"> Your extra bonus is ... </h3>
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="animate-jump animate-delay-500 animate-thrice animate-duration-1000">
          <Image
            src="./safe.svg"
            alt="Safe"
            width={0}
            height={0}
            className="w-48 h-auto"
          />
        </div>
        <Image
          src="./arrow-gold.svg"
          alt="Arrow Gold"
          width={0}
          height={0}
          className="w-auto h-32"
        />
      </div>
      <div className="flex flex-row space-x-2">
        <div className="w-14 h-20 flex items-center justify-center text-2xl font-extrabold text-moneyconf-purple border-moneyconf-grey-border rounded-md bg-moneyconf-grey border-4 border-dashed">
          {number && (
            <h1 className="animate-jump">{number![0].toString()}</h1>
          )}
        </div>
        <div className="w-14 h-20 flex items-center justify-center text-2xl font-extrabold text-moneyconf-purple border-moneyconf-grey-border rounded-md bg-moneyconf-grey border-4 border-dashed">
          {number && (
            <h1 className="animate-jump">{number![1].toString()}</h1>
          )}
        </div>
        <div className="w-14 h-20 flex items-center justify-center text-2xl font-extrabold text-moneyconf-purple border-moneyconf-grey-border rounded-md bg-moneyconf-grey border-4 border-dashed">
          {number && (
            <h1 className="animate-jump">{number![2].toString()}</h1>
          )}
        </div>
        <Button
          className={"w-[90px] h-[90px] border-[2.5px] shadow-[inset_0_-11px_0px_rgba(0,0,0,0.3),inset_0_3px_0px_rgb(255,255,255,0.7)] stripes stripes-size-[200px] stripes-opacity-20 stripes-white"}
          variant="lessonCompleted"
          shape="round"
          onClick={getMorePoints}
        >
          <div>
            <div className="w-[70px] h-[70px] text-moneyconf-purple bg-stripes border-moneyconf-blue border-[2.5px] rounded-full flex flex-col items-center justify-center">
              <p className="text-xs">Reveal</p>
              <p className="text-xs">Bonus</p>
              <p className="text-xs">Points</p>
            </div>
          </div>
        </Button>
      </div>
      <Continue text="Home" />
    </div>
  )
}

export default ActivityGamePage;