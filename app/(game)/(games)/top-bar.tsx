import Image from "next/image";
import Link from "next/link";
import ProgressBar from "./progess-bar";

type Props = {
    percentage: number
}

export const TopBar = ({ percentage }: Props) => {
    return (
        <div className="w-full">
            <div className="max-w-[400px] h-[85px] space-x-5 flex items-center justify-center bg-white">
                <Link
                    href={"/home"}
                >
                    <Image
                        src="./close-icon.svg"
                        alt="Close"
                        width={0}
                        height={0}
                        className="w-auto h-9"
                    />
                </Link>
                <ProgressBar
                    percentage={percentage}
                    //percentage={(percentage > 100) ? 100 : percentage}
                />
                <div className="animate-jump animate-infinite animate-duration-1000">
                    <Image
                        src="./stopwatch.svg"
                        alt="Timer"
                        width={0}
                        height={0}
                        className="w-auto h-12"
                    />
                </div>

            </div>
        </div>

    )
}