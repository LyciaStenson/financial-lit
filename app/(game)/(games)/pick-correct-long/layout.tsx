type Props = {
    children: React.ReactNode;
}

const PickCorrectLongGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div className="max-w-[400px] mx-auto h-full justify-center">
                {children}
            </div>
        </main>
    )
};

export default PickCorrectLongGameLayout;