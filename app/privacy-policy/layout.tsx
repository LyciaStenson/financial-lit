type Props = {
    children: React.ReactNode;
};

const PrivacyPolicyLayout = ({ children }: Props) => {
    return (
        <div className="w-full bg-outward-red">
            <div className="max-w-[1000px] mx-auto justify-center">
                {children}
            </div>
        </div>
    );
};

export default PrivacyPolicyLayout;