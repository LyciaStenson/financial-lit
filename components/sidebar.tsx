import { cn  } from "@/lib/utils"
import { SiderbarItem } from "./siderbar-item";

type Props = {
    className?: string;
};

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn("flex flex-col md:h-full md:w-[256px] md:fixed left-0 top-4 px-4 border-r-2 border-slate-200", className)}>
            <h1 className="text-2xl font-extrabold text-fin-lit-blue tracking-wide">My Money Confidence</h1>
            <SiderbarItem
                label="Home"
                iconSrc="./astronaut.svg"
                href="/home"
            />
            <SiderbarItem
                label="Leaderboard"
                iconSrc="./astronaut.svg"
                href="/leaderboard"
            />
        </div>
    );
};
