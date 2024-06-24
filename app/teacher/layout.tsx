import { SideBar } from "@/components/side-bar";
import { TopBar } from "@/components/top-bar";

type Props = {
    children: React.ReactNode;
};

const GameLayout = ({ children }: Props) => {
    return (
            <main className=" h-full pt-[50px] md:pt-0">
                <div className="h-full">
                    {children}
                </div>
            </main>
    );
};

export default GameLayout;