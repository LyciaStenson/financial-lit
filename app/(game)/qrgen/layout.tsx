type Props = {
    children: React.ReactNode;
}

const QRGenLayout = ({ children }: Props) => {
    return (
        <main className="w-[1400px] h-[900px]">
            {children}
        </main>
    )
}

export default QRGenLayout;