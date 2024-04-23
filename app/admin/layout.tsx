import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

type Props = {
    children: React.ReactNode;
};

const GameLayout = ({ children }: Props) => {
    return (
    <>
        <Topbar/>
        <main className=" h-full pt-[50px] md:pt-0">
            <div className="h-full">
                {children}
            </div>
        </main>
    </>
    );
};

export default GameLayout;
