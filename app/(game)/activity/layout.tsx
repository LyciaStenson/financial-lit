import { BonusScoreProvider } from "@/Hooks/BonusScore";
import { DataProvider } from "@/Hooks/GetDataFromPage";


type Props = {
    children: React.ReactNode;
}

const ActivityGameLayout = ({ children }: Props) => {
    return (
        <div className="flex justify-center w-full">
            <DataProvider>
                <BonusScoreProvider>
                    <main className="max-w-[400px] mx-auto h-full justify-center">
                        {children}
                    </main>
                </BonusScoreProvider>
            </DataProvider>
        </div>
    )
};

export default ActivityGameLayout;