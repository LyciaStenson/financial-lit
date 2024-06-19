import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="h-[120px] w-full bg-outward-red">
            <div className="h-full flex items-center justify-center flex-col">
                <h3 className="text-md text-white"> ©2024 My Money Confidence. All rights reserved. </h3>
                <div className="flex flex-row">
                    <Link href={"privacy-policy"} className="underline text-white">
                        Privacy Policy
                    </Link>
                    <h3 className="text-md text-white px-1"> | </h3>
                    <Link href={"terms-and-conditions"} className="underline text-white">
                        Terms of Use
                    </Link>
                    <h3 className="text-md text-white px-1"> | </h3>
                    <h3 className="text-md text-white"> Contact Us: </h3>
                    <Link href={"mailto:info@mymoneyconfidence.co.uk"} className="text-white underline px-1">
                        info@mymoneyconfidence.co.uk 
                    </Link>
                </div>
                <div className="flex flex-row">
                    <h3 className="text-md text-white"> Illustrations by </h3>
                    <Link href={"https://www.freepik.com/author/vectorjuice"} className="text-white underline px-1">
                        Vectorjuice
                    </Link>
                </div>
                <div className="flex flex-row">
                    <h3 className="text-md text-white"> Website made by: </h3>
                    <Link href={"https://youtu.be/ytAt_EJIr7Q?si=Si--4XbcxDeS0_2t"} className="underline text-white pl-1">
                        Luca Stenson
                    </Link>
                    <h3 className="text-md text-white px-1"> | </h3>
                    <Link href={"https://jakehood.github.io/"} className="underline text-white">
                        Jake Hood
                    </Link>
                    <h3 className="text-md text-white px-1"> | </h3>
                    <Link href={"https://SamuelPuertaTerron.github.io/"} className="underline text-white">
                        Sam Puerta Terron
                    </Link>
                </div>          
            </div>
        </footer>
    )
}