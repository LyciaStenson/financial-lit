'use client'

import { Button } from "@/components/ui/button";

type Props = {
    day: number;
    totalCount: number;
    //locked?: boolean;
    //variant: string;
    current?: boolean;
}

export const LessonButton = ({
    day,
    totalCount,
    //variant,
    //locked,
    current,
}: Props) => {
    //const cycleLength = 12;
    //const cycleIndex = (day-1) % cycleLength;

    let indentationLevel = -1.35 * Math.cos((day-1) * Math.PI / 5);

    const leftShift = indentationLevel * 100;

    //const href = isCompleted ? '/lesson/${index}' : '/lesson';
    const href = "/lesson";

    return (
    <div className="relative">
        <Button
            className="w-[130px] h-[130px] border-[2.5px] relative shadow-[inset_0_-17px_0px_rgba(0,0,0,0.3),inset_0_4px_0px_rgb(255,255,255,0.7)]"
            style={{
                left: leftShift
            }}
            variant={(day >= 5) ? (day == 5) ? "lessonUnlocked" : "lessonLocked" : "lessonCompleted"}
            shape="round"
        >
        <div>
            <div className="w-[100px] h-[100px] relative bg-stripes border-moneyconf-blue border-[2.5px] rounded-full text-3xl flex flex-col items-center justify-center">
                <p>Day</p>
                <p>{day}</p>
            </div>
        </div>
        </Button>
    </div>
    )
}