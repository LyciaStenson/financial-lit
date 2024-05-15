type Props = {
    children: React.ReactNode;
}

const MatchingGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div>
                {children}
            </div>
        </main>
    )
};

export default MatchingGameLayout;