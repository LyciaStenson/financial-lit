import { cn  } from "@/lib/utils"
import { SideBarItem } from "./sider-bar-item";
import { RankBar } from "./rank-bar";

type Props = {
    className?: string;
};

export const SideBar = ({ className }: Props) => {
    return (
        <div className={cn("flex flex-col space-y-4 md:h-full md:w-[256px] md:fixed left-0 top-4 px-4 border-r-2 border-slate-200", className)}>
            <h1 className="text-2xl font-extrabold text-moneyconf-blue tracking-wide">My Money Confidence</h1>
            <SideBarItem
                label="Home"
                iconSrc="./astronaut.svg"
                href="/home"
            />
            <SideBarItem
                label="Leaderboard"
                iconSrc="./astronaut.svg"
                href="/leaderboard"
            />
            <RankBar
                points={1000}
            />
        </div>
    );
};
