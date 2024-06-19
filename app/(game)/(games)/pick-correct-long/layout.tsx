import { BonusScoreProvider } from "@/Hooks/BonusScore";
import { DataProvider } from "@/Hooks/GetDataFromPage";

type Props = {
    children: React.ReactNode;
}

const PickCorrectGameLayout = ({ children }: Props) => {
    return (
        <main>
        <DataProvider>
            <BonusScoreProvider>
                <div className="max-w-[400px] mx-auto h-full justify-center">
                    {children}
                </div>
            </BonusScoreProvider>
        </DataProvider>
    </main>
    )
};

export default PickCorrectGameLayout;