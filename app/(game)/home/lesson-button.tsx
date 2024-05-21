"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    day: number;
    href: string;
}

export const LessonButton = ({
    day,
    href,
}: Props) => {
    const router = useRouter();

    const sequence = [1,2,3,4,4,4,3,2,1,1]

    let col;

    const cycleIndex = (day-1) % sequence.length;

    col = sequence[cycleIndex];

    return (
        <Button
            className={"w-[90px] h-[90px] border-[2.5px] shadow-[inset_0_-11px_0px_rgba(0,0,0,0.3),inset_0_3px_0px_rgb(255,255,255,0.7)]"}
            style={{
                gridColumn: col,
                gridRow: day,
            }}
            variant={(day >= 6) ? (day == 6) ? "lessonUnlocked" : "lessonLocked" : "lessonCompleted"}
            shape="round"
            onClick={() => router.push(href)}
        >
            <div>
                <div className="w-[70px] h-[70px] bg-stripes border-moneyconf-blue border-[2.5px] rounded-full flex flex-col items-center justify-center">
                    <p className="text-md">Day</p>
                    <p className="text-xl">{day}</p>
                </div>
            </div>
        </Button>
    )
}