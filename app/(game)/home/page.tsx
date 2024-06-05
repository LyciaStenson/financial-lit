"use client";

import { Banner } from "./banner";
import { LessonButton } from "./lesson-button";
import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { loadQuiz } from "@/src/Game/quiz/quiz";
import Image from "next/image";
import { TopBar } from "@/components/top-bar";

const HomePage = () => {
    const lessonHrefs = ["drag", "pick-correct", "drag-bar", "matching", "order", "more-or-less", "triple-scrolling", "interest", "scrolling", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home"];

    loadQuiz();

    return (
        <div>
            <TopBar streak = {getCurrentUser()?.streak!}/>
            <Banner title={`${ getCurrentUser()?.dispalyName }’s Money Confidence Month: Day 8`} description={"You’re back for more I see... Okay, let’s do this"} />
            <div className="flex flex-row items-center relative">
                <Image
                    src="./astronaut-surfing-rocket.svg"
                    alt="Astronaut surfing"
                    width={0}
                    height={0}
                    className="w-48 h-auto absolute bottom-[-400px] left-[25px]"
                />
                <Image
                    src="./astronaut-chef.svg"
                    alt="Astronaut chef"
                    width={0}
                    height={0}
                    className="w-32 h-auto absolute bottom-[-750px] left-[200px]"
                />
                <Image
                    src="./astronaut-gamer.svg"
                    alt="Astronaut gamer"
                    width={0}
                    height={0}
                    className="w-36 h-auto absolute bottom-[-1075px] left-[55px]"
                />
                <Image
                    src="./astronaut-boombox.svg"
                    alt="Astronaut boombox"
                    width={0}
                    height={0}
                    className="w-40 h-auto absolute bottom-[-1425px] left-[200px]"
                />
                <Image
                    src="./astronaut-lightning-bolt.svg"
                    alt="Astronaut lighting"
                    width={0}
                    height={0}
                    className="w-48 h-auto absolute bottom-[-1765px] left-[25px]"
                />
                <Image
                    src="./astronaut-laying-on-coins.svg"
                    alt="Astronaut on coins"
                    width={0}
                    height={0}
                    className="w-56 h-auto absolute bottom-[-2050px] left-[150px]"
                />
            </div>
            <div className="pt-20 px-5 grid grid-cols-4">
            {lessonHrefs.map((lessonHref, index) => (
                <LessonButton
                    day={index + 1}
                    href={lessonHref}
                    key={index}
                />
            ))}
            </div>
        </div>
    );
};

export default HomePage;
