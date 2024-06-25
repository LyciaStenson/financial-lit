import { DataProvider } from "@/Hooks/GetDataFromPage";
import { TopBar } from "../top-bar";
import { BonusScoreProvider } from "@/Hooks/BonusScore";

type Props = {
    children: React.ReactNode;
}

const OrderGameLayout = ({ children }: Props) => {
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

export default OrderGameLayout;