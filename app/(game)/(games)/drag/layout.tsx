type Props = {
    children: React.ReactNode;
}

const DragGameLayout = ({ children }: Props) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default DragGameLayout;