"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";

type Props = {
    day: number;
    href: string;
}

function StreakIcons({streak}: {streak: boolean}) {
    if (!streak) {
        return 
    }

    return (
        <div className="flex flex-row items-center relative">
            <Image
                src="./lightning.svg"
                alt="Lightning"
                width={12}
                height={0}
                className="rotate-[110deg] absolute bottom-[-10px] left-[10px]"
            />
            <Image
                src="./lightning.svg"
                alt="Lightning"
                width={12}
                height={0}
                className="rotate-[145deg] absolute bottom-[0px] left-[40px]"
            />
            <Image
                src="./lightning.svg"
                alt="Lightning"
                width={12}
                height={0}
                className="rotate-[30deg] absolute bottom-[-10px] left-[70px]"
            />
            <Image
                src="./lightning.svg"
                alt="Lightning"
                width={12}
                height={0}
                className="rotate-[30deg] absolute bottom-[-100px] left-[10px]"
            />
            <Image
                src="./lightning.svg"
                alt="Lightning"
                width={12}
                height={0}
                className="rotate-[145deg] absolute bottom-[-110px] left-[40px]"
            />
            <Image
                src="./lightning.svg"
                alt="Lightning"
                width={12}
                height={0}
                className="rotate-[110deg] absolute bottom-[-100px] left-[70px]"
            />
        </div>
    )
}

type Variants = "lessonLocked"|"lessonUnlocked"|"lessonCompleted"

export const LessonButton = ({
    day,
    href,
}: Props) => {
    const router = useRouter();

    const sequence = [1,2,3,4,4,4,3,2,1,1]

    let col;

    const cycleIndex = (day-1) % sequence.length;

    col = sequence[cycleIndex];

    const div5 = day % 5;

    let variant:Variants = "lessonLocked"
    if(day > 8){
       variant = "lessonLocked"
    }
    else if(day == 8){
        variant = "lessonUnlocked"
    }
    else{
        variant = "lessonCompleted"
    }

    return (
        <div
            style={{
                gridColumn: col,
                gridRow: day,
                marginTop: (div5 == 0) ? 20 : -50,
                marginBottom: (div5 == 0) ? 70 : 0,
            }}
        >
            <StreakIcons
                streak={(day < getCurrentUser()?.streak!)}
            />
            <Button
                className={"w-[90px] h-[90px] border-[2.5px] shadow-[inset_0_-11px_0px_rgba(0,0,0,0.3),inset_0_3px_0px_rgb(255,255,255,0.7)]"}
                variant={variant}
                shape="round"
                onClick={() => router.push(href)}
                disabled={variant=="lessonLocked"}
            >
            <div>
                <div className="w-[70px] h-[70px] bg-stripes border-moneyconf-blue border-[2.5px] rounded-full flex flex-col items-center justify-center">
                    <p className="text-md">Day</p>
                    <p className="text-xl">{day}</p>
                </div>
            </div>
            </Button>
        </div>

    )
}