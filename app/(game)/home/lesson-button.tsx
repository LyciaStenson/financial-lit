'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    day: number;
}

export const LessonButton = ({
    day,
}: Props) => {
    let indentationLevel = -1.35 * Math.cos((day-1) * Math.PI / 5);

    const leftShift = indentationLevel * 100;

    const router = useRouter();
    //const href = isCompleted ? '/lesson/${index}' : '/lesson';
    const href = "/drag";

    return (
    <div className="relative">
        <Button
            className="w-[145px] h-[145px] border-[2.5px] relative shadow-[inset_0_-17px_0px_rgba(0,0,0,0.3),inset_0_4px_0px_rgb(255,255,255,0.7)]"
            style={{
                left: leftShift
            }}
            variant={(day >= 6) ? (day == 6) ? "lessonUnlocked" : "lessonLocked" : "lessonCompleted"}
            shape="round"
            onClick={() => router.push('/drag')}
        >
        <div>
            <div className="w-[115px] h-[115px] relative bg-stripes border-moneyconf-blue border-[2.5px] rounded-full text-3xl flex flex-col items-center justify-center">
                <p>Day</p>
                <p>{day}</p>
            </div>
        </div>
        </Button>
    </div>
    )
}