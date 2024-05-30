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
                    <Link href={"privacy-policy"} className="underline text-white">
                        Terms of Use
                    </Link>
                    <h3 className="text-md text-white px-1"> | </h3>
                    <h3 className="text-md text-white"> Contact Us: </h3>
                    <Link href={"mailto:info@mymoneyconfidence.co.uk"} className="text-white px-1">
                        info@mymoneyconfidence.co.uk 
                    </Link>
                </div>                
            </div>
        </footer>
    )
}