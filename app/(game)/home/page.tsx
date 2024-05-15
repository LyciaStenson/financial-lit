'use client';

import { useEffect, useState } from "react";
import { Banner } from "./banner";
import { LessonButton } from "./lesson-button";
import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import randomBannerNames from "@/src/randomBannerNames";

const GamePage = () => {
    const [currentUser, setCurrentUser] = useState(getCurrentUser()); 

    
    useEffect(() => {
            setCurrentUser(getCurrentUser());
        }, [getCurrentUser()]);

    return (
        <div>
            <div className="gap-[48px] px-6">
                <Banner title={`Welcome ${ currentUser?.dispalyName } you are on day 6`} description={randomBannerNames()}></Banner>
            </div>
        <div className="flex flex-col items-center justify-center relative py-6 space-y-4">
            <LessonButton
            day={1}
            />

            <LessonButton
            day={2}
            />

            <LessonButton
            day={3}
            />

            <LessonButton
            day={4}
            />

            <LessonButton
            day={5}
            />

            <LessonButton
            day={6}
            />

            <LessonButton
            day={7}
            />

            <LessonButton
            day={8}
            />
            <LessonButton
            day={9}
            />

            <LessonButton
            day={10}
            />

            <LessonButton
            day={11}
            />

            <LessonButton
            day={12}
            />

            <LessonButton
            day={13}
            />

            <LessonButton
            day={14}
            />

            <LessonButton
            day={15}
            />

            <LessonButton
            day={16}
            />
        </div>
        </div>
    );
};

export default GamePage;
