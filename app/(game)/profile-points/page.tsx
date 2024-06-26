'use client';

import Image from "next/image";
import TextBoxes from "./text-boxes";
import { getRandom } from "@/src/random/randomNumberGenerator";
import { useState } from "react";
import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { TopBar } from "@/components/top-bar";
import LeaderboardEntry from "./leaderboard-entry";
import { PointsToRank } from "@/src/points-to-rank";
import useUser from "@/Hooks/AuthUserContext";

const ProfilePointsGamePage = () => {

  const [number, setNumber] = useState<string[]>();

  const [user, loading, error] = useUser();

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

  function ordinal_suffix_of(i:number) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-5 border">
      <TopBar
        streak = {user?.streak!}
        score = {user?.score!}
      />
      <div className="flex w-full px-5 items-center justify-center">
        <div className="w-96 h-20 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
          <h1 className="text-xl font-extrabold">
            {user?.displayName}&#x2019;s money Confidence
          </h1>
        </div>
      </div>
      <div className="flex flex-row items-end justify-center space-x-2">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image
            src="./lightning.svg"
            alt="Lightning"
            width={0}
            height={0}
            className="w-auto h-32"
          />
          <TextBoxes text= {user?.streak! + " Day Steak!"} />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src="./astronaut-rising-bars.svg"
              alt="Astronaut Rising"
              width={0}
              height={0}
              className="w-auto h-32"
            />
            <TextBoxes text={PointsToRank(user?.score!)} />
          </div>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <div className="animate-jump animate-delay-500 animate-thrice animate-duration-1000">
            <Image
              src="./astronaut-laying-on-coins.svg"
              alt="Astronaut Laying on Coins"
              width={0}
              height={0}
              className="w-48 h-auto"
            />
          </div>
          <div className="text-lg font-extrabold text-moneyconf-purple w-40 border-[2.5px] border-moneyconf-purple rounded-md stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 px-2">
            <h3 className="text-sm text-moneyconf-purple font-extrabold"> Points: {user?.score!.toLocaleString()} </h3>
          </div>
        </div>
        <div className="flex flex-row space-x-2">       
      </div>
      <div className="w-96 h-20 px-5 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
        <h1 className="text-xl font-extrabold">
          School Points Leaderboard
        </h1>
      </div>
      <div className="flex flex-col px-5 items-center justify-center space-y-1">
        <LeaderboardEntry placement={ordinal_suffix_of(23)} rank={PointsToRank(12789)} score={"12,789"}/>
        <LeaderboardEntry placement={ordinal_suffix_of(22)} rank={PointsToRank(12695)} score={"12,695"}/>
        <LeaderboardEntry placement={"You"} rank={PointsToRank(user?.score!)} score={user?.score!.toLocaleString()}/>
        <LeaderboardEntry placement={ordinal_suffix_of(20)} rank={PointsToRank(12512)} score={"12,512"}/>
        <LeaderboardEntry placement={ordinal_suffix_of(11)} rank={PointsToRank(12497)} score={"12,497"}/>
      </div>
      <div className="w-96 h-20 px-5 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
        <h1 className="text-xl font-extrabold">
          School Top Three Scores
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center px-5">
        <Image
          src="./astronaut-emperor.svg"
          alt="Emperor"
          width={0}
          height={0}
          className="w-auto h-24"
        />
        <Image
          src="./trophy-gold.svg"
          alt="Trophy Gold"
          width={0}
          height={0}
          className="w-auto h-24"
        />
        <div className=" w-[15rem] h-16 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
          <h1 className="text-sm font-extrabold">
            Emperor:
          </h1>
          <h1 className="text-sm font-extrabold px-1">
            22,456
          </h1>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center px-5">
        <Image
          src="./astronaut-roman-silver.svg"
          alt="Roman Silver"
          width={0}
          height={0}
          className="w-auto h-24"
        />
        <Image
          src="./trophy-silver.svg"
          alt="Trophy Silver"
          width={0}
          height={0}
          className="w-auto h-24"
        />
        <div className=" w-[15rem] h-16 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-grey py-2 text-moneyconf-purple border-moneyconf-purple">
          <h1 className="text-sm font-extrabold">
            Commander:
          </h1>
          <h1 className="text-sm font-extrabold px-1">
            19,112
          </h1>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center px-5 pb-20">
        <Image
          src="./astronaut-roman-gold.svg"
          alt="Roman Bronze"
          width={0}
          height={0}
          className="w-auto h-24"
        />
        <Image
          src="./trophy-bronze.svg"
          alt="Trophy Bronze"
          width={0}
          height={0}
          className="w-auto h-24"
        />
        <div className=" w-[15rem] h-16 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-orange-400 py-2 text-moneyconf-purple border-moneyconf-purple">
          <h1 className="text-sm font-extrabold">
            Centurion:
          </h1>
          <h1 className="text-sm font-extrabold px-1">
            18,783
          </h1>
        </div>
      </div>
    </div>
  )
}

export default ProfilePointsGamePage;