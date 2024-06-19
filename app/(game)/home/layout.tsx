import { BonusScoreProvider } from "@/Hooks/BonusScore";

type Props = {
    children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
    return (
        <div className="flex justify-center">
            <BonusScoreProvider>
            <main className="max-w-[400px] mx-auto">
                {children}
            </main>
            </BonusScoreProvider>
        </div>
    );
};

export default HomeLayout;
