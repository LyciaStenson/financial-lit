//import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";

type Props = {
    children: React.ReactNode;
};

const GameLayout = ({ children }: Props) => {
    return (
    <>
        <TopBar/>
        {/*<Sidebar className="hidden md:flex"></Sidebar>*/}
        <main className="h-full pt-[90px]"> {/*md:pl-[256px] md:pt-0*/}
            <div className="max-w-[600px] mx-auto h-full justify-center">
                {children}
            </div>
        </main>
    </>
    );
};

export default GameLayout;
