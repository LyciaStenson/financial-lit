import { AuthContextProvider } from "./pageLoading";

type Props = {
    children: React.ReactNode;
}

const GameFirebaseLayout = ({ children }: Props) => {
    return (
        <AuthContextProvider>
            <div>
                {children}
            </div>
        </AuthContextProvider>
    );
};

export default GameFirebaseLayout;
