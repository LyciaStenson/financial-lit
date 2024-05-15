type Props = {
    children: React.ReactNode;
}

const MoreOrLessGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div>
                {children}
            </div>
        </main>
    )
};

export default MoreOrLessGameLayout;