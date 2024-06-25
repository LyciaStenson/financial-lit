import React from "react"
import Image from "next/image";

type CertificateProps = { studentname: string }

export const Certificate = React.forwardRef(function Certificate({studentname}:CertificateProps, ref) {
    return (
        <div ref={ref!} className="relative">
        <h1 className="w-full flex items-center justify-center text-white font-msmadi text-center font-extrabold text-[4rem] absolute top-[335px] right-[0px]">
            {studentname}
        </h1>
        <div className="flex items-center justify-center">
            <Image
                src="./certificate.svg"
                alt="Certificate"
                width={0}
                height={0}
                className="w-full h-auto"
            />
        </div>
    </div>
    );
});