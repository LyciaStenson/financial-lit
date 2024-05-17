type Props = {
    children: React.ReactNode;
}

const DragBarGameLayout = ({ children }: Props) => {
    return (
        <main>
            <div className="max-w-[600px] mx-auto h-full justify-center">
                {children}
            </div>
        </main>
    )
};

export default DragBarGameLayout;