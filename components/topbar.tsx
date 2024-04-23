import { cn  } from "@/lib/utils"

type Props = {
    className?: string;
};

export const Topbar = ({ className }: Props) => {
    return (
        <div className={cn("md:hidden px-6 h-[50px] flex items-center border-b-2 border-slate-300 fixed top-0 w-full z-50", className)}>
            Topbar
        </div>
    );
};
