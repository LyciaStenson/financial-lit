import Image from "next/image"

const CelebrationPage = () => {
    return (
        <div className="flex relative w-full min-h-screen items-center justify-center">
            <div className="absolute top-24 z-10">
                <Image
                    src="./firework-gold.svg"
                    alt="Firework Gold"
                    width={0}
                    height={0}
                    className="w-28 h-auto animate-ping animate-duration-[1000ms]"
                />
            </div>
            <div className="absolute top-16 left-10 z-10">
                <Image
                    src="./firework-red.svg"
                    alt="Firework Red"
                    width={0}
                    height={0}
                    className="w-11 h-auto animate-ping animate-duration-[1200ms]"
                />
            </div>
            <div className="absolute top-52 right-11 z-10">
                <Image
                    src="./firework-red.svg"
                    alt="Firework Red"
                    width={0}
                    height={0}
                    className="w-20 h-auto animate-ping animate-duration-[1500ms]"
                />
            </div>
            <div className="absolute top-60 left-12 z-10">
                <Image
                    src="./firework-blue.svg"
                    alt="Firework Red"
                    width={0}
                    height={0}
                    className="w-20 h-auto animate-ping animate-duration-[900ms]"
                />
            </div>
            <div className="flex w-full items-center justify-center">
                <Image
                    src="./astronaut-king.svg"
                    alt="Astronaut King"
                    width={0}
                    height={0}
                    className="w-48 h-auto animate-jump"
                />
            </div>
        </div>
    )
}

export default CelebrationPage;