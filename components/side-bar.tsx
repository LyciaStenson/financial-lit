"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
    title:string
    className?: string;
    children: ReactNode;
};

export const SideBar = ({ title, className, children }: Props) => {

    const router = useRouter();

    const loadPage = (path: string) => {
        router.push(path);
    };

    return (
        <div className={cn("flex flex-col space-y-4 md:h-full md:w-[256px] md:fixed left-0 top-4 px-4 border-r-2 border-slate-200", className)}>
            <button className="text-2xl font-extrabold text-moneyconf-blue tracking-wide" onClick={() => router.push("/" + title.toLowerCase())}>{title}</button>
            {children}
        </div>
    );
};
