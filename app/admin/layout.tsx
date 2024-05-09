import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { AuthContextProvider } from "../game-firebase/pageLoading";

type Props = {
    children: React.ReactNode;
};

const GameLayout = ({ children }: Props) => {
    return (
        <AuthContextProvider>
            <main className=" h-full pt-[50px] md:pt-0">
                <div className="h-full">
                    {children}
                </div>
            </main>
        </AuthContextProvider>
    );
};

export default GameLayout;
