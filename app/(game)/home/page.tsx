"use client";

import { Banner } from "./banner";
import { LessonButton } from "./lesson-button";
import Image from "next/image";
import { TopBar } from "@/components/top-bar";
import useUser from "@/Hooks/AuthUserContext";
import { getCurrentDay } from "@/src/FirebaseBridge/Auth/signIn";
import { forwardRef, useEffect, useState } from "react";
import { useBonusScoreContext } from "@/Hooks/BonusScore";
import { getRandom } from "@/src/random/randomNumberGenerator";
import { redirect } from "next/navigation";
import useDataCollection from "@/Hooks/LoadQuestionContext";

const HomePage = () => {
    const lessonHrefs = [
        "drag", "pick-correct", "pick-correct-long", "drag-bar", "matching", "order",
        "more-or-less", "triple-scrolling", "interest", "scrolling",
        "home", "home", "home", "home", "home", "home", "home",
        "home", "home", "home", "home", "home", "home", "home",
        "home", "home", "home", "home", "home", "home"
    ];
    
    const [user, loading, error] = useUser();

    const [day, setDay] = useState<number>(0);

    const { setBonus } = useBonusScoreContext();

    const generateBonus = () => {
        let numb = getRandom();
        let digits = ("" + numb).split("");
        if (digits.length <= 2) {
            digits.unshift("0")
        }
        console.log(digits);

        return digits;
    }

    useEffect(() => {
        if (user) {
            getCurrentDay(user).then((value) => {
                setDay(value);
            })

            setBonus(generateBonus());
        }
    }, [user]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Banner title="Loading your account"
                    description={"We are gathering your details... Please be patient"} />
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Banner title="Error"
                    description={`${error.message}`} />
            </div>
        )
    }

    if (user) {
        if(user.role == "none"){
            return redirect("/");
        }
        return (
            <div>
                <TopBar streak={user.streak || 0} score={user.score || 0} />
                <Banner
                    title={`${user.displayName ?? "No Name"}’s Money Confidence Month: Day ${day}`}
                    description={"You’re back for more I see... Okay, let’s do this"}
                />
                <div className="flex flex-row items-center relative">
                    <Image
                        src="./astronaut-surfing-rocket.svg"
                        alt="Astronaut surfing"
                        width={0}
                        height={0}
                        className="w-48 h-auto absolute bottom-[-400px] left-[25px]"
                        priority
                    />
                    <Image
                        src="./astronaut-chef.svg"
                        alt="Astronaut chef"
                        width={0}
                        height={0}
                        className="w-32 h-auto absolute bottom-[-750px] left-[200px]"
                        priority
                    />
                    <Image
                        src="./astronaut-gamer.svg"
                        alt="Astronaut gamer"
                        width={0}
                        height={0}
                        className="w-36 h-auto absolute bottom-[-1075px] left-[55px]"
                        priority
                    />
                    <Image
                        src="./astronaut-boombox.svg"
                        alt="Astronaut boombox"
                        width={0}
                        height={0}
                        className="w-40 h-auto absolute bottom-[-1425px] left-[200px]"
                        priority
                    />
                    <Image
                        src="./astronaut-lightning-bolt.svg"
                        alt="Astronaut lighting"
                        width={0}
                        height={0}
                        className="w-48 h-auto absolute bottom-[-1765px] left-[25px]"
                        priority
                    />
                    <Image
                        src="./astronaut-laying-on-coins.svg"
                        alt="Astronaut on coins"
                        width={0}
                        height={0}
                        className="w-56 h-auto absolute bottom-[-2050px] left-[150px]"
                        priority
                    />
                </div>
                <div className="pt-20 px-5 grid grid-cols-4">
                    {lessonHrefs.map((lessonHref, index) => (
                        <LessonButton
                            userDay={day}
                            streak={user.streak!}
                            day={index + 1}
                            href={lessonHref}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        );
    }
    return <div className="h-screen flex items-center justify-center">
        <Banner title="You are not a user"
            description={"Are you sure you have an account"} />
    </div>
};

export default HomePage;


const MyInput = forwardRef(function MyInput(props, ref) {
    return (
      <label>
      </label>
    );
  });