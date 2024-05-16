'use client';

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
            <div className="gap-[48px] px-6">
                <Banner title={`Welcome ${ currentUser?.dispalyName } you are on day 6`} description={"Guess who's back? Back again"}></Banner>
            </div>
            <div className="flex flex-col items-start relative py-6 space-y-4">
                {lessonHrefs.map((lessonHref, index) => (
                    <LessonButton
                        day={index + 1}
                        href={lessonHref}
                    />
                ))}
            </div>
        </div>
    );
};

export default GamePage;
