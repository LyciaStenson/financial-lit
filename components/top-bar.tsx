import { TopBarItem } from "./topbar-button";
import { RankBar } from "./rank-bar";
import { Points } from "./points";
import { StreakIcon } from "./streak-icon";

import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import randomBannerNames from "@/src/randomBannerNames";

export const TopBar = () => {
    return (
        <div className="w-full h-[90px] bg-white fixed z-50">
            <div className={"gap-[48px] max-w-[850px] mx-auto flex items-center justify-center space-x-4 top-0"}>
            <TopBarItem
                alt="Home"
                iconSrc="./astronaut-peace.svg"
                href="/home"
            />
            <StreakIcon
                streak={5}
            />
            <RankBar
                points={1000}
            />
            <Points
                points={getCurrentUser()?.score}
            />
            </div>
        </div>

    );
};
