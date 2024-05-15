type Props = {
    children: React.ReactNode;
}

const PickCorrectGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div>
                {children}
            </div>
        </main>
    )
};

export default PickCorrectGameLayout;