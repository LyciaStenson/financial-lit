type Props = {
    children: React.ReactNode;
}

const DragGameLayout = ({ children }: Props) => {
    return (
        <main className="max-w-[400px] mx-auto h-full justify-center">
            {children}
        </main>
    )
}

export default DragGameLayout;