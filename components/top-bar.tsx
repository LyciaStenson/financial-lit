import { TopBarButton } from "./topbar-button";
import { RankBar } from "./rank-bar";
import { Points } from "./points";
import { StreakIcon } from "./streak-icon";

import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";

export const TopBar = () => {

    console.log(getCurrentUser());

    return (
        <div className="fixed w-full h-[90px] z-50 bg-white">
            <div className={"flex items-center justify-center space-x-2 mx-auto max-w-[400px]"}>
                <TopBarButton
                    alt="Home"
                    iconSrc="./astronaut-peace.svg"
                    href="/home"
                />
                <StreakIcon
                    streak={5}
                />
                <RankBar
                    points={getCurrentUser()?.score}
                />
                <Points
                    points={getCurrentUser()?.score}
                    //points={12551}
                />
            </div>
        </div>
    );
};
