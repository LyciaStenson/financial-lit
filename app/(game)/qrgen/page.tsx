'use client';

import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import Image from "next/image"
import ReactToPrint from "react-to-print"

const QRGenPage = () => {
    console.log(getCurrentUser());

    return (
        <ReactToPrint>
            <div className="flex flex-col justify-stretch w-full h-full px-8 py-10">
                <div className="flex flex-row">
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="flex items-start justify-start w-[45rem] h-[45rem] border-[1px] border-black"/>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        <h2 className="flex items-center justify-center text-6xl font-extrabold pt-5">
                            Money
                        </h2>
                        <h2 className="flex items-center justify-center text-6xl font-extrabold pt-5">
                            Confidence
                        </h2>
                        <h2 className="flex items-center justify-center text-6xl font-extrabold pt-5">
                            Month
                        </h2>
                    <div className="flex items-center justify-center space-x-10 pt-10">
                        <Image
                            src="./astronaut-holding-coins.svg"
                            alt="Astronaut coins"
                            width={0}
                            height={0}
                            className="w-72 h-auto animate-jump"
                        />
                        <Image
                            src="./mmc-logo-vertical-black.svg"
                            alt="Logo"
                            width={0}
                            height={0}
                            className="w-56 h-auto animate-jump"
                        />
                    </div>
                </div>
            </div>
                <div className="flex flex-row space-x-56">
                    <h2 className="flex items-center justify-center text-4xl font-extrabold pt-10 pl-10">
                        mymoneyconfidence.co.uk/game
                    </h2>
                    <h2 className="flex items-end justify-end text-4xl font-extrabold">
                        CODE: 23245255{getCurrentUser()?.emailID}
                    </h2>
                </div>
            </div>
        </ReactToPrint>   
    )
}

export default QRGenPage;