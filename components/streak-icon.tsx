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
        <div className="flex flex-row w-20 h-20 relative items-center justify-between">
            <Image
                src={"./lightning.svg"}
                alt={"Streak"}
                width={45}
                height={45}
            />
            <h1 className="text-moneyconf-gold font-extrabold text-3xl flex items-center justify-center">
                {streak?.toLocaleString()}
            </h1>
        </div>

    )
}