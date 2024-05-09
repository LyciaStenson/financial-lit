import { TopbarItem } from "./topbar-button";
import { Rankbar } from "./rankbar";
import { Points } from "./points";
import { StreakIcon } from "./streak-icon";

export const Topbar = () => {
    return (
        <div className="w-full h-[90px] bg-white fixed z-50">
            <div className={"gap-[48px] max-w-[850px] mx-auto flex items-center justify-center space-x-4 top-0"}>
            <TopbarItem
                alt="Home"
                iconSrc="./astronaut-peace.svg"
                href="/home"
            />
            <StreakIcon
                streak={5}
            />
            <Rankbar
                points={1000}
            />
            <Points
                points={12551}
            />
            </div>
        </div>

    );
};
