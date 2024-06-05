'use client';

import Image from "next/image"
import Continue from "./continue";
import { useRouter } from "next/navigation";

//const router = useRouter();

/*const continueQuiz = () =>{
    if (variant == "lessonUnlocked"){
        router.push("/activity");
    } else {
        router.push("/home");
    }
}*/

const CelebrationPage = () => {
    return (
        <div className="flex relative w-full min-h-screen items-center justify-center">
            <div className="absolute top-24 z-10">
                <Image
                    src="./firework-gold.svg"
                    alt="Firework Gold"
                    width={0}
                    height={0}
                    className="w-24 h-auto animate-ping animate-duration-[1000ms]"
                />
            </div>
            <div className="absolute top-16 left-10 z-10">
                <Image
                    src="./firework-red.svg"
                    alt="Firework Red"
                    width={0}
                    height={0}
                    className="w-7 h-auto animate-ping animate-duration-[1200ms]"
                />
            </div>
            <div className="absolute top-52 right-11 z-10">
                <Image
                    src="./firework-red.svg"
                    alt="Firework Red"
                    width={0}
                    height={0}
                    className="w-18 h-auto animate-ping animate-duration-[1500ms]"
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
            <div className="flex flex-col items-center justify-center space-y-10">
                <Image
                    src="./astronaut-king.svg"
                    alt="Astronaut King"
                    width={0}
                    height={0}
                    className="w-32 h-auto animate-jump"
                />
                <Continue text="Continue"/>
            </div>
        </div>
    )
}

export default CelebrationPage;