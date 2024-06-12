'use client';

import Image from "next/image";
import Leaderboard from "./leaderboard";

const AllSchoolLeaderboardGamePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-5 border">
      <div className="flex w-full px-5 items-center justify-center">
        <Image
          src="./school.svg"
          alt="School"
          width={0}
          height={0}
          className="w-auto h-20"
        />
        <div className="w-96 h-24 rounded-2xl text-center flex items-center justify-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple space-x-2">
          <h1 className="text-xl font-extrabold">
            Schools&apos; Leaderboard
          </h1>
        </div>
      </div>
      <Leaderboard placement={1} school="School" score={822456} isUser/>
      <Leaderboard placement={2} school="School" score={719112} isUser/>
      <Leaderboard placement={3} school="School" score={618783} isUser/>
      <Leaderboard placement={4} school="School" score={518659} isUser/>
      <Leaderboard placement={5} school="School" score={418422} isUser/>
    </div>
  )
}

export default AllSchoolLeaderboardGamePage;