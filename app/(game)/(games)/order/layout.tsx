type Props = {
    children: React.ReactNode;
}

const OrderGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div>
                {children}
            </div>
        </main>
    )
};

export default OrderGameLayout;