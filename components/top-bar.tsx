import { TopBarButton } from "./topbar-button";
import { RankBar } from "./rank-bar";
import { Points } from "./points";
import { StreakIcon } from "./streak-icon";

import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import randomBannerNames from "@/src/randomBannerNames";

export const TopBar = () => {
    return (
        <div className="w-full h-[90px] fixed z-50 bg-white">
            <div className={"px-2 max-w-[600px] h-full mx-auto flex items-center justify-center space-x-10"}>
            <TopBarButton
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
                //points={getCurrentUser()?.score}
                points={1500}
            />
            </div>
        </div>
    );
};
