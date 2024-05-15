import Image from "next/image";

export const TopBar = () => {
    return (
        <div className="h-[85px] flex space-x-14 items-center justify-center w-full bg-white">
            <Image
                src="./close-icon.svg"
                alt="Close"
                width={0}
                height={0}
                className="w-auto h-11"
            />
            <div>
                <div className="w-80 h-12 rounded-2xl bg-moneyconf-purple shadow-[inset_0_-5px_0px_rgba(255,255,255,0.6),inset_0_5px_0px_rgb(255,255,255,0.6)]">
                    <div className=" w-[70px] h-12 rounded-lg bg-moneyconf-gold border-2 border-moneyconf-purple shadow-[inset_0_-5px_0px_rgba(255,255,255,0.6),inset_0_5px_0px_rgb(255,255,255,0.6)]" />
                </div>
            </div>
            
            <Image
                src="./stopwatch.svg"
                alt="Timer"
                width={0}
                height={0}
                className="w-auto h-14"
            />
        </div>
    )
}