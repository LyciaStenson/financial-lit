'use client';

import Image from "next/image";
import Continue from "./continue";
import TextBoxes from "./text-boxes";
import { Banner } from "./banner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { isDayCompleted, setDayCompleted, setScore, setStreak } from "@/src/FirebaseBridge/Auth/currentUser";
import { TopBar } from "@/components/top-bar";
import useUser from "@/Hooks/AuthUserContext";
import { useDataContext } from "@/Hooks/GetDataFromPage";
import { useBonusScoreContext } from "@/Hooks/BonusScore";

const ActivityGamePage = () => {

  const { value } = useDataContext();

  const { bonus } = useBonusScoreContext();

  const [number, setNumber] = useState<string[]>();

  const [hasRefresh, setHasRefresh] = useState(false);

  const [user, loading, error] = useUser();

  const getMorePoints = (event: React.MouseEvent<HTMLButtonElement | null>) => {

    setNumber(bonus);
    if (!hasRefresh) {
      const bonusString = bonus.join('');
      console.log(user?.score);
      const finalScore = value.points! + parseInt(bonusString);
      setScore(user!, finalScore);
      setStreak(user!, 1);
      setHasRefresh(true);
      event.currentTarget.disabled = true;
      setDayCompleted(user!, value.day!);
    }
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-5 border">
        <TopBar streak={user?.streak!} score={user?.score!} />
        <Banner title="Day 6" description={`${user?.displayName}'s money Confidence`} />
          <div>
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
                <TextBoxes text={`${value.totalAnsweredCorrect} out of ${value.totalQuestions}`} />
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
                <TextBoxes text={`${value.time} Seconds`} />
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
                <TextBoxes text={`${Math.round(value.points!)}`} />
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
                disabled={isDayCompleted(user, value.day!)}
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
          </div>
        <Continue text="Home" />
      </div>
    )
  }
}

export default ActivityGamePage;