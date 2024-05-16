import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
    streak: number | undefined;
}

export const StreakIcon = ({
    streak,
}: Props) => {
    return (
        <div className="flex flex-row relative items-center space-x-3">
            <Image
                src={"./lightning.svg"}
                alt={"Streak"}
                width={0}
                height={0}
                className="w-auto h-[70px]"
            />
            <h1 className="text-moneyconf-gold font-extrabold text-3xl flex items-center justify-center">
                {streak?.toLocaleString()}
            </h1>
        </div>

    )
}