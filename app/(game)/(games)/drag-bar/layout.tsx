type Props = {
    children: React.ReactNode;
}

const DragBarGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div>
                {children}
            </div>
        </main>
    )
};

export default DragBarGameLayout;