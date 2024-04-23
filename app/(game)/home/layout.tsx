import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

type Props = {
    children: React.ReactNode;
};

const GameLayout = ({ children }: Props) => {
    return (
    <>
        <Topbar/>
        <Sidebar className="hidden md:flex"></Sidebar>
        <main className="md:pl-[256px] h-full pt-[50px] md:pt-0">
            <div className="max-w-[850px] mx-auto pt-6 h-full">
                {children}
            </div>
        </main>
    </>
    );
};

export default GameLayout;
