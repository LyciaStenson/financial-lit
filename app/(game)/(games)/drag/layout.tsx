import { TopBar } from "../top-bar";

type Props = {
    children: React.ReactNode;
}

const DragGameLayout = ({ children }: Props) => {
    return (
        <main className="max-w-[400px] mx-auto h-full justify-center">
            <TopBar />
            {children}
        </main>
    )
}

export default DragGameLayout;