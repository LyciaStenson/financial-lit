import { TopBarButton } from "./topbar-button";
import { RankBar } from "./rank-bar";
import { Points } from "./points";
import { StreakIcon } from "./streak-icon";

import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";

type Props = {
    streak: number;
    score: number;
}

export const TopBar = ({ streak, score }: Props) => {
    return (
        <div className="w-full h-[90px] z-50 bg-white">
            <div className={"flex items-center justify-center space-x-2 mx-auto max-w-[400px]"}>
                <TopBarButton
                    alt="Home"
                    iconSrc="./astronaut-peace.svg"
                    href="/home"
                />
                <StreakIcon
                    streak={streak}
                />
                <RankBar
                    points={score}
                />
                <Points
                    points={score}
                />
            </div>
        </div>
    );
};
