import { TopBar } from "@/components/top-bar";

type Props = {
    children: React.ReactNode;
}

const ActivityGameLayout = ({ children }: Props) => {
    return (
        <div className="flex justify-center w-full">
            <TopBar />
            <div className="max-w-[400px] mx-auto h-full justify-center">
                {children}
            </div>
        </div>
    )
};

export default ActivityGameLayout;