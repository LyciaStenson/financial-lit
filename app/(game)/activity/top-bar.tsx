import Image from "next/image";

export const TopBar = () => {
    return (
        <div className="w-full">
            <div className="max-w-[400px] h-[85px] space-x-5 flex items-center justify-center bg-white">
                <Image
                    src="./close-icon.svg"
                    alt="Close"
                    width={0}
                    height={0}
                    className="w-auto h-11"
                />
                <div>
                    <div className="w-56 h-10 rounded-2xl bg-moneyconf-purple shadow-[inset_0_-5px_0px_rgba(255,255,255,0.6),inset_0_5px_0px_rgb(255,255,255,0.6)]">
                        <div className=" w-[70px] h-10 rounded-lg bg-moneyconf-gold border-2 border-moneyconf-purple shadow-[inset_0_-5px_0px_rgba(255,255,255,0.6),inset_0_5px_0px_rgb(255,255,255,0.6)]" />
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
        </div>

    )
}