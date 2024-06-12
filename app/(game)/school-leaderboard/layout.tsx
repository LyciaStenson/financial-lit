

type Props = {
    children: React.ReactNode;
}

const SchoolLeaderboardGameLayout = ({ children }: Props) => {
    return (
        <div className="flex justify-center w-full">
            
            <main className="max-w-[400px] mx-auto h-full justify-center">
                {children}
            </main>
        </div>
    )
};

export default SchoolLeaderboardGameLayout;