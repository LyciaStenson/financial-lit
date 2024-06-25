import { BonusScoreProvider } from "@/Hooks/BonusScore";
import { TopBar } from "../top-bar";
import { DataProvider } from "@/Hooks/GetDataFromPage";

type Props = {
    children: React.ReactNode;
}

const BargainShopperLayout = ({ children }: Props) => {
    return (
        <main>
            <DataProvider>
                <BonusScoreProvider>
                    <div className="max-w-[400px] mx-auto h-full justify-center">
                        <TopBar
                            percentage={0}
                        />
                        {children}
                    </div>
                </BonusScoreProvider>
            </DataProvider>
        </main>
    )
};

export default BargainShopperLayout;