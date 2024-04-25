'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
    day: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
}

export const LessonButton = ({
    day,
    totalCount,
    locked,
    current,
    percentage
}: Props) => {
    const cycleLength = 8;
    const cycleIndex = day % cycleLength;

    let indentationLevel;

    if (cycleIndex <= 2) {
        indentationLevel = cycleIndex;
    } else if (cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6) {
        indentationLevel = 4 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8;
    }

    const rightPosition = indentationLevel * 40;

    const isCompleted = !current && !locked;

    const href = isCompleted ? '/lesson/${index}' : '/lesson';

    return (
        <Button
            className="w-[130px] h-[130px] border-2"
            variant="primary"
            shape="round"
        >
            <div>
                <div className="w-[100px] h-[100px] border-fin-lit-blue border-2 rounded-full text-3xl flex items-center justify-center">
                    Day {day}
                </div>
            </div>
        </Button>
    )
}