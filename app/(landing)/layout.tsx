import { Footer } from "./footer";
import { Header } from "./header";

import "./index.css";

type Props = {
    children: React.ReactNode;
};

const LandingLayout = ({ children }: Props) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
        </div>
    );
};

export default LandingLayout;