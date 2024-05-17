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
    let indentation = (0.5 - Math.cos((day-1) * Math.PI/6) * 0.5) * 325;

    const router = useRouter();

    return (
        <div>
            <Button
                className="w-[125px] h-[125px] border-[2.5px] relative shadow-[inset_0_-17px_0px_rgba(0,0,0,0.3),inset_0_4px_0px_rgb(255,255,255,0.7)]"
                style={{
                    left: indentation
                }}
                variant={(day >= 6) ? (day == 6) ? "lessonUnlocked" : "lessonLocked" : "lessonCompleted"}
                shape="round"
                onClick={() => router.push(href)}
            >
                <div>
                    <div className="w-[95px] h-[95px] relative bg-stripes border-moneyconf-blue border-[2.5px] rounded-full flex flex-col items-center justify-center">
                        <p className="text-2xl">Day</p>
                        <p className="text-3xl">{day}</p>
                    </div>
                </div>
            </Button>
        </div>
    )
}