import Image from "next/image";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="h-[766px] w-full bg-outward-red">
            <div className="flex flex-row items-center justify-between h-[80px]">
                <Image
                        src="./logo-inverted.svg"
                        alt="My Money Confidence Logo"
                        width={0}
                        height={0}
                        className="w-20 h-auto"
                    />
                <div className="flex space-x-8 pr-10">
                    <Link href="#mission" className="text-white text-2xl font-extrabold">
                        Mission
                    </Link>
                    <Link  href="#story" className="text-white text-2xl font-extrabold">
                        Story
                    </Link>
                    <Link href="#method" className="text-white text-2xl font-extrabold">
                        Method
                    </Link>
                    <Link href="#community" className="text-white text-2xl font-extrabold">
                        Community
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center justify-end w-full space-y-7 pt-20">
                <h1 className="w-[38rem] h-auto leading-[7rem] font-bold text-center text-[5.5rem] text-white">
                    My Money Confidence
                </h1>
                <div className="flex flex-row w-full items-center justify-center space-x-7 pb-9">
                    <Image
                        src="./logo-inverted.svg"
                        alt="My Money Confidence Logo"
                        width={0}
                        height={0}
                        className="w-80 h-auto"
                    />
                    <div className="flex flex-col w-[38rem] h-auto text-[2.7rem] leading-[3.5rem] items-center justify-center pb-10 text-center font-bold italic text-white">
                        <h2>
                            Leading the change by empowering children with money confidence!
                        </h2>
                        <hr className="w-80 mt-8"></hr>
                    </div>
                </div>
            </div>
        </header>
    )
}