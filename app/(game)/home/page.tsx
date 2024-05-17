"use client"

import { useEffect, useState } from "react";
import { Banner } from "./banner";
import { LessonButton } from "./lesson-button";
import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import randomBannerNames from "@/src/randomBannerNames";

const GamePage = () => {
    const [currentUser, setCurrentUser] = useState(getCurrentUser()); 

    const lessonHrefs = ["drag", "matching", "order", "pick-correct", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home", "home"];
    
    useEffect(() => {
            setCurrentUser(getCurrentUser());
        }, [getCurrentUser()]);
    
    return (
        <div>
            <Banner title={`${ currentUser?.dispalyName }’s Money Confidence Month: Day 6`} description={"You’re back for more I see... Okay, let’s do this"} />
            <div className="flex flex-col items-start relative py-4 space-y-2">
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

export default GamePage;
