import { TopBar } from "../top-bar";

type Props = {
    children: React.ReactNode;
}

const TripleScrollingGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div className="max-w-[400px] mx-auto h-full justify-center">
                <TopBar />
                {children}
            </div>
        </main>
    )
};

export default TripleScrollingGameLayout;