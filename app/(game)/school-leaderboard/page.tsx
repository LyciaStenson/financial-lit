'use client';

import Image from "next/image";
import TextBoxes from "./text-boxes";
import { getRandom } from "@/src/random/randomNumberGenerator";
import { useState } from "react";
import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { TopBar } from "@/components/top-bar";
import LeaderboardEntry from "./leaderboard";
import Leaderboard from "./leaderboard";

const SchoolLeaderboardGamePage = () => {

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
      <TopBar
        streak = {getCurrentUser()?.streak!}
        score = {getCurrentUser()?.score!}
      />
      <div className="flex w-full px-5 items-center justify-center">
        <div className="w-96 h-24 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple space-x-2">
          <Image
            src="./astronaut-rising-bars.svg"
            alt="Astronaut Rising"
            width={0}
            height={0}
            className="w-auto h-20"
          />
          <h1 className="text-xl font-extrabold">
            School Points Leaderboard
          </h1>
        </div>
      </div>
      <h1 className="text-xl font-extrabold text-moneyconf-purple">
        Example School
      </h1>
      <Leaderboard placement={1} name="Name" year={3} score={22456} isUser/>
      <Leaderboard placement={2} name="Name" year={3} score={19112} isUser/>
      <Leaderboard placement={3} name="Name" year={3} score={18783} isUser/>
      <Leaderboard placement={4} name="Name" year={3} score={18659} isUser/>
      <Leaderboard placement={5} name="Name" year={3} score={18422} isUser/>
    </div>
  )
}

export default SchoolLeaderboardGamePage;