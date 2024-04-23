type Props = {
    children: React.ReactNode;
}

const GameFirebaseLayout = ({ children }: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default GameFirebaseLayout;
