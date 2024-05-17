import Image from "next/image"

const CelebrationPage = () => {
    return (
        <div className="flex flex-col space-y-20 items-center justify-center min-h-screen">
            <div className="animate-ping">
                <Image
                    src="./firework-gold.svg"
                    alt="Firework Gold"
                    width={0}
                    height={0}
                    className="w-32 h-auto"
                />
            </div>
            
            <div className="animate-jump">
                <Image
                    src="./astronaut-king.svg"
                    alt="Astronaut King"
                    width={0}
                    height={0}
                    className="w-60 h-auto"
                />
            </div>
            
        </div>
    )
}

export default CelebrationPage;