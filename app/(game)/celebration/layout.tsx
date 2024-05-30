type Props = {
    children: React.ReactNode;
}

const CelebrationLayout = ({ children }: Props) => {
    return (
        <main className="max-w-[450px] mx-auto">
            {children}
        </main>
    )
}

export default CelebrationLayout;