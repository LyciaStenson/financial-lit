'use client';

import Image from "next/image";
import TextBoxes from "./text-boxes";
import { getRandom } from "@/src/random/randomNumberGenerator";
import { useState } from "react";
import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { TopBar } from "@/components/top-bar";
import LeaderboardEntry from "./leaderboard-entry";

const ProfilePointsGamePage = () => {

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
      <div className="flex w-full px-5 items-center justify-center">
        <div className="w-96 h-20 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
          <h1 className="text-xl font-extrabold">
            Adam's money Confidence
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
          <TextBoxes text="5 Day Steak!" />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src="./astronaut-rising-bars.svg"
              alt="Astronaut Rising"
              width={0}
              height={0}
              className="w-auto h-32"
            />
            <TextBoxes text="Level: 99 Maifa Boss" />
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
            <h3 className="text-sm text-moneyconf-purple font-extrabold"> Points: 12,551 </h3>
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
        <LeaderboardEntry placement={15} name="Jack" score={12789} isUser={false}/>
        <LeaderboardEntry placement={16} name="Cameron" score={12695} isUser={false}/>
        <LeaderboardEntry placement={17} name="Adam" score={12551} isUser={true}/>
        <LeaderboardEntry placement={18} name="Sarah" score={12512} isUser={false}/>
        <LeaderboardEntry placement={19} name="Oliver" score={12497} isUser={false}/>
      </div>
      <div className="w-96 h-20 px-5 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
        <h1 className="text-xl font-extrabold">
          School Top Three Leaders
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
            Emperor
          </h1>
          <h1 className="text-sm font-extrabold px-1">
            Olivia:
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
            Commander
          </h1>
          <h1 className="text-sm font-extrabold px-1">
            Alex:
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
            Centurion
          </h1>
          <h1 className="text-sm font-extrabold px-1">
            Sophie:
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