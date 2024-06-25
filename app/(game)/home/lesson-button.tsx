"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCollection } from "@/src/FirebaseBridge/firestore/getData";
import { CollectionReference, DocumentData, FirestoreError, QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { getCurrentDatabase } from "@/src/FirebaseBridge/firebaseApp";

type Props = {
    day: number;
    streak: number;
    href: string;
    userDay: number
}

function StreakIcons({ streak }: { streak: boolean }) {
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

type Variants = "lessonLocked" | "lessonUnlocked" | "lessonCompleted"

export const LessonButton = ({
    day,
    streak,
    href,
    userDay,
}: Props) => {
    const router = useRouter();

    const sequence = [1, 2, 3, 4, 4, 4, 3, 2, 1, 1]

    const cycleIndex = (day - 1) % sequence.length;

    let col = sequence[cycleIndex];

    const div5 = day % 5;

    let variant: Variants = "lessonLocked"
    if (day > userDay) {
        variant = "lessonLocked"
    }
    else if (day == userDay) {
        variant = "lessonUnlocked"
    }
    else {
        variant = "lessonCompleted"
    }

    async function loadDay(day: number) {
        let correctDay = "day" + day;

        //Gets the day type from the database
        try {
            const yearCollection = collection(getCurrentDatabase(), `questions/year3/${correctDay}`);
            const snapshot = await getDocs(yearCollection);
            const docsArray = snapshot.docs.map(doc => doc.data());
            router.push(docsArray[0].day.type);
          } catch (error) {
            console.error('Error retrieving documents:', error);
          }
        
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
                streak={(day <= streak)}
            />
            <Button
                className={"w-[90px] h-[90px] border-[2.5px] shadow-[inset_0_-11px_0px_rgba(0,0,0,0.3),inset_0_3px_0px_rgb(255,255,255,0.7)]"}
                variant={variant}
                shape="round"
                onClick={() => loadDay(day)}
                disabled={variant == "lessonLocked"}
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