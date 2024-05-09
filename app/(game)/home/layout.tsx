//import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

type Props = {
    children: React.ReactNode;
};

const GameLayout = ({ children }: Props) => {
    return (
    <>
        <Topbar/>
        {/*<Sidebar className="hidden md:flex"></Sidebar>*/}
        <main className="h-full pt-[90px]"> {/*md:pl-[256px] md:pt-0*/}
            <div className="max-w-[850px] mx-auto h-full flex justify-center">
                {children}
            </div>
        </main>
    </>
    );
};

export default GameLayout;
