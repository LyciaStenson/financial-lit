//import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";

type Props = {
    children: React.ReactNode;
};

const GameLayout = ({ children }: Props) => {
    return (
    <>
        <TopBar />
        {/*<Sidebar className="hidden md:flex"></Sidebar>*/}
        <main className="h-full max-w-[450px] pt-[90px] mx-auto"> {/*md:pl-[256px] md:pt-0*/}
            {children}
        </main>
    </>
    );
};

export default GameLayout;
