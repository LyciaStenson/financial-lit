type Props = {
    children: React.ReactNode;
}

const CelebrationLayout = ({ children }: Props) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default CelebrationLayout;