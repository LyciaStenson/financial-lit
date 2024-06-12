'use client';

import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import Image from "next/image"

const QRGenPage = () => {
    console.log(getCurrentUser());

    return (
            <div className="flex flex-col justify-stretch w-full h-full">
                <Image
                    src="./qr_code-final.svg"
                    alt="QRCode"
                    width={0}
                    height={0}
                    className="w-auto h-[57rem]"
                />
            </div> 
    )
}

export default QRGenPage;