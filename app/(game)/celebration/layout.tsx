import { BonusScoreProvider } from "@/Hooks/BonusScore";
import { DataProvider } from "@/Hooks/GetDataFromPage";

type Props = {
    children: React.ReactNode;
}

const CelebrationLayout = ({ children }: Props) => {
    return (
        <DataProvider>
            <BonusScoreProvider>
                <main className="max-w-[450px] mx-auto">
                    {children}
                </main>
            </BonusScoreProvider>
        </DataProvider>
    )
}

export default CelebrationLayout;