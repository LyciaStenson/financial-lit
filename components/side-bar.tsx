'use client';

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
    className?: string;
    children: ReactNode;
};

export const SideBar = ({ className, children }: Props) => {

    const router = useRouter();

    const loadPage = (path:string) => {
        router.push(path);
    };

    return (
        <div className={cn("flex flex-col space-y-4 md:h-full md:w-[256px] md:fixed left-0 top-4 px-4 border-r-2 border-slate-200", className)}>
            <h1 className="text-2xl font-extrabold text-moneyconf-blue tracking-wide">Are you an Admin?</h1>
            {children}
        </div>
    );
};
