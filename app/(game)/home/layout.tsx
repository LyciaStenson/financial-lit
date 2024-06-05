//import { Sidebar } from "@/components/sidebar";
import { AuthContextProvider } from "@/app/game-firebase/pageLoading";

type Props = {
    children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
    return (
        <AuthContextProvider>
            <div className="flex justify-center">
                <main className="max-w-[400px] mx-auto">
                    {children}
                </main>
            </div>
        </AuthContextProvider>
    );
};

export default HomeLayout;
