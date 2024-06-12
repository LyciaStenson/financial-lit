type Props = {
    children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
    return (
        <div className="flex justify-center">
            <main className="max-w-[400px] mx-auto">
                {children}
            </main>
        </div>
    );
};

export default HomeLayout;
