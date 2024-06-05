import { TopBar } from "../top-bar";

type Props = {
    children: React.ReactNode;
}

const OrderGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div className="max-w-[400px] mx-auto h-full justify-center">
                <TopBar
                    percentage={0}
                />
                {children}
            </div>
        </main>
    )
};

export default OrderGameLayout;