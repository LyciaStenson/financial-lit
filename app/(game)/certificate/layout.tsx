import { Ms_Madi } from "next/font/google";

type Props = {
    children: React.ReactNode;
}

const msmadi = Ms_Madi({
    subsets: ['latin'],
    display: 'swap',
    weight: "400",
    variable: "--font-ms-madi"
})

const CertificateLayout = ({ children }: Props) => {
    return (
        <main className={"w-full h-full"}>
                {children}
        </main>
    )
}

export default CertificateLayout;