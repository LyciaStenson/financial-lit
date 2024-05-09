type Props = {
    children: React.ReactNode;
}

const DragGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div>
                {children}
            </div>
        </main>
    )
};

export default DragGameLayout;
