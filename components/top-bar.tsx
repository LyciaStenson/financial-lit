import { TopBarButton } from "./topbar-button";
import { RankBar } from "./rank-bar";
import { Points } from "./points";
import { StreakIcon } from "./streak-icon";

import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import randomBannerNames from "@/src/randomBannerNames";

export const TopBar = () => {
    return (
        <div className="fixed mx-auto max-w-[450px] h-[90px] z-50 bg-white">
            <div className={"flex items-center justify-center space-x-2"}>
            <TopBarButton
                alt="Home"
                iconSrc="./astronaut-peace.svg"
                href="/home"
            />
            <StreakIcon
                streak={5}
            />
            <RankBar
                points={12551}
            />
            <Points
                //points={getCurrentUser()?.score}
                points={12551}
            />
            </div>
        </div>
    );
};
