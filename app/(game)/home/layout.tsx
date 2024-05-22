//import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";

type Props = {
    children: React.ReactNode;
};

const GameLayout = ({ children }: Props) => {
    return (
    <div className="flex justify-center">
        <TopBar />
        <main className="max-w-[450px] mx-auto pt-[90px]">
            {children}
        </main>
    </div>
    );
};

export default GameLayout;
